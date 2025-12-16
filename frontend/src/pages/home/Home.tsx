import { useEffect, useState } from "react";

import Header from "../../components/home/Header";
import Stats from "../../components/home/Stats";
import TopTracks from "../../components/home/TopTracks";
import Insight from "../../components/home/Insight";
import NowPlaying from "../../components/widget/NowPlaying";

export default function Home() {
  const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  const [profile, setProfile] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [publicPlaylists, setPublicPlaylists] = useState(0);
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [peakHour, setPeakHour] = useState<number | null>(null);
  const [lifetimeHours, setLifetimeHours] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${BACKEND}/top-tracks`)
      .then((r) => r.json())
      .then(setTopTracks);

    fetch(`${BACKEND}/listening-by-hour`)
      .then((r) => r.json())
      .then((d) => setPeakHour(d.peakHour));

    fetch(`${BACKEND}/lifetime-listening`)
      .then((r) => r.json())
      .then((d) => setLifetimeHours(d.minutes));

    fetch(`${BACKEND}/playlists`)
      .then((r) => r.json())
      .then((d) => {
        setPlaylists(d.items || []);
        setPublicPlaylists((d.items || []).filter((p: any) => p.public).length);
      });

    fetch(`${BACKEND}/refresh`)
      .then((r) => r.json())
      .then((d) =>
        fetch(`${BACKEND}/me`, {
          headers: { Authorization: d.access_token },
        })
          .then((r) => r.json())
          .then(setProfile)
      );
  }, []);

  const formatName = (name: string) =>
    name
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="ml-64 min-h-screen bg-[#121212] p-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="flex justify-end">
          <NowPlaying />
        </div>

        <Header
          profile={profile}
          playlists={playlists}
          formatName={formatName}
        />

        <Stats
          publicPlaylists={publicPlaylists}
          lifetimeHours={lifetimeHours}
          peakHour={peakHour}
        />

        <div className="flex flex-col xl:flex-row gap-8">
          <TopTracks
            topTracks={topTracks}
            formatDuration={formatDuration}
          />
          <Insight />
        </div>

      </div>
    </div>
  );
}
