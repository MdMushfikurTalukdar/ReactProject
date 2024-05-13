import { Box, Grid, Typography } from "@mui/material";
import DashboardCard from "./DashboardCard";
import { Schedule } from "./Schedule";

export const DashboardMainBody = () => {
  return (
    <Box
      sx={{
        marginLeft: "20px",
        marginTop: "20px",
        overflowX: "hidden",
        width: { lg: "55vw", md: "92vw", sm: "90vw",xs:"90vw" },
      }}
    >
      <Grid container style={{ marginBottom: "20px" }}>
        <Grid item xs={6} md={6} lg={6} sm={6}>
          <Typography variant="p" style={{ fontSize: "1.5rem" }}>
            Enrolled Courses
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          lg={6}
          sm={6}
          sx={{ textAlign: { lg: "end", md: "end", sm: "end",xs:"end" } }}
        >
          <Typography
            variant="p"
            style={{ color: "purple", fontSize: "1.1rem" }}
          >
            See all
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{ marginBottom: "20px"}}
        spacing={4}
      >
        <Grid item xs={12} md={4} lg={6} sm={6}>
          <DashboardCard />
        </Grid>
        <Grid item xs={12} md={4} lg={6} sm={6}>
          <DashboardCard />
        </Grid>
      </Grid>

      <Box>
        <Schedule />
      </Box>
    </Box>
  );
};
