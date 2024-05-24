import "./App.css";
import {gsap} from "gsap";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { RegisterUser } from "./pages/RegisterUser";
import {Home} from "./pages/Home.js";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/Login";
import { Leave } from "./pages/Leave";
import { Profile } from "./pages/Profile";
import { BonafideCertificate } from "./pages/BonafideCertificate";
import { EditProfile } from "./pages/EditProfile";
import { About } from "./pages/About.js";

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profileEdit" element={<EditProfile />} />
            <Route path="/about" element={<About/>}/>
            <Route
              path="/bonafideCertificate"
              element={<BonafideCertificate />}
            />
          </Routes>
        </Router>

    </>
  );
}

export default App;