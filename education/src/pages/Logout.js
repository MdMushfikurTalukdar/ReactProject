import { ImSad } from "react-icons/im";
import { Box, Button, Typography } from "@mui/material"
import NavbarNew from "../components/NavbarNew";
import Footer from "../components/Home/Footer";
import { useNavigate } from "react-router-dom";

export const Logout=()=>{

    const navigate=useNavigate();

    const Logout=()=>{
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        navigate('/')
    }
    return(
        <>
        <NavbarNew/>
        <div  style={{display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center",height:"100vh"}}>
            <Box style={{width:"fit-content",backgroundColor:"whitesmoke",padding:"20px",borderRadius:"10px",height:"auto"}}>
                <center><ImSad style={{fontSize:"1.9rem",color:"rgb(107 169 169)"}}/></center>
                <Typography variant="h6" component="h6" style={{margin:"20px 0px 20px 0px"}}>Are you sure want to logout?</Typography>
                <Box className="flex gap-3 justify-end">
                    <Button variant="contained" sx={{backgroundColor:"rgb(107 169 169)",color:"white"}} onClick={Logout}>Yes</Button>
                    <Button variant="contained" sx={{backgroundColor:"rgb(107 169 169)",color:"white"}}>No</Button>
                </Box>
            </Box>
        </div>
        <Footer/>
        </>
    )
}