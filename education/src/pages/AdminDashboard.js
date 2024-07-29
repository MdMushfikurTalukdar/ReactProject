import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import NavbarNew from "../components/NavbarNew";

import Footer from "../components/Home/Footer";
import { useNavigate } from "react-router-dom";
import { Url } from "../components/BaseUrl";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";


import { enqueueSnackbar } from "notistack";

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const [result, setResult] = useState([]);

  useEffect(() => {
    if (sessionStorage?.getItem("accesstoken")) {
      const response = jwtDecode(sessionStorage?.getItem("accesstoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        response.role !== "super-admin"
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Url}/college-requests/`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  const handleVerification=(e)=>{

    const data={
      "is_verified":true
    }
    axios.put(`${Url}/college-requests/${e}/verify/`,data,{
      headers: { 
        'Authorization': `Bearer ${sessionStorage.getItem('accesstoken')}`
      }
    }).then(response=>{
      console.log(response);
      enqueueSnackbar("Email Sent.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    })
  }
  const handleReject=(e)=>{

    const data={
      "is_verified":false
    }
    axios.put(`${Url}/college-requests/${e}/verify/`,data,{
      headers: { 
        'Authorization': `Bearer ${sessionStorage.getItem('accesstoken')}`
      }
    }).then(response=>{
      console.log(response);
      enqueueSnackbar("Email Sent.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    })
  }
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarNew />
      <p style={{textAlign:"center",fontSize:"2.2rem"}}>Requests</p>
      
      <Box sx={{padding:"20px"}}>
       
        <Grid container spacing={2}>
          {result?.length > 0 &&
            result?.map((data, index) => (
              <Grid item lg={12} sm={12} xs={12} md={12}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={data?.college_logo}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                         {data?.college_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Name: {data?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                       Email: {data?.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                       College Address: {data?.college_address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                       Established Date: {data?.established_date}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Phone Number: {data?.phone_number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      Principal Name:  {data?.principal_name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                  <Button variant="contained" onClick={(e)=>handleVerification(data.id)}>
                    Accept
                  </Button>
                  <Button variant="contained" onClick={(e)=>handleReject(data.id)}>
                    Reject
                  </Button>
                   
                  </CardActions>
                </Card>

              </Grid>
            ))}
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};
