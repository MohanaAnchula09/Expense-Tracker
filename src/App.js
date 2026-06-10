import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expenses from "./pages/Expenses";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Movies from "./pages/Movies";
import Weather from "./pages/Weather";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/weather" element={<Weather/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
