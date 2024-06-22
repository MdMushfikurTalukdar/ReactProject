import React, { useEffect } from 'react';
import { Box, TextField, Typography, Button, Paper, FormControl, FormHelperText } from "@mui/material";
import Footer from "../components/Home/Footer";
import NavbarNew from "../components/NavbarNew";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  subject_name: yup.string().required("Subject name is required"),
  subject_code: yup.string().required("Subject code is required"),
  name: yup.string().required("Name is required"),
});

export const SemSubject = () => {

    const navigate=useNavigate();

    useEffect(() => {
        if (localStorage?.getItem("accesstoken")) {
          const response = jwtDecode(localStorage?.getItem("accesstoken"));
          if (response.exp < Math.floor(Date.now() / 1000) || response.role !== "admin") {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      }, []);


  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {

    var subject_code=data.subject_code.toLowerCase();
    let data1 = JSON.stringify({
        "subject_name": data.subject_name,
        "subject_code": subject_code,
        "instructor": data.name
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://amarnath013.pythonanywhere.com/api/user/subject/',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
        },
        data : data1
      };
      
      axios.request(config)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Subject Added successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 1000,
          });

          reset();
      })
      .catch((error) => {
        console.log(error);
      
        enqueueSnackbar(error?.response?.data?.errors?.subject_code[0], {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 1000,
          });
      });
  };

  return (
    <Box>
      <NavbarNew />
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          maxWidth: 400,
          margin: "auto",
          marginTop: 5,
          backgroundColor: "#f5f5f5",
          marginBottom: 9,
          maxHeight:460
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          Add Subject
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal" error={!!errors.subject_name}>
              <TextField
                type="text"
                label="Subject Name*"
                variant="outlined"
                fullWidth
                {...register("subject_name")}
              />
              <FormHelperText>{errors?.subject_name?.message}</FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.subject_code}>
              <TextField
                type="text"
                label="Subject Code*"
                variant="outlined"
                fullWidth
                {...register("subject_code")}
              />
              <FormHelperText>{errors?.subject_code?.message}</FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.name}>
              <TextField
                type="text"
                label="Name*"
                variant="outlined"
                fullWidth
                {...register("name")}
              />
              <FormHelperText>{errors?.name?.message}</FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              sx={{
                alignSelf: "center",
                paddingX: 4,
                paddingY: 1,
                marginTop: 1,
              }}
              type="submit"
            >
              Add Subject
            </Button>
          </form>
        </Box>
      </Paper>
      <Footer />
    </Box>
  );
};

export default SemSubject;
