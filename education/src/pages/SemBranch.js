import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  FormControl,
  FormHelperText,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
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
import { BaseUrl, Url } from "../components/BaseUrl";

const schema = yup.object().shape({
  branch: yup.string().required("Branch is required"),
});

export const SemBranch = () => {
  const navigate = useNavigate();
  const [college, setCollege] = useState("");
  const [load, setLoad] = useState(false);

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
              "https://amarnath013.pythonanywhere.com/api/user/token/refresh/",
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
        (response.role !== "super-admin" && response.role !== "office")
      ) {
        navigate("/login");
      } else {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${Url}/colleges-slugs/?search=${response.college}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
          },
        };

        axios
          .request(config)
          .then((response1) => {
            console.log(JSON.stringify(response1.data));
            setCollege(response1.data[0].slug);
            // navigate(`/register/${response1.data[0].slug}`);
          })
          .catch((error) => {
            console.log(error);
          });
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
  ];

  const onSubmit = (data) => {
    setLoad(true);
    console.log(data);

    let data1 = JSON.stringify({
      branch_name: data.branch,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${Url}/${college}/branch/`,
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
          if (response?.data?.message) {
            enqueueSnackbar(response.data.message, {
              variant: "success",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              autoHideDuration: 1000,
            });
          }
          setLoad(false);
          reset();
        })

        .catch((error) => {
          console.log(error);
          setLoad(false);
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
          if (error?.response?.data?.errors?.non_field_errors[0]) {
            enqueueSnackbar(
              error?.response?.data?.errors?.non_field_errors[0],
              {
                variant: "error",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                autoHideDuration: 1000,
              }
            );
          }
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <Box>
      <NavbarNew />
      <Box
        sx={{
          padding: 4,
          borderRadius: 2,
          maxWidth: 400,
          margin: "auto",
          marginTop: 5,
          marginBottom: 18,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          Branch Enrollment
        </Typography>
        <center>
          <img
            src="./images/enrollment.png"
            alt=""
            style={{ width: "250px", borderRadius: "10px",marginBottom:"20px" }}
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
            <FormControl fullWidth error={!!errors.branch}>
            <InputLabel>Branch</InputLabel>
              <Select
                label="Branch*"
                variant="outlined"
                fullWidth
                {...register("branch")}
                defaultValue=""
              >
                
                {branches.map((branch) => (
                  <MenuItem
                    key={branch.abbreviation}
                    value={branch.abbreviation}
                  >
                    {branch.name} ({branch.abbreviation})
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors?.branch?.message}</FormHelperText>
            </FormControl>
            <center>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  alignSelf: "center",
                  paddingX: 4,
                  paddingY: 1,
                  marginTop: 3,
                }}
                type="submit"
              >
                {!load && <p>Add Branch</p>}
                {load && (
                  <CircularProgress
                    style={{ color: "white", width: "20px", height: "22px" }}
                  />
                )}
              </Button>
            </center>
          </form>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default SemBranch;
