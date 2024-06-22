import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { TextField, Button, Container, Grid, Typography, Card, CardContent } from "@mui/material";
import { useSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NavbarNew from "../components/NavbarNew";
import Footer from "../components/Home/Footer";

// Validation schema using yup
const schema = yup.object().shape({

  registration_number: yup
    .string()
    .required("Registration Number is required"),
  hostel_room: yup
    .string()
    .required("Hostel Room is required"),
});

const HostelRoomAllotment = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [allotmentData, setAllotmentData] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate=useNavigate();

  useEffect(() => {

    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        response.role !== "caretaker"
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const onSubmit = async (data) => {
    const jsonData = JSON.stringify(data);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/hostel-room-allotments/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage?.getItem('accesstoken')}`, // Replace with actual token
      },
      data: jsonData,
    };

    try {
      const response = await axios.request(config);
      
      enqueueSnackbar("Room allotted successfully", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to allot room", { variant: "error" });
    }
  };

  useEffect(()=>{
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://amarnath013.pythonanywhere.com/api/user/hostel-room-allotments/',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${localStorage?.getItem('accesstoken')}`
        },
       
      };
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setAllotmentData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
  return (
    <>
    <NavbarNew/>
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: "20px", marginBottom: "36px" }}>
        Hostel Room Allotment
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="registration_number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Registration Number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.registration_number}
                  helperText={errors.registration_number?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="hostel_room"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Hostel Room"
                  variant="outlined"
                  fullWidth
                  error={!!errors.hostel_room}
                  helperText={errors.hostel_room?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography variant="h6" gutterBottom style={{textAlign:"center",marginTop:"20px",marginBottom:"20px"}}>
              Allotment Details
      </Typography>

      {allotmentData && (
        allotmentData.map((data,index)=>(
        <Card style={{ marginTop: "20px",marginBottom:"10px",backgroundColor:"rgb(163 217 217)" }} key={index}>
          <CardContent>
           
            <Typography variant="subtitle1">
              ID: {data?.id}
            </Typography>
            <Typography variant="subtitle1">
              Registration Number: {data?.registration_number}
            </Typography>
            <Typography variant="subtitle1">
              Hostel Room: {data?.hostel_room}
            </Typography>
           
          </CardContent>
        </Card>
        ))
      )}
    </Container>
    <Footer/>
    </>
  );
};

export default HostelRoomAllotment;
