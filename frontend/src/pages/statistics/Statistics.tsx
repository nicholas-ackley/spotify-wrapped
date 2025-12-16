import { useEffect, useState } from "react";

import StatsHeader from "../../pages/statistics/StatsHeader";
import StatsCard from "../../components/home/Stats";
import GenreDistribution from "../statistics/GenreDistribution";
import TopArtists from "../statistics/TopArtists";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function Statistics() {
  const [stats, setStats] = useState<any>(null);
  const [genres, setGenres] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${BACKEND}/statistics-overview`)
      .then((r) => r.json())
      .then(setStats);

    fetch(`${BACKEND}/genre-breakdown`)
      .then((r) => r.json())
      .then(setGenres);

    fetch(`${BACKEND}/top-artists`)
      .then((r) => r.json())
      .then(setArtists);
  }, []);

  return (
    <div className="ml-64 min-h-screen bg-[#121212] p-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">

        <StatsHeader />

        <StatsCard stats={stats} />

        <GenreDistribution genres={genres} />

        <TopArtists artists={artists} />

      </div>
    </div>
  );
}
