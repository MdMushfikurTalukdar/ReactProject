import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import '../App.css'
import BorderColorIcon from '@mui/icons-material/BorderColor';
export const ProfileMainBody = () => {
  return (
    <Box className=" mt-20 w-full lg:p-10 sm:p-5 p-5" style={{height:'calc(100vh - 5px)',overflowY:"scroll"}}>
      <Box>
        <Typography variant="p" className="text-xl">Profile</Typography>
      </Box>

      <Box className="text-center">
        <img
          src="https://mui.com/static/images/avatar/2.jpg"
          alt=""
          className="lg:w-[10%] w-[40%] sm:w-[25%] md:w-[15%] h-auto text-center"
          style={{ borderRadius: "50%" }}
        />
      </Box>

      <Box className="lg:p-10 sm:p-5 p-5">
        <Typography variant="p text-xl mx-auto mb-10">Basic details</Typography>
        <Grid container className="mt-10">

          <Grid item lg={4} sm={12} xs={12} md={12}>
            <Typography variant="p">Registration No.</Typography>
          </Grid>
          <Grid item lg={4} sm={12} xs={12} md={12}>
            <Typography variant="p">1690012125</Typography>
          </Grid>
          
          <Divider style={{ width: "100%", margin: "10px 0" }} />
          <Grid item lg={4} sm={12} xs={12} md={12} style={{marginTop:"10px"}}>
              <Typography variant="p">First Name</Typography>
           </Grid>  
           <Grid item lg={4} sm={12} xs={12} md={12}> 
              <Typography variant="p">Someswar </Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>  
              <Button id="button_style"><BorderColorIcon style={{color:"white",fontSize:"1rem"}}/>Edit</Button>
          </Grid>
          <Divider style={{ width: "100%", margin: "10px 0" }} />
          <Grid item lg={4} sm={12} xs={12} md={12} style={{marginTop:"10px"}}>
              <Typography variant="p">Last Name</Typography>
           </Grid>  
           <Grid item lg={4} sm={12} xs={12} md={12}> 
              <Typography variant="p">Gorai</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>  
              <Button id="button_style"><BorderColorIcon style={{color:"white",fontSize:"1rem"}}/>Edit</Button>
          </Grid>
          <Divider style={{ width: "100%", margin: "10px 0" }} />
          <Grid item lg={4} sm={12} xs={12} md={12} style={{marginTop:"10px"}}>
              <Typography variant="p">DOB</Typography>
           </Grid>  
           <Grid item lg={4} sm={12} xs={12} md={12}> 
              <Typography variant="p">5th nov,2001</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>  
              <Button id="button_style"><BorderColorIcon style={{color:"white",fontSize:"1rem"}}/>Edit</Button>
          </Grid>
          <Divider style={{ width: "100%", margin: "10px 0" }} />
          <Grid item lg={4} sm={12} xs={12} md={12} style={{marginTop:"10px"}}>
              <Typography variant="p">Gender</Typography>
           </Grid>  
           <Grid item lg={4} sm={12} xs={12} md={12}> 
              <Typography variant="p">Male</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>  
              <Button id="button_style"><BorderColorIcon style={{color:"white",fontSize:"1rem"}}/>Edit</Button>
          </Grid>
          
        </Grid>
      </Box>
      <Box className="lg:p-10 sm:p-5 p-5">
        <Typography variant="p text-xl mx-auto mb-10">Contact Information</Typography>
        <Grid container className="mt-10">
          <Grid item lg={4} sm={12} xs={12} md={12}>
            <Typography variant="p">Email</Typography>
          </Grid>
          <Grid item lg={4} sm={12} xs={12} md={12}>
            <Typography variant="p">somgorai726@gmail.com</Typography>
          </Grid>
          <Grid item lg={4} sm={12} xs={12} md={12}>
            <Button id="button_style"><BorderColorIcon style={{color:"white",fontSize:"1rem"}}/>Edit</Button>
          </Grid>
          <Divider style={{ width: "100%", margin: "10px 0" }} />
          <Grid item lg={4} sm={12} xs={12} md={12} style={{marginTop:"10px"}}>
              <Typography variant="p">Phone no.</Typography>
           </Grid>  
           <Grid item lg={4} sm={12} xs={12} md={12}> 
              <Typography variant="p">7718456257</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>  
              <Button id="button_style"><BorderColorIcon style={{color:"white",fontSize:"1rem"}}/>Edit</Button>
          </Grid>
          <Divider style={{ width: "100%", margin: "10px 0" }} />
          <Grid item lg={4} sm={12} xs={12} md={12} style={{marginTop:"10px"}}>
              <Typography variant="p">Alternate phone no</Typography>
           </Grid>  
           <Grid item lg={4} sm={12} xs={12} md={12}> 
              <Typography variant="p">124124982</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>  
              <Button id="button_style"><BorderColorIcon style={{color:"white",fontSize:"1rem"}}/>Edit</Button>
          </Grid>
          <Divider style={{ width: "100%", margin: "10px 0" }} />
          <Grid item lg={4} sm={12} xs={12} md={12} style={{marginTop:"10px"}}>
              <Typography variant="p">Address</Typography>
           </Grid>  
           <Grid item lg={4} sm={12} xs={12} md={12}> 
              <Typography variant="p">Bankura</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>  
              <Button id="button_style"><BorderColorIcon style={{color:"white",fontSize:"1rem"}}/>Edit</Button>
          </Grid>
          <Divider style={{ width: "100%", margin: "10px 0" }} />
          <Grid item lg={4} sm={12} xs={12} md={12} style={{marginTop:"10px"}}>
              <Typography variant="p">City</Typography>
           </Grid>  
           <Grid item lg={4} sm={12} xs={12} md={12}> 
              <Typography variant="p">Bankura</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>  
              <Button id="button_style"><BorderColorIcon style={{color:"white",fontSize:"1rem"}}/>Edit</Button>
          </Grid>
          <Divider style={{ width: "100%", margin: "10px 0" }} />
          <Grid item lg={4} sm={12} xs={12} md={12} style={{marginTop:"10px"}}>
              <Typography variant="p">State</Typography>
           </Grid>  
           <Grid item lg={4} sm={12} xs={12} md={12}> 
              <Typography variant="p">West Bengal</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>  
              <Button id="button_style"><BorderColorIcon style={{color:"white",fontSize:"1rem"}}/>Edit</Button>
          </Grid>
          <Divider style={{ width: "100%", margin: "10px 0" }} />
          <Grid item lg={4} sm={12} xs={12} md={12} style={{marginTop:"10px"}}>
              <Typography variant="p">Postal Code</Typography>
           </Grid>  
           <Grid item lg={4} sm={12} xs={12} md={12}> 
              <Typography variant="p">724105</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>  
              <Button id="button_style"><BorderColorIcon style={{color:"white",fontSize:"1rem"}}/>Edit</Button>
          </Grid>
          <Divider style={{ width: "100%", margin: "10px 0" }} />
          <Grid item lg={4} sm={12} xs={12} md={12} style={{marginTop:"10px"}}>
              <Typography variant="p">Country</Typography>
           </Grid>  
           <Grid item lg={4} sm={12} xs={12} md={12}> 
              <Typography variant="p">India</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>  
              <Button id="button_style"><BorderColorIcon style={{color:"white",fontSize:"1rem"}}/>Edit</Button>
          </Grid>
          
        </Grid>
      </Box>
    </Box>
  );
};
