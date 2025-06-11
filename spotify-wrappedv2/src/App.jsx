import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get access token from URL
    const hash = window.location.hash;
    const _token = new URLSearchParams(hash.substring(1)).get("access_token");

    if (_token) {
      setToken(_token);
      window.location.hash = ""; // clean up URL
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTracks(data.items || []);
      });
  }, [token]);

  return (
    <div className="hero">
      <h1 className="text-2xl font-bold mb-4">My Top Tracks</h1>
      {tracks.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tracks.map((track, index) => (
            <li key={track.id}>
              {index + 1}. {track.name} by {track.artists[0].name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
