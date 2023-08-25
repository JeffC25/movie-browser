import { BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './components/navigation/NavBar'
import HomePage from './scenes/HomePage'
import Results from './scenes/Results'

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <div className="flex bg-gray-700 h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
