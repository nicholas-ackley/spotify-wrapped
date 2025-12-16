import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TopArtists({ artists }: any) {
  return (
    <div className="bg-[#181818] rounded-2xl p-6 border border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          📈
        </div>
        <div>
          <h2 className="text-xl font-bold">Top Artists</h2>
          <p className="text-xs text-gray-400">
            Your most played artists
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={artists}>
          <XAxis dataKey="name" hide />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="plays"
            radius={[6, 6, 0, 0]}
            fill="#22c55e"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
