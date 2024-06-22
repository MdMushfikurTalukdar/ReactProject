import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import NavbarNew from "../components/NavbarNew";
import Footer from "../components/Home/Footer";

// Validation schema using yup
const schema = yup.object().shape({
  Maintainance_fees: yup
    .number()
    .typeError("Maintainance Fees must be a number")
    .positive("Maintainance Fees must be positive")
    .required("Maintainance Fees is required"),
  Mess_fees: yup
    .number()
    .typeError("Mess Fees must be a number")
    .positive("Mess Fees must be positive")
    .required("Mess Fees is required"),
  Security_Deposit: yup
    .number()
    .typeError("Security Deposit must be a number")
    .positive("Security Deposit must be positive")
    .required("Security Deposit is required"),
});

const AddFeesCaretaker = () => {
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
      url: "https://amarnath013.pythonanywhere.com/api/user/fees/create/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, // Replace with actual token
      },
      data: jsonData,
    };

    try {
      const response = await axios.request(config);
      console.log(response.data);

      enqueueSnackbar("Data added successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <NavbarNew/>
    <Container maxWidth="sm" style={{marginBottom:"11%"}}>
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: "20px", marginBottom: "36px" }}>
        Add Fees
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="Maintainance_fees"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Maintainance Fees"
                  variant="outlined"
                  fullWidth
                  error={!!errors.Maintainance_fees}
                  helperText={errors.Maintainance_fees?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="Mess_fees"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mess Fees"
                  variant="outlined"
                  fullWidth
                  error={!!errors.Mess_fees}
                  helperText={errors.Mess_fees?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="Security_Deposit"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Security Deposit"
                  variant="outlined"
                  fullWidth
                  error={!!errors.Security_Deposit}
                  helperText={errors.Security_Deposit?.message}
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
    </Container>
    <Footer/>
    </>
  );
};

export default AddFeesCaretaker;
