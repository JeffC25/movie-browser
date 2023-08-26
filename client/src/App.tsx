import { BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/navigation/NavBar'
import HomePage from './scenes/HomePage'
import Results from './scenes/Results'

function App() {
  return (
    <div className="bg-gray-800 min-h-screen">
      <BrowserRouter>
        <NavBar/>
        <div className="flex">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<Results />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
