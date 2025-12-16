import { Home, Music, Bell, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // Helper to check active state for styling
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-[#000000] text-white flex flex-col p-6 fixed left-0 top-0 z-50 border-r border-white/10">
      <div className="mb-10 flex items-center gap-2">
        {/* Optional Logo Icon */}
        <Music className="text-green-500 w-8 h-8" />
        <h1 className="text-2xl font-bold tracking-tighter">Spotify Stats</h1>
      </div>

      <nav className="flex flex-col gap-2">
        <Link 
          to="/" 
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
            isActive("/") ? "bg-green-500 text-black font-bold" : "text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Home size={20} className={isActive("/") ? "text-black" : "group-hover:text-white"} /> 
          Dashboard
        </Link>

        <Link 
          to="/statistics" 
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
            isActive("/top") ? "bg-green-500 text-black font-bold" : "text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Music size={20} className={isActive("/top") ? "text-black" : "group-hover:text-white"} /> 
          Top Tracks
        </Link>

        <Link 
          to="/genres" 
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
            isActive("/genres") ? "bg-green-500 text-black font-bold" : "text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Bell size={20} className={isActive("/genres") ? "text-black" : "group-hover:text-white"} /> 
          Genres
        </Link>

        <Link 
          to="/profile" 
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
            isActive("/profile") ? "bg-green-500 text-black font-bold" : "text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <User size={20} className={isActive("/profile") ? "text-black" : "group-hover:text-white"} /> 
          Profile
        </Link>
      </nav>
      
      {/* Optional User mini-profile at bottom */}
      <div className="mt-auto pt-6 border-t border-white/10">
         <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-2">Your Account</p>
         <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer transition">
             <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold">N</div>
             <span>Logout</span>
         </div>
      </div>
    </div>
  );
}