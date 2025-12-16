import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import axios from "axios";
import querystring from "querystring";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

// --- HELPER: Get Fresh Access Token ---
async function getAccessToken() {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  try {
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return res.data.access_token;
  } catch (error) {
    console.error("Error refreshing token", error);
    return null;
  }
}

// -------------------------------------
// 1) /top-tracks (Target Endpoint)
// -------------------------------------
app.get("/top-tracks", async (req, res) => {
  try {
    const token = await getAccessToken();
    if (!token) return res.status(500).json({ error: "Failed to get token" });

    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          limit: 10, // Adjust limit as needed
          time_range: "short_term", // short_term = approx last 4 weeks
        },
      }
    );

    res.json(response.data.items);
  } catch (err: any) {
    console.error("Top tracks error:", err.response?.data || err);
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

// -------------------------------------
// 2) LOGIN / CALLBACK / REFRESH / ME
// -------------------------------------
app.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email user-top-read user-read-playback-state";
  const params = querystring.stringify({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope,
  });
  res.redirect("https://accounts.spotify.com/authorize?" + params);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code as string;
  const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authHeader}`,
        },
      }
    );
    res.json(tokenResponse.data);
  } catch (err: any) {
    res.status(500).send("Error exchanging code for tokens");
  }
});

app.get("/refresh", async (req, res) => {
  const token = await getAccessToken();
  res.json({ access_token: token });
});

app.get("/me", async (req, res) => {
  const token = await getAccessToken();
  try {
    const me = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json(me.data);
  } catch (err: any) {
    res.status(500).send("Error loading profile");
  }
});

// -------------------------------------
// 3) LIFETIME LISTENING (LAST.FM)
// -------------------------------------
const cacheFile = "./lifetimeCache.json";

app.get("/lifetime-listening", async (req, res) => {
  try {
    if (fs.existsSync(cacheFile)) {
      const cached = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
      return res.json(cached);
    }

    const user = process.env.LASTFM_USERNAME!;
    const key = process.env.LASTFM_API_KEY!;
    
    // Fetch top tracks from Last.fm
    const lastfm = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${user}&api_key=${key}&format=json&limit=200`
    );

    const tracks = lastfm.data.toptracks.track;
    const token = await getAccessToken();
    let totalMs = 0;

    // Use Spotify to find duration for these tracks
    // Note: This is resource intensive, limit concurrency in production
    const results = await Promise.allSettled(
      tracks.map(async (t: any) => {
        try {
          const query = encodeURIComponent(`${t.artist.name} ${t.name}`);
          const search = await axios.get(
            `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const duration = search.data?.tracks?.items?.[0]?.duration_ms;
          const plays = Number(t.playcount);
          if (duration && plays) totalMs += duration * plays;
        } catch { return; }
      })
    );

    const totalMinutes = (totalMs / (1000 * 60)).toFixed(0);
    fs.writeFileSync(cacheFile, JSON.stringify({ minutes: totalMinutes }), "utf8");
    return res.json({ minutes: totalMinutes });

  } catch (err: any) {
    console.error("Lifetime error:", err.message);
    return res.status(500).json({ error: "Lifetime listening fetch failed" });
  }
});

// -------------------------------------
// 4) LISTENING BY HOUR
// -------------------------------------
app.get("/listening-by-hour", async (req, res) => {
  try {
    const user = process.env.LASTFM_USERNAME!;
    const key = process.env.LASTFM_API_KEY!;
    const recent = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${user}&api_key=${key}&format=json&limit=200`
    );

    const tracks = recent.data.recenttracks.track;
    const hourBuckets = new Array(24).fill(0);

    tracks.forEach((t: any) => {
      if (!t.date) return;
      const date = new Date(Number(t.date.uts) * 1000);
      // Adjust for CST/Local time if needed, currently server time
      hourBuckets[date.getHours()] += 1;
    });

    const peakHour = hourBuckets.indexOf(Math.max(...hourBuckets));
    res.json({ hourlyDistribution: hourBuckets, peakHour });
  } catch (err) {
    res.status(500).json({ error: "Failed to load listening hour data" });
  }
});

app.get("/playlists", async (req, res) => {
    try {
      const token = await getAccessToken(); 
      const playlists = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      res.json(playlists.data); 
    } catch (err: any) {
      console.log("BACKEND ERROR:", err.response?.data || err);
      res.status(500).json({ error: "Failed to get playlists" });
    }
  });


  app.get("/now-playing", async (req, res) => {
  const accessToken = await getAccessToken(); // your refresh logic

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 204) {
    return res.json(null);
  }

  const data = await response.json();
  res.json(data);
});


app.get("/genre-breakdown", async (req, res) => {
  const accessToken = await getAccessToken();

  // 1. Get top tracks
  const tracksRes = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=30",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const tracksData = await tracksRes.json();

  // 2. Collect unique artist IDs
  const artistIds = Array.from(
    new Set(
      tracksData.items.flatMap((track: any) =>
        track.artists.map((a: any) => a.id)
      )
    )
  ).slice(0, 50);

  // 3. Fetch artists
  const artistsRes = await fetch(
    `https://api.spotify.com/v1/artists?ids=${artistIds.join(",")}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const artistsData = await artistsRes.json();

  // 4. Count genres
  const genreCount: Record<string, number> = {};

  artistsData.artists.forEach((artist: any) => {
    artist.genres.forEach((genre: string) => {
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });
  });

  // 5. Sort + take top 6
  const sortedGenres = Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([genre, count]) => ({ genre, count }));

  res.json(sortedGenres);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));