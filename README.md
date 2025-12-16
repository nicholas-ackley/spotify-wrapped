# Spotify Analytics Dashboard (Personal Project)

This project is a full-stack Spotify analytics dashboard that visualizes a user’s listening behavior using real Spotify data. The application authenticates users via Spotify’s OAuth 2.0 Authorization Code flow and retrieves listening history, playlists, and artist metadata from the Spotify Web API. The backend aggregates and normalizes this data, while the frontend presents it through interactive charts and statistics inspired by Spotify Wrapped.

The system follows a client–server architecture. The backend securely handles authentication, token refresh, and all communication with the Spotify API. It exposes custom REST endpoints that compute higher-level analytics such as genre distribution, top artists, listening trends, and currently playing tracks. The frontend consumes these endpoints to render a responsive analytics dashboard with real-time updates.

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts

### Backend
- Node.js
- Express
- Spotify Web API
- OAuth 2.0 (Authorization Code Flow)

## What I Learned
### Backend Development
- Implemented OAuth 2.0 Authorization Code flow with refresh tokens
- Built RESTful APIs using Express
- Designed backend routes to aggregate and normalize third-party API data
- Implemented secure token handling and refresh logic
- Structured a backend that acts as a data-processing layer instead of a simple proxy

### API Integration & Data Processing
- Worked with Spotify Web API endpoints for tracks, artists, playlists, and playback state
- Derived genre statistics by mapping tracks to artists and aggregating artist genres
- Calculated percentages, distributions, and ranked statistics from raw API responses
- Managed API limits and optimized batched requests

### Frontend Engineering
- Built a modular React application with reusable components
- Visualized data using charts and graphs
- Connected frontend state to backend endpoints
- Designed a responsive UI for analytics-heavy dashboards


