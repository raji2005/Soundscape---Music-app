import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PLAYLISTS } from '../data/songs'

const navItems = [
  { to: '/',      icon: 'ti-home',     label: 'Home' },
  { to: '/liked', icon: 'ti-heart',    label: 'Liked Songs' },
]

export default function Sidebar() {
  const liked = useSelector(s => s.player.liked)

  return (
    <aside className="w-14 md:w-52 bg-gray-900 border-r border-gray-800 flex-shrink-0 overflow-y-auto scrollbar-thin py-4">
      {/* Main nav */}
      <div className="mb-6">
        <p className="hidden md:block text-xs font-semibold text-gray-500 uppercase tracking-widest px-4 mb-2">Browse</p>
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 text-sm transition cursor-pointer ${
                isActive
                  ? 'text-purple-400 bg-purple-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`
            }
          >
            <i className={`ti ${icon} text-base flex-shrink-0`} />
            <span className="hidden md:block">{label}</span>
            {label === 'Liked Songs' && liked.length > 0 && (
              <span className="hidden md:flex ml-auto text-xs bg-purple-600 text-white rounded-full w-5 h-5 items-center justify-center">
                {liked.length}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Playlists */}
      <div>
        <p className="hidden md:block text-xs font-semibold text-gray-500 uppercase tracking-widest px-4 mb-2">Playlists</p>
        {PLAYLISTS.map(pl => (
          <div
            key={pl.id}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer transition"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: pl.color }}
            />
            <span className="hidden md:block truncate">{pl.name}</span>
          </div>
        ))}
      </div>

      {/* Artists */}
      <div className="mt-6">
        <p className="hidden md:block text-xs font-semibold text-gray-500 uppercase tracking-widest px-4 mb-2">Artists</p>
        {['Luna Ray', 'Neon Pulse', 'Echo Drift', 'Aria Stone'].map(a => (
          <div
            key={a}
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer transition"
          >
            <i className="ti ti-user-circle text-base flex-shrink-0" />
            <span className="hidden md:block truncate">{a}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}