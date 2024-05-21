import { Box, Button, Typography } from "@mui/material"

export const DashboardNotices=()=>{

    return(
        <div className="dashboard-notice" >

            <Box style={{backgroundColor:"whitesmoke",padding:"20px",borderRadius:"10px"}}>
                <Typography variant="h6">Exam Schedule</Typography>
                <Typography color="text.secondary" variant="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                <Box>
                <Button variant="outlined" style={{color:"purple",marginTop:"15px"}}>see more</Button>

                <Typography variant="h6" style={{marginTop:"20px"}}>Exam Schedule</Typography>
                <Typography color="text.secondary" variant="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
                <Box>
                <Button variant="outlined" style={{color:"purple",marginTop:"15px"}}>see more</Button>
                </Box>
                </Box>
            </Box>

        </div>
    )
}