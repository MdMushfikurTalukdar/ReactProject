import './App.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { RegisterUser } from "./pages/RegisterUser";
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from "./pages/Login";
import { Leave } from "./pages/Leave";

function App() {
  return (
    <>
  
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/" element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path='/leave' element={<Leave />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
