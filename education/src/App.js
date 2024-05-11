import './App.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { RegisterUser } from "./pages/RegisterUser";
import { Home } from './pages/Home';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
