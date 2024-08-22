import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FaUpload } from "react-icons/fa";
import { BaseUrl, Url } from "../components/BaseUrl";
import { jwtDecode } from "jwt-decode";
import NavbarNew from "../components/NavbarNew";
import Footer from "../components/Home/Footer";

export const RegisterUser = () => {
  const [responsive, setResponsive] = useState(
    window.innerWidth < 900 ? true : false
  ); // Check if the screen is smaller than 1024
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");
  const { name } = useParams();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [id, setId] = useState(0);
  const [loading3, setLoading3] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (sessionStorage?.getItem("accesstoken")) {
      const response = jwtDecode(sessionStorage?.getItem("accesstoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        response.role !== "office"
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [navigate]);

  const resize = () => {
    setResponsive(window.innerWidth < 900 ? true : false);
  };

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
    axios
      .get(
        `${Url}/${
          jwtDecode(sessionStorage.getItem("accesstoken")).college
        }/user-management/`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setId(response.data.length);
        setLoading3(false);
      })
      .catch((error) => {
        setLoading(false);
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
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
      console.log(file.name);
    }
  };

  const schema = yup.object().shape({
    registration_number: yup
      .string()
      .required("registration number is required"),
    password: yup
      .string()
      .min(8, "password must be at least 8 characters")
      .max(15, "password cannot exceed 15 characters")
      .required("password is required"),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),

    role: yup
      .string()
      .oneOf(
        [
          "student",
          "faculty",
          "super-admin",
          "office",
          "principal",
          "caretaker",
          "department",
          "registrar",
        ],
        "Invalid role, must be one of: student, faculty,registrar,office,principal,caretaker",
        "department"
      )
      .required("role is required"),
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitFile = async (e) => {
    setLoading1(true);

    if (!file) {
      setLoading1(false);
      return enqueueSnackbar("Please Select a File.", {
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    }

    if (!file.name.endsWith("csv")) {
      return enqueueSnackbar("Only csv file will be accepted", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${BaseUrl}/${name}/register/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
          },
          maxBodyLength: Infinity,
        }
      );

      const token = sessionStorage.getItem("accesstoken");
      const token1 = sessionStorage.getItem("refreshtoken");

      if (token && token1) {
        let currentDate = new Date();
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 - currentDate.getTime() < 59 * 60 * 1000) {
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
      if (response) {
        setFileName("");
        setFile("");
        setKey(key + 1);
        axios
          .get(
            `${Url}/${
              jwtDecode(sessionStorage.getItem("accesstoken")).college
            }/user-management/`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "accesstoken"
                )}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            setId(response.data.length);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
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

        setLoading1(false);

        if (response?.data?.message) {
          enqueueSnackbar(response.data.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 3000,
          });
        }
        // setTimeout(()=>{
        //   window.location.reload();
        // },2000);
      }
    } catch (error) {
      console.error(error);
      setFileName("");
      setFile("");
      setLoading1(false);
      setKey(key + 1);

      if (
        error?.response?.data?.errors?.registration_number?.[0] ===
        "user with this registration number already exists."
      ) {
        enqueueSnackbar("user with this registration number already exists.", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });
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

      if (
        error?.response?.data?.errors?.password2?.[0] ===
        "This field is required."
      ) {
        enqueueSnackbar("confirm password is required", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });
      } else if (
        error?.response?.data?.errors?.password?.[0] ===
        "This field is required."
      ) {
        enqueueSnackbar("password is required", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });
      } else if (
        error?.response?.data?.errors?.registration_number?.[0] ===
        "This field is required."
      ) {
        enqueueSnackbar("registration number is required", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });
      } else if (
        error?.response?.data?.errors?.role?.[0] === "This field is required."
      ) {
        enqueueSnackbar("Role is required", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });
      }
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");

    if (token && token1) {
      let data1 = JSON.stringify({
        registration_number: data.registration_number,
        role: data.role,
        password: data.password,
        password2: data.password2,
      });

      axios({
        url: `${BaseUrl}/${name}/register/`,
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
        },
        data: data1,
      })
        .then((res) => {
          console.log(res);
          setId((id) => id + 1);

          setLoading(false);
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

          if (res?.data?.message) {
            enqueueSnackbar(res.data.message, {
              variant: "success",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              autoHideDuration: 3000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err?.message) {
            enqueueSnackbar(err?.message, {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              autoHideDuration: 3000,
            });
          }
          if (
            err?.response?.data?.message ===
            "User already exists with this registration number and college"
          ) {
            enqueueSnackbar(err?.response?.data?.message, {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              autoHideDuration: 3000,
            });
          }
          if (
            err?.response?.data?.errors?.detail ===
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

      reset();
    } else {
      navigate("/login");
    }
  };

  if (loading3) {
    return (
      <>
        <NavbarNew />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <CircularProgress />
        </Box>
        <Footer />
      </>
    );
  }
  return (
    <div className="App">
      <NavbarNew />
      <Box>
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
                  <h2 style={{ marginRight: "35%", color: "rgb(107 169 169)" }}>
                    <p>Create Account</p>
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                      <TextField
                        type="text"
                        label="Registration number"
                        placeholder="Registration number"
                        sx={{
                          width: { lg: "50%", md: "50%", sm: "50%", xs: "80%" },
                          marginTop: "12px",
                        }}
                        {...register("registration_number")}
                        helperText={errors.registration_number?.message}
                      />
                    </Box>
                    <Box>
                      <TextField
                        type="password"
                        label="password"
                        placeholder="password"
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
                        sx={{
                          width: { lg: "50%", md: "50%", sm: "50%", xs: "80%" },
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
                        {...register("password2")}
                        helperText={errors.password2?.message}
                      />
                    </Box>
                    <Box>
                      <TextField
                        type="text"
                        label="Role"
                        placeholder="Role..."
                        required
                        sx={{
                          width: { lg: "50%", md: "50%", sm: "50%", xs: "80%" },
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
                        {...register("role")}
                        helperText={errors.role?.message}
                      />
                    </Box>

                    <Button
                      variant="contained"
                      sx={{
                        width: { xs: "85%", sm: "50%" },
                        backgroundColor: "rgb(107 169 169)",
                        textAlign: "start",
                      }}
                      type="submit"
                    >
                      {!loading && <p>Create Account</p>}
                      {loading && (
                        <CircularProgress
                          style={{
                            color: "white",
                            width: "20px",
                            height: "22px",
                          }}
                        />
                      )}
                    </Button>
                  </form>

                  <p style={{ fontSize: "0.8rem", marginTop: "10px" }}>
                    Already have an account?{" "}
                    <span
                      style={{ color: "rgb(107 169 169)" }}
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
                    style={{
                      width: "100%",
                      textAlign: "-webkit-center",
                      marginTop: "10px",
                    }}
                    key={key}
                  >
                    <div
                      style={{
                        width: "80%",
                        border: "1px dotted grey",
                        padding: "11px",
                        backgroundColor: "whitesmoke",
                        borderRadius: "10px",
                      }}
                    >
                      <p
                        className="text-bold text-xl"
                        style={{ color: "rgb(107 169 169)" }}
                      >
                        Upload a csv file
                      </p>
                      <Box className="mt-3 text-xl">
                        <FaUpload style={{ color: "rgb(107 169 169)" }} />
                      </Box>
                      <Button
                        component="label"
                        variant="contained"
                        style={{
                          backgroundColor: "rgb(107 169 169)",
                          marginTop: "10px",
                        }}
                      >
                        <input
                          type="file"
                          accept="*"
                          alt=""
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                        Upload
                      </Button>
                      {fileName && (
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>
                          {fileName}
                        </p>
                      )}
                    </div>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      sx={{
                        width: { xs: "85%", sm: "50%" },
                        backgroundColor: "rgb(107 169 169)",
                        textAlign: "start",
                        marginTop: "20px",
                      }}
                      type="submit"
                      onClick={handleSubmitFile}
                    >
                      {!loading1 && <p>Create Account</p>}
                      {loading1 && (
                        <CircularProgress
                          style={{
                            color: "white",
                            width: "20px",
                            height: "22px",
                          }}
                        />
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </div>
        )}

        {!responsive && (
          <div className="children1_large_screen">
          
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  lg={3}
                  // sx={{ height: "fit-content" }}
                >
                  <center>
                    <div style={{ color: "white" }}>
                      <h1
                        style={{
                          position: "relative",
                          top: "5rem",
                          left: "5rem",
                          width: "400px",
                          height: "auto",
                          color: "black",
                        }}
                      >
                        {" "}
                        Dashboard
                      </h1>
                      <h4
                        style={{
                          position: "relative",
                          top: "6rem",
                          left: "5rem",
                          width: "400px",
                          height: "auto",
                          color: "black",
                        }}
                      >
                        Empowering Workspaces,
                        <br />
                      </h4>
                      <h4
                        style={{
                          position: "relative",
                          top: "6rem",
                          left: "6rem",
                          width: "400px",
                          height: "auto",
                          color: "black",
                        }}
                      >
                        {" "}
                        Inspiring Innovation
                        <br />
                      </h4>

                      <h4
                        style={{
                          position: "relative",
                          top: "8rem",
                          left: "5.0rem",
                          width: "400px",
                          height: "auto",
                          fontSize: "1.3rem",
                          color: "black",
                        }}
                      >
                        {" "}
                        Total Registered Id:{id}
                        <br />
                      </h4>
                    </div>

                    <CardMedia
                      component="img"
                      image="../images/register_page_icon.png"
                      sx={{
                        position: "relative",
                        top: "10rem",
                        left: { lg: "5rem", md: "2rem" },
                        width: "400px",
                        height: "auto",
                      }}
                      alt=""
                    />
                  </center>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={9}
                  lg={9}
                  className="parentGrid_largeScreen"
                >
                  <center>
                    <h2
                      style={{
                        //   marginRight: "35%",
                        //   marginTop: "0px",
                        color: "rgb(107 169 169)",
                        //   textAlign:"center"
                      }}
                    >
                      Create Account
                    </h2>
                  </center>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                      <TextField
                        type="text"
                        label="Registration Number"
                        placeholder="0123442"
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
                        sx={{
                          width: "50%",
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
                        {...register("password2")}
                        helperText={errors?.password2?.message}
                      />
                    </Box>
                    <Box>
                      <TextField
                        type="text"
                        label="Role"
                        placeholder="Role..."
                        sx={{
                          width: { lg: "50%", md: "50%", sm: "50%", xs: "80%" },
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
                        {...register("role")}
                        helperText={errors?.role?.message}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      style={{
                        width: "50%",
                        backgroundColor: "rgb(107 169 169)",
                        textAlign: "start",
                      }}
                      type="submit"
                    >
                      {!loading && <p>Create Account</p>}
                      {loading && (
                        <CircularProgress
                          style={{
                            color: "white",
                            width: "20px",
                            height: "22px",
                          }}
                        />
                      )}
                    </Button>
                  </form>

                  <p style={{ fontSize: "0.8rem", marginTop: "10px" }}>
                    Already have an account?{" "}
                    <span
                      className="cursor-pointer"
                      onClick={(e) => navigate("/login")}
                      style={{ color: "rgb(107 169 169)" }}
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
                      marginTop: "20px",
                    }}
                    key={key}
                  >
                    <Box style={{ width: "100%", textAlign: "-webkit-center" }}>
                      <div
                        style={{
                          width: "50%",
                          border: "1px dotted grey",
                          padding: "5px",
                          backgroundColor: "whitesmoke",
                          borderRadius: "10px",
                        }}
                      >
                        <p
                          className="text-bold text-xl"
                          style={{ color: "rgb(107 169 169)" }}
                        >
                          Upload a csv file
                        </p>
                        <Box className="mt-3 text-xl">
                          <FaUpload style={{ color: "rgb(107 169 169)" }} />
                        </Box>
                        <Button
                          component="label"
                          variant="contained"
                          style={{
                            backgroundColor: "rgb(107 169 169)",
                            marginTop: "10px",
                          }}
                        >
                          <input
                            type="file"
                            accept="*"
                            alt=""
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          Upload
                        </Button>
                        {fileName && (
                          <p style={{ marginTop: "5px", marginBottom: "3px" }}>
                            {fileName}
                          </p>
                        )}
                      </div>
                    </Box>

                    <Box>
                      <Button
                        variant="contained"
                        sx={{
                          width: { xs: "85%", sm: "50%" },
                          backgroundColor: "rgb(107 169 169)",
                          textAlign: "start",
                          marginTop: "20px",
                        }}
                        type="submit"
                        onClick={handleSubmitFile}
                      >
                        {!loading1 && <p>Create Account</p>}
                        {loading1 && (
                          <CircularProgress
                            style={{
                              color: "white",
                              width: "20px",
                              height: "22px",
                            }}
                          />
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
         
          </div>
        )}
      </Box>
      <Footer />
    </div>
  );
};
