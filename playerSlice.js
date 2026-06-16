import { createSlice } from '@reduxjs/toolkit'
import { SONGS } from '../data/songs'

function parseDuration(d) {
  const [m, s] = d.split(':').map(Number)
  return m * 60 + s
}

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentSong: null,
    isPlaying: false,
    currentIndex: 0,
    liked: [],
    volume: 75,
    repeat: false,
    shuffle: false,
    progress: 0,
    elapsed: 0,
  },
  reducers: {
    playSong(state, action) {
      state.currentSong = action.payload
      state.isPlaying = true
      state.elapsed = 0
      state.progress = 0
      state.currentIndex = SONGS.findIndex(s => s.id === action.payload.id)
    },
    togglePlay(state) {
      if (!state.currentSong) {
        state.currentSong = SONGS[0]
        state.currentIndex = 0
        state.isPlaying = true
      } else {
        state.isPlaying = !state.isPlaying
      }
    },
    nextSong(state) {
      const idx = state.shuffle
        ? Math.floor(Math.random() * SONGS.length)
        : (state.currentIndex + 1) % SONGS.length
      state.currentIndex = idx
      state.currentSong = SONGS[idx]
      state.isPlaying = true
      state.elapsed = 0
      state.progress = 0
    },
    prevSong(state) {
      const idx = (state.currentIndex - 1 + SONGS.length) % SONGS.length
      state.currentIndex = idx
      state.currentSong = SONGS[idx]
      state.isPlaying = true
      state.elapsed = 0
      state.progress = 0
    },
    tick(state) {
      if (!state.isPlaying || !state.currentSong) return
      const total = parseDuration(state.currentSong.duration)
      state.elapsed = Math.min(state.elapsed + 1, total)
      state.progress = (state.elapsed / total) * 100
      if (state.elapsed >= total) {
        if (state.repeat) {
          state.elapsed = 0
          state.progress = 0
        } else {
          const idx = (state.currentIndex + 1) % SONGS.length
          state.currentIndex = idx
          state.currentSong = SONGS[idx]
          state.elapsed = 0
          state.progress = 0
        }
      }
    },
    seek(state, action) {
      if (!state.currentSong) return
      const total = parseDuration(state.currentSong.duration)
      state.elapsed = Math.floor((action.payload / 100) * total)
      state.progress = action.payload
    },
    setVolume(state, action) {
      state.volume = action.payload
    },
    toggleLike(state, action) {
      const id = action.payload
      if (state.liked.includes(id)) {
        state.liked = state.liked.filter(x => x !== id)
      } else {
        state.liked.push(id)
      }
    },
    toggleRepeat(state) {
      state.repeat = !state.repeat
    },
    toggleShuffle(state) {
      state.shuffle = !state.shuffle
    },
  },
})

export const {
  playSong,
  togglePlay,
  nextSong,
  prevSong,
  tick,
  seek,
  setVolume,
  toggleLike,
  toggleRepeat,
  toggleShuffle,
} = playerSlice.actions

export default playerSlice.reducer