import { Box, Grid, Typography } from "@mui/material";
import { DashboardNotices } from "./DashboardNotices";

export const DailyNotice = () => {
  return (
    <div className="daily-notice" style={{ marginLeft: "20px", marginTop: "20px",padding:"20px"}}>
     
      <Grid container style={{ marginBottom: "20px" }}>
        <Grid item xs={6} md={6} lg={6} sm={6}>
          <Typography variant="h6">Daily notice</Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6} sm={6} style={{ textAlign: "end" }}>
          <Typography variant="h6" style={{ color: "purple" }}>
            See all
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{height:"45vh",overflowY:"scroll" }}>
        <DashboardNotices/>
      </Box>
    </div>
  );
};
