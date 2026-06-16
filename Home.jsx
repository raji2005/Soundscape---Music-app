import { useSelector } from 'react-redux'
import { SONGS } from '../data/songs'
import SongCard from '../components/SongCard'
import TopPlay from '../components/TopPlay'
import { useDispatch } from 'react-redux'
import { setPage } from '../redux/uiSlice'

const PAGE_SIZE = 6

export default function Home() {
  const dispatch = useDispatch()
  const { genre, search, page } = useSelector(s => s.ui)

  const filtered = SONGS.filter(s => {
    const gMatch = genre === 'All' || s.genre === genre
    const q = search.toLowerCase()
    const sMatch = !q || s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
    return gMatch && sMatch
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="fade-in">
      <TopPlay />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white">
          {genre === 'All' ? 'All Songs' : genre}
          <span className="text-gray-500 font-normal text-sm ml-2">· {filtered.length} songs</span>
        </h2>
      </div>

      {/* Error: no results */}
      {paginated.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <i className="ti ti-music-off text-4xl mb-3" />
          <p className="text-sm">No songs found for "{search}"</p>
        </div>
      )}

      {/* Song grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {paginated.map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
            disabled={page === 1}
            className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-30 transition text-sm flex items-center justify-center"
          >
            <i className="ti ti-chevron-left" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => dispatch(setPage(p))}
              className={`w-8 h-8 rounded-lg text-sm border transition ${
                page === p
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => dispatch(setPage(Math.min(totalPages, page + 1)))}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-30 transition text-sm flex items-center justify-center"
          >
            <i className="ti ti-chevron-right" />
          </button>
        </div>
      )}
    </div>
  )
}