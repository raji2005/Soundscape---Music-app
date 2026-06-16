import { useDispatch, useSelector } from 'react-redux'
import { playSong } from '../redux/playerSlice'
import { showToast } from '../redux/uiSlice'
import { SONGS } from '../data/songs'

export default function TopPlay() {
  const dispatch = useDispatch()
  const { currentSong, isPlaying } = useSelector(s => s.player)
  const top5 = SONGS.slice(0, 5)

  return (
    <div className="bg-gray-900 rounded-xl p-4 mb-6">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
        🔥 Top Tracks
      </p>
      <div className="space-y-1">
        {top5.map((song, i) => {
          const isActive = currentSong?.id === song.id && isPlaying
          return (
            <div
              key={song.id}
              onClick={() => {
                dispatch(playSong(song))
                dispatch(showToast(`Now playing: ${song.title}`))
              }}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition group ${
                isActive ? 'bg-purple-500/10' : 'hover:bg-gray-800'
              }`}
            >
              <span className="w-5 text-xs text-center text-gray-600">{i + 1}</span>

              <div
                className="w-9 h-9 rounded flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: song.color + '22' }}
              >
                {song.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate ${isActive ? 'text-purple-400' : 'text-white'}`}>
                  {song.title}
                </p>
                <p className="text-[11px] text-gray-500 truncate">{song.artist}</p>
              </div>

              {isActive ? (
                <div className="flex items-end gap-0.5 h-4">
                  <div className="w-0.5 bg-purple-400 rounded-sm eq-bar" />
                  <div className="w-0.5 bg-purple-400 rounded-sm eq-bar" />
                  <div className="w-0.5 bg-purple-400 rounded-sm eq-bar" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <i className="ti ti-player-play text-[10px] text-white" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}