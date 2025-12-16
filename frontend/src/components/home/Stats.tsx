import { Music, Headphones, Moon } from "lucide-react";

export default function Stats({ publicPlaylists, lifetimeHours, peakHour }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Stat
        icon={<Music size={22} />}
        value={publicPlaylists}
        label="Public Playlists"
        gradient="from-purple-500 to-pink-500"
      />
      <Stat
        icon={<Headphones size={22} />}
        value={lifetimeHours || "..."}
        label="Total Minutes Listened"
        gradient="from-blue-500 to-cyan-500"
      />
      <Stat
        icon={<Moon size={22} />}
        value={peakHour !== null ? `${peakHour}:00` : "..."}
        label="Peak Listening Hour"
        gradient="from-green-500 to-emerald-500"
      />
    </div>
  );
}

function Stat({ icon, value, label, gradient }: any) {
  return (
    <div className="bg-[#181818] border border-white/5 rounded-xl p-6 hover:bg-[#202020] transition group relative overflow-hidden">
      
      {/* Decorative background icon */}
      <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition transform group-hover:scale-110">
        {icon}
      </div>

      {/* Gradient icon badge */}
      <div
        className={`p-3 rounded-lg w-fit mb-4 bg-gradient-to-br ${gradient} text-black shadow-lg`}
      >
        {icon}
      </div>

      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}
