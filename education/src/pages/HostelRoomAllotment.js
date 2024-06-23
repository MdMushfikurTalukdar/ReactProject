import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { TextField, Button, Container, Grid, Typography, Card, CardContent, CircularProgress, Divider } from "@mui/material";
import { useSnackbar } from "notistack";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NavbarNew from "../components/NavbarNew";
import Footer from "../components/Home/Footer";

// Validation schema using yup
const schema = yup.object().shape({
  registration_number: yup.string().required("Registration Number is required"),
  hostel_room: yup.string().required("Hostel Room is required"),
});

const HostelRoomAllotment = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [allotmentData, setAllotmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      const response = jwtDecode(token);
      if (response.exp < Math.floor(Date.now() / 1000) || response.role !== "caretaker") {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const jsonData = JSON.stringify(data);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/hostel-room-allotments/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
      },
      data: jsonData,
    };

    try {
      const response = await axios.request(config);

      const data2 = JSON.stringify({ status: "approved" });
      const configUpdate = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `https://amarnath013.pythonanywhere.com/api/user/hostel-allotments/${response?.data?.id}/update-status/`,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        },
        data: data2
      };

      await axios.request(configUpdate);

      enqueueSnackbar("Room allotted successfully", { variant: "success" });
      fetchAllotmentData();
    } catch (error) {
      console.error(error);
      if(error?.response?.data?.errors?.hostel_room?.[0])
        {
          enqueueSnackbar(error?.response?.data?.errors?.hostel_room?.[0], { variant: "error" });
        }
      if(error?.response?.data?.errors?.[0])  
      enqueueSnackbar(error?.response?.data?.errors?.[0], { variant: "error" });
    }
  };

  const fetchAllotmentData = async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://amarnath013.pythonanywhere.com/api/user/hostel-room-allotments/',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
      },
    };

    try {
      const response = await axios.request(config);
      setAllotmentData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllotmentData();
  }, []);

  if (loading) {
    return <center style={{marginTop:"20%"}}><CircularProgress /></center>;
  }

  return (
    <>
      <NavbarNew />
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

        <Divider style={{marginTop:"20px"}}/>
        <Typography variant="h6" gutterBottom style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
          Approved Allotment Details
        </Typography>
        
        <Divider/>

        {allotmentData && allotmentData.map((data, index) => (
          <Card style={{ marginTop: "20px", marginBottom: "10px", backgroundColor: "rgb(163 217 217)" }} key={index}>
            <CardContent>
              <Typography variant="subtitle1">
                ID: {data?.id}
              </Typography>
              <Typography variant="subtitle1">
                Registration Number: {data?.registration_details?.registration_number}
              </Typography>
              <Typography variant="subtitle1">
                Hostel Room: {data?.hostel_room}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
      <Footer />
    </>
  );
};

export default HostelRoomAllotment;
