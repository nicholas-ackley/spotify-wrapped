const clientId = "565ff4ece1fd434093666662041f89d1";
const redirectUri = "https://nicholasackley.github.io/spotify-wrapped/";
const scope = "user-top-read";

const authEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
