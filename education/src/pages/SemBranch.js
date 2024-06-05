import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Footer from "../components/Home/Footer";
import NavbarNew from "../components/NavbarNew";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  semester_name: yup.string().required("Semester name is required"),
  subject_codes: yup.string().required("Subject codes is required"),
  branch: yup.string().required("Branch is required"),
});

export const SemBranch = () => {
  const navigate = useNavigate();
  var array;

  useEffect(() => {
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) &&
        response.role === "student"
      ) {
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
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    var subject_codes1 = data.subject_codes.split(",");
    var a = subject_codes1.map((data) => {
      return data;
    });

    console.log(data.semester_name, data.branch);

    let data1 = JSON.stringify({
      semester_name: data.semester_name,
      subject_codes: a,
      branch: data.branch,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/semester/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
      data: data1,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);

        if (response.data.subjects.length === 0) {
          enqueueSnackbar("No such subject code is available", {
            variant: "warning",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 3000,
          });
        }else{
        enqueueSnackbar("Added successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 1000,
        });

        reset();
    }
      })
      
      .catch((error) => {
        console.log(error);

        enqueueSnackbar(error?.response?.data?.errors?.subject_codes[0], {
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
          maxHeight: 460,
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
            <FormControl
              fullWidth
              margin="normal"
              error={!!errors.subject_name}
            >
              <TextField
                type="text"
                label="Semester Name*"
                variant="outlined"
                fullWidth
                {...register("semester_name")}
              />
              <FormHelperText>{errors?.semester_name?.message}</FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              margin="normal"
              error={!!errors.subject_codes}
            >
              <TextField
                type="text"
                label="Subject Codes*"
                variant="outlined"
                fullWidth
                {...register("subject_codes")}
              />
              <FormHelperText>{errors?.subject_codes?.message}</FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.branch}>
              <TextField
                type="text"
                label="Branch*"
                variant="outlined"
                fullWidth
                {...register("branch")}
              />
              <FormHelperText>{errors?.branch?.message}</FormHelperText>
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

export default SemBranch;
