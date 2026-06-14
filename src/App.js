// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Expenses from "./pages/Expenses";
// import NotFound from "./components/NotFound";
// import Home from "./pages/Home";
import Navbar from "./components/NavBar";
// import Movies from "./pages/Movies";
// import Weather from "./pages/Weather";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//      <Navbar/>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/expenses" element={<Expenses />} />
//         <Route path="/movies" element={<Movies/>} />
//         <Route path="/weather" element={<Weather/>}/>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//     </div>
//   );
// }

// export default App;

// import Posts from "./components/posts";

// function App() {
//   return (
//     <div>
//       <Posts />
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;