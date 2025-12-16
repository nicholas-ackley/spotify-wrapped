import { Clock, TrendingUp } from "lucide-react";

export default function TopTracksTable({ topTracks, formatDuration }: any) {
  return (
    <div className="flex-1 bg-[#181818] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp size={18} className="text-green-500" />
        <h2 className="text-xl font-bold tracking-tight">Top Songs</h2>
      </div>

      {topTracks.map((track: any, index: number) => (
        <div key={track.id} className="flex items-center py-2 px-4 hover:bg-white/5 rounded-lg">
          <div className="w-8">{index + 1}</div>
          <div className="flex-1 flex items-center gap-4">
            <img src={track.album.images[2]?.url} className="w-10 h-10 rounded" />
            <div>
              <div className="font-semibold">{track.name}</div>
              <div className="text-xs text-gray-400">
                {track.artists.map((a: any) => a.name).join(", ")}
              </div>
            </div>
          </div>
          <div className="w-16 text-right text-xs">{formatDuration(track.duration_ms)}</div>
        </div>
      ))}
    </div>
  );
}
