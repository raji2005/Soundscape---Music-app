import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { tick } from './redux/playerSlice'
import { clearToast } from './redux/uiSlice'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import PlayerBar from './components/PlayerBar'
import Toast from './components/Toast'
import Home from './pages/Home'
import SongDetail from './pages/SongDetail'
import LikedSongs from './pages/LikedSongs'

export default function App() {
  const dispatch = useDispatch()
  const { toast } = useSelector(s => s.ui)

  useEffect(() => {
    const interval = setInterval(() => dispatch(tick()), 1000)
    return () => clearInterval(interval)
  }, [dispatch])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => dispatch(clearToast()), 2500)
    return () => clearTimeout(t)
  }, [toast, dispatch])

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/song/:id" element={<SongDetail />} />
            <Route path="/liked" element={<LikedSongs />} />
          </Routes>
        </main>
      </div>
      <PlayerBar />
      {toast && <Toast message={toast} />}
    </div>
  )
}