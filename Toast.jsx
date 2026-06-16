export default function Toast({ message }) {
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 fade-in">
      <div className="bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
        {message}
      </div>
    </div>
  )
}