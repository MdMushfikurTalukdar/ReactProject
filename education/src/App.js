import './App.css';

import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Pages/Navbar";
import Home from "./Components/Pages/Home";

function App() {
  return (
    <>
      <Navbar platform="Education" home="Home" aboutUs="About Us" login="Login" />
      <Home />
    </>
  );
}

export default App;
