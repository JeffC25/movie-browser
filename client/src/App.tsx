import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Details from './scenes/Details'
import HomePage from './scenes/HomePage'
import Results from './scenes/Results'

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="flex">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<Results />} />
            <Route path="/details/:id" element={<Details />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
