import { Music, BarChart3, Users, Calendar } from "lucide-react";

export default function StatsCards({ stats }: any) {
  const items = [
    {
      label: "Total Songs",
      value: stats?.songs || "...",
      icon: <Music />,
      gradient: "from-pink-500 to-purple-500",
    },
    {
      label: "Total Plays",
      value: stats?.plays || "...",
      icon: <BarChart3 />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      label: "Unique Artists",
      value: stats?.artists || "...",
      icon: <Users />,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      label: "Genres",
      value: stats?.genres || "...",
      icon: <Calendar />,
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-[#181818] rounded-xl p-6 border border-white/5"
        >
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-black mb-4`}
          >
            {item.icon}
          </div>
          <div className="text-sm text-gray-400">{item.label}</div>
          <div className="text-3xl font-bold">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
