import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'dark',
    genre: 'All',
    search: '',
    page: 1,
    toast: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    setGenre(state, action) {
      state.genre = action.payload
      state.page = 1
    },
    setSearch(state, action) {
      state.search = action.payload
      state.page = 1
    },
    setPage(state, action) {
      state.page = action.payload
    },
    showToast(state, action) {
      state.toast = action.payload
    },
    clearToast(state) {
      state.toast = null
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
  },
})

export const {
  toggleTheme, setGenre, setSearch, setPage,
  showToast, clearToast, setLoading, setError,
} = uiSlice.actions

export default uiSlice.reducer