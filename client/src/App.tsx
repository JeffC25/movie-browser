import { BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/navigation/NavBar'
import HomePage from './scenes/HomePage'
import Results from './scenes/Results'

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <div className="flex h-screen object-fill bg-gray-800">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
