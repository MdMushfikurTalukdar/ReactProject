import { Box, Typography} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();
  function leave(){
    navigate('/leave');
  }

  return (
    <Box
      style={{
        height: "85vh",
        background: 'linear-gradient(to bottom, whitesmoke , #7042C0 40%)',
        marginTop:"80px",
        marginLeft:"20px",
        borderRadius:"20px 20px 20px 20px"
      }}
    >
      <Box style={{padding:"40px"}}>
        <Box>
          <img
            src="../images/dashboard_logo.png"
            alt=""
            style={{ width: "150px", height: "auto"}}
          />
        </Box>

      
        <Box style={{ display: "flex", gap: "10px",marginTop:"30px",color:"white"}}>
          <SpaceDashboardIcon  />
          <Typography variant="p" >Dashboard</Typography>
        </Box>

        <Box style={{ display: "flex", gap: "10px",marginTop:"20px",color:"white"}}>
          <AccountCircleIcon />
          <Typography variant="p">Profile</Typography>
        </Box>

        <Box style={{ display: "flex", gap: "10px",marginTop:"20px",color:"white" }}>
          <MessageIcon />
          <Typography variant="p">Result</Typography>
        </Box>

        <Box style={{ display: "flex", gap: "10px",marginTop:"20px",color:"white"}}>
          <SpaceDashboardIcon />
          <Typography variant="p">Skills</Typography>
        </Box>
        <Box onClick={leave} style={{ display: "flex", gap: "10px",marginTop:"20px",color:"white"}}>  
          <EventBusyIcon />
          <Typography variant="p">Leave Form</Typography>
        </Box>

        <Box style={{ display: "flex", gap: "10px",margin:"55px 0px 20px 0px",color:"white" }}>
          <ExitToAppIcon />
          <Typography variant="p">Logout</Typography>
        </Box>
      </Box>
    </Box>
  );
};