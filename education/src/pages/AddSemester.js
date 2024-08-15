import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
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
import { Url } from "../components/BaseUrl";

const schema = yup.object().shape({
  semester_name: yup.string().required("Semester name is required"),
  subject_code: yup.string().required("branch code is required"),
});

export const AddSemester = () => {
  const navigate = useNavigate();
  const [branch, setBranch] = useState("");

  const branches = [
    { name: "Computer Science and Engineering", abbreviation: "CSE" },
    { name: "Mechanical Engineering", abbreviation: "ME" },
    { name: "Electrical Engineering", abbreviation: "EE" },
    { name: "Civil Engineering", abbreviation: "CE" },
    { name: "Electronics and Communication Engineering", abbreviation: "ECE" },
    { name: "Chemical Engineering", abbreviation: "CHE" },
    { name: "Information Technology", abbreviation: "IT" },
    { name: "Biomedical Engineering", abbreviation: "BME" },
    { name: "Aeronautical Engineering", abbreviation: "AE" },
    { name: "Automobile Engineering", abbreviation: "AU" },
    { name: "Biotechnology Engineering", abbreviation: "BT" },
    { name: "Industrial Engineering", abbreviation: "IE" },
    { name: "Environmental Engineering", abbreviation: "EN" },
    { name: "Petroleum Engineering", abbreviation: "PE" },
    { name: "Instrumentation Engineering", abbreviation: "IE" },
    { name: "Agricultural Engineering", abbreviation: "AG" },
    { name: "Mining Engineering", abbreviation: "MN" },
    { name: "Marine Engineering", abbreviation: "MRE" },
    { name: "Textile Engineering", abbreviation: "TE" },
    { name: "Food Technology", abbreviation: "FT" },
    { name: "Production Engineering", abbreviation: "PR" },
    { name: "Metallurgical Engineering", abbreviation: "MT" },
    { name: "Polymer Engineering", abbreviation: "PM" },
    { name: "Naval Architecture", abbreviation: "NA" },
    { name: "Power Engineering", abbreviation: "PW" },
    { name: "Robotics Engineering", abbreviation: "RE" },
    { name: "Software Engineering", abbreviation: "SE" },
    { name: "Geological Engineering", abbreviation: "GE" },
    { name: "Structural Engineering", abbreviation: "ST" },
    { name: "Mechatronics Engineering", abbreviation: "MTX" },
    { name: "Aerospace Engineering", abbreviation: "ASP" },
    { name: "Marine Technology", abbreviation: "MRT" },
    { name: "Nano Engineering", abbreviation: "NE" },
    { name: "Materials Science and Engineering", abbreviation: "MSE" },
    { name: "Telecommunication Engineering", abbreviation: "TCE" },
    { name: "Nuclear Engineering", abbreviation: "NE" },
    { name: "Optical Engineering", abbreviation: "OE" },
    { name: "Automotive Engineering", abbreviation: "AUE" },
    { name: "Systems Engineering", abbreviation: "SYE" },
    { name: "Renewable Energy Engineering", abbreviation: "REE" },
    { name: "Biochemical Engineering", abbreviation: "BCE" },
    { name: "Mining and Mineral Engineering", abbreviation: "MME" },
    { name: "Safety Engineering", abbreviation: "SE" },
    { name: "Corrosion Engineering", abbreviation: "CE" },
    { name: "Plastics Engineering", abbreviation: "PLE" },
    { name: "Petrochemical Engineering", abbreviation: "PCE" },
    { name: "Energy Engineering", abbreviation: "EE" },
    { name: "Computer Science and Business Systems", abbreviation: "CSBS" }
];


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
            url: `${Url}/token/refresh/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage?.getItem("accesstoken")}`,
            },
            data: data,
          };

          axios
            .request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
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
              console.log(error);
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
      } else {
        branches.map((item)=>
          item.abbreviation===jwtDecode(sessionStorage.getItem("accesstoken")).branch?setBranch(item.name):null
          
        )
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
    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");

    if (token && token1) {
      var subject_code = data.subject_code.toUpperCase();

      var subject_code_array = subject_code.split(",");

      let data1 = JSON.stringify({
        semester_name: data.semester_name,
        branch: jwtDecode(sessionStorage.getItem("accesstoken")).branch,
        subject_codes: subject_code_array,
        branch_name: branch
      });

      console.log(data1);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${Url}/${
          jwtDecode(sessionStorage.getItem("accesstoken")).college
        }/semester/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
        },
        data: data1,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          const token = sessionStorage.getItem("accesstoken");
          const token1 = sessionStorage.getItem("refreshtoken");

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
          console.log(error);

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
      <Box
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          maxWidth: 400,
          margin: "auto",
          marginTop: 4,
          marginBottom: 9,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          Subject Enrollment
        </Typography>
        <center>
          <img
            src="./images/enrollment.png"
            alt=""
            style={{ width: "250px", borderRadius: "10px" }}
          />
        </center>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth error={!!errors.semester_name}>
              <TextField
                type="text"
                label="Semester Name"
                variant="outlined"
                fullWidth
                style={{ marginBottom: "5px" }}
                {...register("semester_name")}
              />
              <FormHelperText>{errors?.semester_name?.message}</FormHelperText>
            </FormControl>
            <FormControl fullWidth error={!!errors.subject_code}>
              <TextField
                type="text"
                label="Subject Code*"
                variant="outlined"
                fullWidth
                style={{ marginBottom: "5px" }}
                {...register("subject_code")}
              />
              <FormHelperText>{errors?.subject_code?.message}</FormHelperText>
            </FormControl>

            <center>
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
                Add Semester
              </Button>
            </center>
          </form>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AddSemester;
