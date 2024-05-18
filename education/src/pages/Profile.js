import { Box, Grid } from "@mui/material";
import HomepageNav from "../components/HomepageNav";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ProfileMainBody } from "../components/ProfileMainBody";
import { SmallScreenNavbar } from "../components/SmallScreenNavbar";

export const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (
        response.token_type !== "access" &&
        typeof response.user_id !== Number &&
        typeof response.jti !== String
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <Box style={{ fontFamily: "Math",minHeight: "100vh" }}>
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
        <Box sx={{
            display:{sm:"inherit",md:"inherit",xs:"inherit",lg:"none"}
        }}>
          <SmallScreenNavbar  />
        </Box>
        <Grid item xs={12} sm={12} md={12} lg={10}>
          <ProfileMainBody/>
        </Grid>
      </Grid>
      <Footer/>
    </Box>
  );
};
