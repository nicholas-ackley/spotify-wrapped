import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion
import NowPlaying from "../../components/widget/NowPlaying";

export default function Home() {
  const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
  const [loading, setLoading] = useState(true);
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [peakHour, setPeakHour] = useState<number | null>(null);
  const [lifetimeMinutes, setLifetimeMinutes] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracksRes, hourRes, lifeRes] = await Promise.all([
          fetch(`${BACKEND}/top-tracks`),
          fetch(`${BACKEND}/listening-by-hour`),
          fetch(`${BACKEND}/lifetime-listening`)
        ]);
        setTopTracks(await tracksRes.json());
        const hourData = await hourRes.json();
        setPeakHour(hourData.peakHour);
        const lifeData = await lifeRes.json();
        setLifetimeMinutes(lifeData.minutes);
      } catch (error) {
        console.error("Backend API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [BACKEND]);

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVars = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">LOADING_YEAR_DATA...</div>;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center p-8">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2d1b4d] via-black to-black opacity-60" />

      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl w-full text-center space-y-12"
      >
        <motion.div variants={itemVars} className="flex justify-center">
          <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-md">
            ✨ 2025 Wrapped
          </span>
        </motion.div>

        <motion.div variants={itemVars} className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight">
            Your Year <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d984ff] via-[#8596ff] to-[#46e8ff]">
              in Sound
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Every beat, every lyric, every late-night listen — your 
            musical journey, beautifully wrapped.
          </p>
        </motion.div>

        <motion.div variants={itemVars} className="flex justify-center">
          <button className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
            <svg className="w-5 h-5 fill-current group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Reveal Your Wrapped
          </button>
        </motion.div>

        <motion.div variants={itemVars} className="flex justify-center items-center gap-12 pt-12 text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">
          <div className="flex flex-col">
             <span>{Math.floor(lifetimeMinutes / 60).toLocaleString()}+ Hours</span>
          </div>
          <div className="w-px h-4 bg-gray-800" />
          <div className="flex flex-col">
             <span>{topTracks.length} Top Tracks</span>
          </div>
          <div className="w-px h-4 bg-gray-800" />
          <div className="flex flex-col">
             <span>Peak Hour: {peakHour}:00</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}