import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  FormHelperText,
  Grid,
} from "@mui/material";
import Footer from "../components/Home/Footer";
import NavbarNew from "../components/NavbarNew";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Url } from "../components/BaseUrl";

const schema = yup.object().shape({
  subject_name: yup.string().required("Subject name is required"),
  subject_code: yup.string().required("Subject code is required"),
  name: yup.string().required("Name is required"),
});

export const SemSubject = () => {
  const navigate = useNavigate();
  const [branch, setBranch] = useState("");

  const regenerateToken = () => {
    if (sessionStorage?.getItem("accesstoken")) {
      const response = jwtDecode(sessionStorage?.getItem("accesstoken"));
      const response1 = jwtDecode(sessionStorage?.getItem("refreshtoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        response1.exp < Math.floor(Date.now() / 1000)
      ) {
        navigate("/login");
      } else {
        if (
          sessionStorage.getItem("refreshtoken") &&
          sessionStorage.getItem("accesstoken")
        ) {
          let data = {
            refresh: sessionStorage?.getItem("refreshtoken"),
          };

          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url:
              `${Url}/token/refresh/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage?.getItem("accesstoken")}`,
            },
            data: data,
          };

          axios
            .request(config)
            .then((response) => {
              sessionStorage.setItem("accesstoken", response.data.access);
            })
            .catch((error) => {
              if (error?.message === "Request failed with status code 500") {
                navigate("/login");
              }
              if (
                error?.response?.data?.errors?.detail ===
                "Given token not valid for any token type"
              ) {
                enqueueSnackbar("Logging out", {
                  variant: "error",
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                  autoHideDuration: 3000,
                });
                navigate("/login");
              }
            });
        } else {
          navigate("/login");
        }
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (sessionStorage?.getItem("accesstoken")) {
      const response = jwtDecode(sessionStorage?.getItem("accesstoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        (response.role !== "super-admin" && response.role !== "hod")
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
    var subject_code = data.subject_code.toLowerCase();
    let data1 = JSON.stringify({
      subject_name: data.subject_name,
      subject_code: subject_code,
      instructor: data.name,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${Url}/${
        jwtDecode(sessionStorage.getItem("accesstoken")).college
      }/subject/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
      },
      data: data1,
    };

    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");

    if (token && token1) {
      axios
        .request(config)
        .then((response) => {
          if (token && token1) {
            let currentDate = new Date();
            const decodedToken = jwtDecode(token);

            if (
              decodedToken.exp * 1000 - currentDate.getTime() <
              59 * 60 * 1000
            ) {
              try {
                regenerateToken(); // Wait for the token regeneration to complete
              } catch (error) {
                console.error(
                  "Error in request interceptor while regenerating token:",
                  error
                );
              }
            }
          } else {
            navigate("/login");
          }
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
          if (
            error?.response?.data?.errors?.detail ===
            "Given token not valid for any token type"
          ) {
            enqueueSnackbar("Logging out", {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              autoHideDuration: 3000,
            });
            navigate("/login");
          }
          enqueueSnackbar(error?.response?.data?.errors?.subject_code[0], {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 1000,
          });
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <Box>
      <NavbarNew />

      <h4 style={{textAlign:"center",marginTop:"30px",fontSize:"1.4rem"}}>Subject Register</h4>
      <Box
        sx={{
          padding: { xs: 2, md: 4 },
          borderRadius: 2,
          maxWidth: "90vw",
          margin: "auto",
          marginTop: 4,
          marginBottom: 9,
          minHeight: "70vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="./images/enrollment.png"
                alt="Enrollment"
                style={{ width: "100%", maxWidth: "300px", borderRadius: "10px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <FormControl fullWidth error={!!errors.subject_name}>
                <TextField
                  type="text"
                  label="Subject Name*"
                  variant="outlined"
                  fullWidth
                  {...register("subject_name")}
                />
                <FormHelperText>{errors?.subject_name?.message}</FormHelperText>
              </FormControl>
              <FormControl fullWidth error={!!errors.subject_code}>
                <TextField
                  type="text"
                  label="Subject Code*"
                  variant="outlined"
                  fullWidth
                  {...register("subject_code")}
                />
                <FormHelperText>{errors?.subject_code?.message}</FormHelperText>
              </FormControl>
              <FormControl fullWidth error={!!errors.name}>
                <TextField
                  type="text"
                  label="Name*"
                  variant="outlined"
                  fullWidth
                  {...register("name")}
                />
                <FormHelperText>{errors?.name?.message}</FormHelperText>
              </FormControl>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    paddingX: 4,
                    paddingY: 1.5,
                    marginTop: 2,
                  }}
                  type="submit"
                >
                  Add Subject
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default SemSubject;
