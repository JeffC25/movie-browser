import { BrowserRouter, Routes, Route} from "react-router-dom";
import Details from "./scenes/Details";
import HomePage from "./scenes/HomePage";
import Results from "./scenes/Results";
import About from "./scenes/About";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<Results />} />
          <Route path="/list" element={<Results />} />
          <Route path="/details/:id" element={<Details />}/>
          <Route path="/about" element={<About />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
