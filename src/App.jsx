import React from 'react'
// import RegistrationPage from './components/Registration'
import { BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import {LoginPage} from "./Pages/Login.jsx"
// import "App.css"
function App() {
  return (
  
    <Router>
    <Routes>
      <Route path="/login" element={<LoginPage/>} />
    </Routes>
    </Router>
  )
}

export default App
