import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { playSong, toggleLike } from '../redux/playerSlice'
import { showToast } from '../redux/uiSlice'
import { SONGS } from '../data/songs'

export default function LikedSongs() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { liked, currentSong, isPlaying } = useSelector(s => s.player)
  const likedSongs = SONGS.filter(s => liked.includes(s.id))

  if (likedSongs.length === 0) return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-500 fade-in">
      <i className="ti ti-heart text-5xl mb-4 text-gray-700" />
      <p className="text-base font-medium text-gray-400 mb-1">No liked songs yet</p>
      <p className="text-sm mb-6">Songs you like will appear here</p>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-full transition"
      >
        Browse Songs
      </button>
    </div>
  )

  return (
    <div className="fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center text-3xl">
          ♥
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Playlist</p>
          <h1 className="text-2xl font-bold text-white">Liked Songs</h1>
          <p className="text-sm text-gray-400">{likedSongs.length} songs</p>
        </div>
      </div>

      <div className="space-y-1">
        {likedSongs.map((song, i) => {
          const isActive = currentSong?.id === song.id
          return (
            <div
              key={song.id}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition group ${
                isActive ? 'bg-purple-500/10' : 'hover:bg-gray-800'
              }`}
              onClick={() => navigate(`/song/${song.id}`)}
            >
              <span className="w-5 text-xs text-center text-gray-600">{i + 1}</span>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: song.color + '22' }}
              >
                {song.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${isActive ? 'text-purple-400' : 'text-white'}`}>
                  {song.title}
                </p>
                <p className="text-xs text-gray-500 truncate">{song.artist}</p>
              </div>
              <span className="text-xs text-gray-600 hidden sm:block">{song.genre}</span>
              <span className="text-xs text-gray-600">{song.duration}</span>
              <button
                onClick={e => {
                  e.stopPropagation()
                  dispatch(toggleLike(song.id))
                  dispatch(showToast('Removed from liked'))
                }}
                className="text-red-400 hover:text-red-300 transition text-sm px-1"
              >
                <i className="ti ti-heart-filled" />
              </button>
              <button
                onClick={e => {
                  e.stopPropagation()
                  dispatch(playSong(song))
                  dispatch(showToast(`Now playing: ${song.title}`))
                }}
                className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center transition"
              >
                <i className={`ti ${isActive && isPlaying ? 'ti-player-pause' : 'ti-player-play'} text-white text-xs`} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}