import { useEffect, useState } from "react";
import "./App.css";

const CLIENT_ID = "565ff4ece1fd434093666662041f89d1"; // from Spotify Developer Dashboard
const REDIRECT_URI = "http://localhost:3000/";

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = [
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "streaming",
  "user-read-currently-playing",
  "app-remote-control",
];

function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem("token");

    if (!storedToken && hash) {
      const _token = new URLSearchParams(hash.substring(1)).get("access_token");
      window.location.hash = "";
      window.localStorage.setItem("token", _token);
      setToken(_token);
    } else {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTracks(data.items || []);
      });
  }, [token]);

  const login = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join(
      "%20"
    )}`;
  };

  return (
    <div className="App">
      <h1>🎧 My Top Spotify Tracks</h1>
      {!token ? (
        <button onClick={login}>Login to Spotify</button>
      ) : (
        <div className="track-list">
          {tracks.map((track, idx) => (
            <div key={idx} className="track">
              <img
                src={track.album.images[0].url}
                alt="Album Cover"
                width="200"
              />
              <h3>{track.name}</h3>
              <p>{track.artists[0].name}</p>
              <audio controls src={track.preview_url}></audio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
