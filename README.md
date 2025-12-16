# Spotify Analytics Dashboard

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

## Project Structure
spotify/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   └── server.ts
│   ├── .env
│   ├── lifetimeCache.json
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── home/
│   │   │   ├── widget/
│   │   │   │   └── NowPlaying.tsx
│   │   │   └── navbar/
│   │   │       └── Navbar.tsx
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   └── Home.tsx
│   │   │   ├── statistics/
│   │   │   │   ├── Statistics.tsx
│   │   │   │   ├── GenreDistribution.tsx
│   │   │   │   ├── StatsCard.tsx
│   │   │   │   ├── StatsHeader.tsx
│   │   │   │   └── TopArtists.tsx
│   │   │   └── Callback.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   └── App.css
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md



