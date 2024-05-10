// import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'
// import { useEffect, useState } from 'react';
// import GoogleIcon from '@mui/icons-material/Google';
// import FacebookIcon from '@mui/icons-material/Facebook';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { RegisterUser } from "./pages/RegisterUser";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    </Router>
  )
}

export default App;
