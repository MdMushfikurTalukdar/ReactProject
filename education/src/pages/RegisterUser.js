import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import "../App.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

export const RegisterUser = () => {
  var role = "student",
    a;
  const [responsive, setResponsive] = useState(
    window.innerWidth < 900 ? true : false
  ); // Check if the screen is smaller than 1024
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const resize = () => {
    setResponsive(window.innerWidth < 900 ? true : false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object().shape({
    registration_number: yup
      .string()
      .required("registration number is required"),
    password: yup
      .string()
      .min(8, "password must be at least 8 characters")
      .max(15, "password cannot exceed 24 characters")
      .required("password is required"),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    a = data.registration_number;
    if (data.registration_number.includes("-faculty")) {
      a = data.registration_number.replace("-faculty", "");
      role='teacher';
    }
  
    let data1 = JSON.stringify({
      registration_number: a,
      role: role,
      password: data.password,
      password2: data.password2,
    });
    
    axios({
      url: "https://amarnath013.pythonanywhere.com/api/user/register/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data1,
    })
      .then((res) => {
        enqueueSnackbar(res.data.message, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });
        localStorage.setItem("accesstoken", res.data.token.access);
        localStorage.setItem("bonafied", false);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.response.data.errors.registration_number[0], {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });
      });

    reset();
  };
  return (
    <div className="App">
      {responsive && (
        <div className="parentdiv_small_screen">
          <img
            src="../images/logo.png"
            alt=""
            style={{ height: "auto", width: "70px" }}
          />
          <div className="children1_small_screen">
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                md={9}
                lg={9}
                className="parentGrid_small_screen"
              >
                <h2 style={{ marginRight: "35%" }}>Create Account</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box>
                    <TextField
                      type="text"
                      label="Registration"
                      placeholder="1233456"
                      required
                      sx={{
                        width: { lg: "50%", md: "50%", sm: "50%", xs: "80%" },
                        marginTop: "12px",
                      }}
                      {...register("registration")}
                      helperText={errors.registration?.message}
                    />
                  </Box>
                  <Box>
                    <TextField
                      type="password"
                      label="password"
                      placeholder="password"
                      required
                      sx={{
                        width: { lg: "50%", md: "50%", sm: "50%", xs: "80%" },
                        marginTop: "12px",
                      }}
                      {...register("password")}
                      helperText={errors.password?.message}
                    />
                  </Box>
                  <Box>
                    <TextField
                      type="password"
                      label="confirm password"
                      placeholder="confirm password..."
                      required
                      sx={{
                        width: { lg: "50%", md: "50%", sm: "50%", xs: "80%" },
                        marginBottom: "10px",
                        marginTop: "10px",
                      }}
                      {...register("confirmPassword")}
                      helperText={errors.confirmPassword?.message}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    sx={{
                      width: { xs: "85%", sm: "50%" },
                      backgroundColor: "black",
                      textAlign: "start",
                    }}
                    type="submit"
                  >
                    Create Account
                  </Button>
                </form>

                <p style={{ fontSize: "0.8rem" }}>
                  Already have an account?{" "}
                  <span
                    style={{ color: "violet" }}
                    onClick={(e) => navigate("/login")}
                  >
                    Login
                  </span>
                </p>

                <Divider
                  component="span"
                  role="presentation"
                  className="Divider"
                >
                  <Typography>or</Typography>
                </Divider>

                <Box
                  container
                  sx={{
                    display: "flex",
                    gap: "5px",
                    justifyContent: { xs: "center", sm: "center" },
                    width: "100vw",
                    marginTop: "20px",
                    marginLeft: "-5%",
                  }}
                >
                  <Button variant="outlined" startIcon={<GoogleIcon />}>
                    {" "}
                    Google
                  </Button>
                  <Button variant="outlined" startIcon={<FacebookIcon />}>
                    {" "}
                    facebook
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
      )}

      {!responsive && (
        <Grid container style={{ height: "100vh", backgroundColor: "#6c42ec" }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            style={{ backgroundColor: "#6c42ec" }}
          >
            <div style={{ color: "white" }}>
              <h1 className="largeScreen_typography"> Stay on top of</h1>
              <h1 className="largeScreen_typography1">time tracking</h1>

              <img
                src="../images/register_page_icon.png"
                className="img"
                alt=""
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={9}
            lg={9}
            className="parentGrid_largeScreen"
          >
            <h2 style={{ marginRight: "35%", marginTop: "60px" }}>
              Create Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <TextField
                  type="text"
                  label="Registration Number"
                  placeholder="0123442"
                  required
                  sx={{
                    width: "50%",
                    marginTop: "12px",
                  }}
                  {...register("registration_number")}
                  helperText={errors?.registration_number?.message}
                />
              </Box>
              <Box>
                <TextField
                  type="password"
                  label="Password"
                  placeholder="password..."
                  required
                  sx={{
                    width: "50%",
                    marginTop: "12px",
                  }}
                  {...register("password")}
                  helperText={errors?.password?.message}
                />
              </Box>
              <Box>
                <TextField
                  type="password"
                  label="Confirm Password"
                  placeholder="confirmPassword..."
                  required
                  sx={{
                    width: "50%",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                  {...register("password2")}
                  helperText={errors?.password2?.message}
                />
              </Box>

              <Button
                variant="contained"
                style={{
                  width: "50%",
                  backgroundColor: "black",
                  textAlign: "start",
                }}
                type="submit"
              >
                Create Account
              </Button>
            </form>

            <p style={{ fontSize: "0.8rem" }}>
              Already have an account?{" "}
              <span
                className="cursor-pointer"
                onClick={(e) => navigate("/login")}
                style={{ color: "violet" }}
              >
                Login
              </span>
            </p>

            <Divider component="span" role="presentation" className="Divider">
              <Typography>or</Typography>
            </Divider>

            <Box className="icon_button">
              <Button variant="outlined" startIcon={<GoogleIcon />}>
                {" "}
                Google
              </Button>
              <Button variant="outlined" startIcon={<FacebookIcon />}>
                Facebook
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
