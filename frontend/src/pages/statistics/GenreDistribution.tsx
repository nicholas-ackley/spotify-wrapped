import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#16a34a",
  "#4ade80",
  "#86efac",
  "#a3e635",
  "#facc15",
];

type Genre = {
  genre: string;
  count: number;
};

export default function GenreDistribution({ genres }: { genres: Genre[] }) {
  const total = genres.reduce((sum, g) => sum + g.count, 0);

  return (
    <div className="bg-[#181818] rounded-2xl p-6 border border-white/5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
          🎧
        </div>
        <div>
          <h2 className="text-xl font-bold">Genre Distribution</h2>
          <p className="text-xs text-gray-400">
            Your music taste breakdown by plays
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={genres}
              dataKey="count"
              nameKey="genre"
              outerRadius={100}
              label={({ name, value }) => {
                const pct =
                  total && value
                    ? Math.round((Number(value) / total) * 100)
                    : 0;
                return `${name} ${pct}%`;
              }}
            >
              {genres.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="space-y-3">
          {genres.map((g, i) => (
            <div
              key={g.genre}
              className="flex justify-between text-sm"
            >
              <div className="flex items-center gap-2 capitalize">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: COLORS[i % COLORS.length],
                  }}
                />
                {g.genre}
              </div>
              <span className="text-gray-400">
                {g.count} plays
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
