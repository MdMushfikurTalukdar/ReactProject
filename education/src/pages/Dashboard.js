import { Box, Grid } from "@mui/material";
import HomepageNav from "../components/HomepageNav";
import { Sidebar } from "../components/Sidebar";
import { DashboardIntro } from "../components/DashboardIntro";
import { DashboardMainBody } from "../components/DashboardMainBody";
import { DailyNotice } from "../components/DailyNotice";
import {Footer} from "../components/Footer"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"



export const Dashboard = () => {

  const navigate=useNavigate();

  useEffect(()=>{
    if(localStorage?.getItem('accesstoken')){
    const response=jwtDecode(localStorage?.getItem('accesstoken'));
    if(response.token_type!=='access' && typeof(response.user_id)!==Number && typeof(response.jti)!==String && response.exp<Date.now())
      {
        navigate('/login');
      }
    }else{
      navigate('/login');
    }
  },[]);
  return (
    <Box style={{fontFamily:"cursive"}}>
      <Box sx={{display:{
        xs:'inherit',
        lg:'none',
        md:'inherit',
        sm:'inherit'
      }}}>
      <HomepageNav />
      </Box>
      <Grid container>
        <Grid item lg={2} sx={{
            display:{sm:"none",md:"none",xs:"none",lg:"inherit"}
        }}>
          <Sidebar />
        </Grid>
       
        <Grid item xs={12} sm={12} md={12} lg={10}>
            <DashboardIntro/>
            <Grid container>
                <Grid item xs={12} md={12} sm={12} lg={8}>
                    <DashboardMainBody/>
                    
                </Grid>
 
            </Grid>
            
        </Grid>
      </Grid>
      <Footer/>
    </Box>
  );
};
