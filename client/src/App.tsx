import { BrowserRouter, Routes} from 'react-router-dom'
import NavBar from './components/navigation/NavBar'

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <div className="flex bg-gray-700 min-h-screen">
        <Routes>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
