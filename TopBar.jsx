import { useDispatch, useSelector } from 'react-redux'
import { setSearch, toggleTheme } from '../redux/uiSlice'
import { GENRES } from '../data/songs'
import { setGenre } from '../redux/uiSlice'

export default function TopBar() {
  const dispatch = useDispatch()
  const { search, genre, theme } = useSelector(s => s.ui)

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2 text-purple-400 font-bold text-lg flex-shrink-0">
          <i className="ti ti-music" />
          <span className="hidden sm:block">Soundscape</span>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
          <input
            type="text"
            value={search}
            onChange={e => dispatch(setSearch(e.target.value))}
            placeholder="Search songs, artists..."
            className="w-full bg-gray-800 border border-gray-700 rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* Genre pills */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide flex-1">
          {GENRES.map(g => (
            <button
              key={g}
              onClick={() => dispatch(setGenre(g))}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs border transition ${
                genre === g
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition flex-shrink-0"
        >
          <i className={`ti ${theme === 'dark' ? 'ti-sun' : 'ti-moon'} text-sm`} />
        </button>
      </div>
    </header>
  )
}