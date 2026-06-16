import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { playSong, toggleLike } from '../redux/playerSlice'
import { showToast } from '../redux/uiSlice'
import { SONGS } from '../data/songs'

export default function SongDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentSong, isPlaying, liked } = useSelector(s => s.player)

  const song = SONGS.find(s => s.id === Number(id))

  if (!song) return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <i className="ti ti-music-off text-4xl mb-3" />
      <p>Song not found.</p>
      <button onClick={() => navigate('/')} className="mt-4 text-purple-400 text-sm hover:underline">
        ← Back to Home
      </button>
    </div>
  )

  const isActive = currentSong?.id === song.id
  const isLiked = liked.includes(song.id)
  const related = SONGS.filter(s => s.id !== song.id && (s.genre === song.genre || s.artist === song.artist)).slice(0, 5)

  const handlePlay = () => {
    dispatch(playSong(song))
    dispatch(showToast(`Now playing: ${song.title}`))
  }

  const handleLike = () => {
    dispatch(toggleLike(song.id))
    dispatch(showToast(isLiked ? 'Removed from liked' : 'Added to liked ♥'))
  }

  return (
    <div className="fade-in max-w-2xl">
      {/* Back */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition"
      >
        <i className="ti ti-arrow-left" /> Back
      </button>

      {/* Hero */}
      <div className="flex gap-6 mb-8">
        <div
          className={`w-32 h-32 rounded-2xl flex items-center justify-center text-6xl flex-shrink-0 ${isActive && isPlaying ? 'spin-slow' : ''}`}
          style={{ background: song.color + '22' }}
        >
          {song.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-purple-400 uppercase tracking-widest mb-1">{song.genre}</p>
          <h1 className="text-2xl font-bold text-white mb-1">{song.title}</h1>
          <p className="text-gray-400 mb-4">{song.artist}</p>

          <div className="flex gap-6 mb-4">
            <div>
              <p className="text-base font-semibold text-white">{song.plays}</p>
              <p className="text-xs text-gray-500">Plays</p>
            </div>
            <div>
              <p className="text-base font-semibold text-white">{song.duration}</p>
              <p className="text-xs text-gray-500">Duration</p>
            </div>
            <div>
              <p className="text-base font-semibold text-white">{song.year}</p>
              <p className="text-xs text-gray-500">Year</p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-full transition"
            >
              <i className={`ti ${isActive && isPlaying ? 'ti-player-pause' : 'ti-player-play'}`} />
              {isActive && isPlaying ? 'Pause' : 'Play'}
            </button>

            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full border transition ${
                isLiked
                  ? 'border-red-500 text-red-400 bg-red-500/10'
                  : 'border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <i className={`ti ${isLiked ? 'ti-heart-filled' : 'ti-heart'}`} />
              {isLiked ? 'Liked' : 'Like'}
            </button>

            <button
              onClick={() => dispatch(showToast('Added to queue'))}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <i className="ti ti-playlist-add" /> Queue
            </button>

            <button
              onClick={() => dispatch(showToast('Link copied!'))}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition"
            >
              <i className="ti ti-share" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-gray-400 mb-3">More like this</h2>
          <div className="space-y-1">
            {related.map(r => (
              <div
                key={r.id}
                onClick={() => navigate(`/song/${r.id}`)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 cursor-pointer transition group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: r.color + '22' }}
                >
                  {r.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{r.title}</p>
                  <p className="text-xs text-gray-500 truncate">{r.artist}</p>
                </div>
                <span className="text-xs text-gray-600">{r.duration}</span>
                <button
                  onClick={e => { e.stopPropagation(); dispatch(playSong(r)); dispatch(showToast(`Now playing: ${r.title}`)) }}
                  className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center transition"
                >
                  <i className="ti ti-player-play text-white text-xs" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}