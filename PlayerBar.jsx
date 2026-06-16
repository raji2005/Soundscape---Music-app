import { useDispatch, useSelector } from 'react-redux'
import {
  togglePlay, nextSong, prevSong, seek,
  setVolume, toggleLike, toggleRepeat, toggleShuffle,
} from '../redux/playerSlice'
import { showToast } from '../redux/uiSlice'

function fmtTime(s) {
  return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0')
}

export default function PlayerBar() {
  const dispatch = useDispatch()
  const { currentSong, isPlaying, progress, elapsed, volume, repeat, shuffle, liked } = useSelector(s => s.player)
  const isLiked = currentSong && liked.includes(currentSong.id)

  const handleSeek = (e) => {
    const bar = e.currentTarget
    const pct = (e.nativeEvent.offsetX / bar.offsetWidth) * 100
    dispatch(seek(Math.max(0, Math.min(100, pct))))
  }

  const handleLike = () => {
    if (!currentSong) return
    dispatch(toggleLike(currentSong.id))
    dispatch(showToast(isLiked ? 'Removed from liked' : 'Added to liked ♥'))
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800 px-4 py-3 flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* Cover + info */}
        <div className="flex items-center gap-3 w-36 md:w-48 flex-shrink-0">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 ${isPlaying ? 'spin-slow' : ''}`}
            style={{ background: currentSong ? currentSong.color + '22' : '#1f2937' }}
          >
            {currentSong ? currentSong.emoji : '🎵'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate">
              {currentSong?.title ?? 'No song selected'}
            </p>
            <p className="text-[11px] text-gray-500 truncate">{currentSong?.artist ?? '—'}</p>
          </div>
        </div>

        {/* Like button */}
        <button
          onClick={handleLike}
          className={`flex-shrink-0 transition text-base ${isLiked ? 'text-red-400' : 'text-gray-600 hover:text-red-400'}`}
        >
          <i className={`ti ${isLiked ? 'ti-heart-filled' : 'ti-heart'}`} />
        </button>

        {/* Progress + controls */}
        <div className="flex flex-col flex-1 min-w-0 gap-1">
          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                dispatch(toggleShuffle())
                dispatch(showToast(shuffle ? 'Shuffle off' : 'Shuffle on'))
              }}
              className={`text-sm transition ${shuffle ? 'text-purple-400' : 'text-gray-500 hover:text-white'}`}
            >
              <i className="ti ti-arrows-shuffle" />
            </button>

            <button
              onClick={() => dispatch(prevSong())}
              className="text-gray-400 hover:text-white transition text-base"
            >
              <i className="ti ti-player-skip-back" />
            </button>

            <button
              onClick={() => dispatch(togglePlay())}
              className="w-9 h-9 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white transition text-base"
            >
              <i className={`ti ${isPlaying ? 'ti-player-pause' : 'ti-player-play'}`} />
            </button>

            <button
              onClick={() => dispatch(nextSong())}
              className="text-gray-400 hover:text-white transition text-base"
            >
              <i className="ti ti-player-skip-forward" />
            </button>

            <button
              onClick={() => {
                dispatch(toggleRepeat())
                dispatch(showToast(repeat ? 'Repeat off' : 'Repeat on'))
              }}
              className={`text-sm transition ${repeat ? 'text-purple-400' : 'text-gray-500 hover:text-white'}`}
            >
              <i className="ti ti-repeat" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 w-7 text-right">{fmtTime(elapsed)}</span>
            <div
              className="progress-bar flex-1"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-purple-500 rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="progress-thumb" />
              </div>
            </div>
            <span className="text-[10px] text-gray-500 w-7">
              {currentSong?.duration ?? '0:00'}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <i className="ti ti-volume text-gray-500 text-sm" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={e => dispatch(setVolume(Number(e.target.value)))}
            className="w-20 accent-purple-500 cursor-pointer"
          />
        </div>
      </div>
    </footer>
  )
}