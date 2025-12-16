import { Music, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function Widget() {
  const [track, setTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchNowPlaying = () => {
      fetch(`${BACKEND}/now-playing`)
        .then((res) => res.json())
        .then((data) => {
          setTrack(data?.item || null);
          setIsPlaying(data?.is_playing || false);
        })
        .catch(() => setTrack(null));
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 5000);
    return () => clearInterval(interval);
  }, []);

  // Return null (hidden) or a placeholder if nothing is playing
  if (!track) {
    return null; 
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[300px] bg-[#181818] border border-white/10 rounded-xl p-4 shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Album Art */}
      <img
        src={track.album.images[1]?.url || track.album.images[0]?.url}
        alt="Album Art"
        className={`w-14 h-14 rounded-md shadow-lg ${isPlaying ? 'animate-pulse' : ''}`}
      />

      {/* Song Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-white truncate">
          {track.name}
        </div>
        <div className="text-xs text-gray-400 truncate">
          {track.artists.map((a: any) => a.name).join(", ")}
        </div>
      </div>

      {/* Play/Pause Icon */}
      <div className="w-8 h-8 flex items-center justify-center bg-green-500/10 rounded-full text-green-500">
        {isPlaying ? <Music size={16} className="animate-bounce" /> : <Pause size={16} />}
      </div>
    </div>
  );
}