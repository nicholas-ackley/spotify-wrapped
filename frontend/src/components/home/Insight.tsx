import { useEffect, useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

type GenreStat = {
  genre: string;
  count: number;
};

const gradients = [
  "from-pink-400 to-purple-500",
  "from-green-400 to-emerald-500",
  "from-blue-400 to-cyan-500",
  "from-yellow-400 to-orange-500",
  "from-indigo-400 to-violet-500",
  "from-rose-400 to-red-500",
];

export default function Insight() {
  const [genres, setGenres] = useState<GenreStat[]>([]);

  useEffect(() => {
    fetch(`${BACKEND}/genre-breakdown`)
      .then((res) => res.json())
      .then(setGenres)
      .catch(console.error);
  }, []);

  const total = genres.reduce((sum, g) => sum + g.count, 0);

  return (
    <div className="bg-gradient-to-br from-[#4b26c0] to-[#361585] rounded-2xl p-6 shadow-xl sticky top-6">
      <h3 className="text-2xl font-bold mb-2">My Insights</h3>
      <p className="text-indigo-200 text-xs mb-6">
        Your most listened-to genres
      </p>

      <div className="space-y-4">
        {genres.map((g, i) => {
          const percentage = total
            ? Math.round((g.count / total) * 100)
            : 0;

          return (
            <div key={g.genre}>
              <div className="flex justify-between text-xs text-indigo-200 mb-1 capitalize">
                <span>{g.genre}</span>
                <span>{percentage}%</span>
              </div>

              <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${gradients[i % gradients.length]} transition-all`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}

        {genres.length === 0 && (
          <div className="text-xs text-indigo-200/60">
            Loading genre data...
          </div>
        )}
      </div>
    </div>
  );
}
