import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { playSong, toggleLike } from '../redux/playerSlice'
import { showToast } from '../redux/uiSlice'

export default function SongCard({ song }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentSong, isPlaying, liked } = useSelector(s => s.player)

  const isActive = currentSong?.id === song.id
  const isLiked = liked.includes(song.id)

  const handlePlay = (e) => {
    e.stopPropagation()
    dispatch(playSong(song))
    dispatch(showToast(`Now playing: ${song.title}`))
  }

  const handleLike = (e) => {
    e.stopPropagation()
    dispatch(toggleLike(song.id))
    dispatch(showToast(isLiked ? 'Removed from liked' : 'Added to liked ♥'))
  }

  return (
    <div
      onClick={() => navigate(`/song/${song.id}`)}
      className={`group relative bg-gray-900 rounded-xl overflow-hidden cursor-pointer border transition-all hover:-translate-y-1 hover:shadow-lg ${
        isActive
          ? 'border-purple-500 shadow-purple-500/20 shadow-lg'
          : 'border-gray-800 hover:border-gray-600'
      }`}
    >
      {/* Playing badge */}
      {isActive && (
        <div className="absolute top-2 right-2 z-10 bg-purple-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
          <div className="flex items-end gap-0.5 h-3">
            <div className="w-0.5 bg-white rounded-sm eq-bar" style={{ height: 6 }} />
            <div className="w-0.5 bg-white rounded-sm eq-bar" style={{ height: 6 }} />
            <div className="w-0.5 bg-white rounded-sm eq-bar" style={{ height: 6 }} />
          </div>
          Playing
        </div>
      )}

      {/* Cover */}
      <div
        className="relative w-full aspect-square flex items-center justify-center text-5xl"
        style={{ background: song.color + '22' }}
      >
        <span>{song.emoji}</span>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handlePlay}
            className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-500 transition text-white shadow-lg"
          >
            <i className={`ti ${isActive && isPlaying ? 'ti-player-pause' : 'ti-player-play'} text-lg`} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-medium text-white truncate">{song.title}</p>
        <p className="text-xs text-gray-500 truncate mt-0.5">{song.artist}</p>
        <div className="flex items-center justify-between mt-2">
          <span
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{ background: song.color + '22', color: song.color }}
          >
            {song.genre}
          </span>
          <button
            onClick={handleLike}
            className={`text-sm transition ${isLiked ? 'text-red-400' : 'text-gray-600 hover:text-red-400'}`}
          >
            <i className={`ti ${isLiked ? 'ti-heart-filled' : 'ti-heart'}`} />
          </button>
        </div>
      </div>
    </div>
  )
}