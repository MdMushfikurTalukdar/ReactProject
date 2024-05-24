import { Box, Grid } from "@mui/material";
import HomepageNav from "../components/HomepageNav";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ProfileMainBody } from "../components/ProfileMainBody";
import { SmallScreenNavbar } from "../components/SmallScreenNavbar";
import axios from "axios";

export const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (
        response.token_type !== "access" 
        && response.exp<Math.floor(Date.now() / 1000)
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }

  
  }, []);

  return (
    <Box style={{ fontFamily: "Math", minHeight: "100vh" }}>
      <HomepageNav />
      <Grid container>
        <Grid
          item
          lg={2}
          sx={{
            display: { sm: "none", md: "none", xs: "none", lg: "inherit" },
          }}
        >
          <Sidebar />
        </Grid>
     
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <ProfileMainBody />
        </Grid>
      </Grid>
    
    </Box>
  );
};
