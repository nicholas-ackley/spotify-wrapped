import { User } from "lucide-react";

export default function Header({ profile, playlists, formatName }: any) {
  return (
    <div className="w-full bg-gradient-to-r from-green-400 to-green-500 rounded-2xl p-8 flex items-end gap-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative w-40 h-40 rounded-full p-1 bg-white/20">
        <div className="w-full h-full bg-gray-800 rounded-full overflow-hidden shadow-2xl">
          {profile?.images?.[0]?.url ? (
            <img src={profile.images[0].url} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl bg-[#181818]">👤</div>
          )}
        </div>
      </div>

      <div className="relative mb-2 z-10">
        <p className="text-xs font-bold uppercase tracking-widest text-green-200 mb-1">Profile</p>
        <h1 className="text-5xl font-black mb-4">
          {profile?.display_name ? formatName(profile.display_name) : "Loading..."}
        </h1>
        <div className="flex items-center gap-3 text-sm text-white/90">
          <span className="flex items-center gap-1">
            <User size={14} /> {profile?.followers?.total || 0} Followers
          </span>
          <span className="text-white/40">•</span>
          <span>{playlists.length} Public Playlists</span>
        </div>
      </div>
    </div>
  );
}
