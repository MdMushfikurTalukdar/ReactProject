import './App.css';
import Navbar from "./Components/Pages/Navbar";
import Home from "./Components/Pages/Home";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { RegisterUser } from "./pages/RegisterUser";

function App() {
  return (
    <>
    <Navbar platform="Education" home="Home" aboutUs="About Us" login="Login" />
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
