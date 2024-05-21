import { Box, Grid, Typography } from "@mui/material";

export const DashboardIntro = () => {
  return (
    <Box sx={{backgroundColor:"#925FE2",width:"80vw",marginLeft:{lg:"25px",md:"100px",sm:"70px",xs:"40px"},marginTop:"80px",borderRadius:"15px"
    }}>
      <Box style={{padding:"50px",color:"white"}}>
        <Grid container>
          <Grid item sm={8} md={8} xs={12} lg={8}>
                <Typography variant="p">July 13,2023</Typography>
                <Typography variant="h5" style={{marginTop:"25px"}}>Welcome back, User!</Typography>
                <Typography variant="p">
                Always stay updated in your student portal
                </Typography>
          </Grid>

          <Grid item>
           
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
