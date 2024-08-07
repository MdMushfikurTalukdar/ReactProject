import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import NavbarNew from "../components/NavbarNew";

import Footer from "../components/Home/Footer";
import { useNavigate } from "react-router-dom";
import { BaseUrl, Url } from "../components/BaseUrl";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { enqueueSnackbar } from "notistack";
import { error } from "jquery";

export const RegistrarDashboard = () => {
  const navigate = useNavigate();

  const [request, setRequest] = useState(true);
  const [approved, setApproved] = useState(false);
  const [reject, setReject] = useState(false);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [college, setCollege] = useState();

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
        response.role !== "registrar"
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
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

    if (token && token1) {
      const response = jwtDecode(token);

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${Url}/colleges-slugs/?search=${response.college}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .request(config)
        .then((response1) => {
          console.log(JSON.stringify(response1.data));
          axios
            .get(`${BaseUrl}/${response1?.data?.[0]?.slug}/bonafide/`, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "accesstoken"
                )}`,
              },
            })
            .then((response) => {
              setLoading(false);
              console.log(response.data);
              setResult(response.data.reverse());
            })
            .catch((error) => {
              console.error(error);
            });
          setCollege(response1?.data?.[0]?.slug);
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
        });
    } else {
      navigate("/login");
    }
  }, []);

  const handleChange = (number, newValue) => {
    setValue(number);

    if (newValue === "Request") {
      setRequest(true);
      setApproved(false);
      setReject(false);
    }

    if (newValue === "Approved") {
      setApproved(true);
      setRequest(false);
      setReject(false);
    }

    if (newValue === "Rejected") {
      setReject(true);
      setRequest(false);
      setApproved(false);
    }
  };

  const handleVerification = (id) => {
    
    console.log(id);

    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");

    if (token && token1) {
      axios
        .patch(
          `${Url}/${college}/bonafide/${id}/approve/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
            },
          }
        )
        .then((res) => {

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
          }else{
            navigate('/login');
          }
          console.log(res.data);

          setResult((prev) => 
            prev.map((data) =>
              data.id === id ? { ...data, status: "approved" } : data
            )
          );
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
        });
    } else {
      navigate("/login");
    }
  };
  const handleReject = (id) => {
    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");

    if (token && token1) {
      axios
        .patch(
          `${Url}/${college}/bonafide/${id}/reject/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
            },
          }
        )
        .then((res) => {

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
          }else{
            navigate('/login');
          }

          setResult((prev) => 
            prev.map((data) =>
              data.id === id ? { ...data, status: "rejected" } : data
            )
          );
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
        });
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarNew />
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage:
            "url(https://static.vecteezy.com/system/resources/previews/007/625/613/non_2x/co-working-team-meeting-concept-businessman-using-smart-phone-and-laptop-and-digital-tablet-computer-in-modern-office-with-virtual-interface-icons-network-diagram-free-photo.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom-center",
          backgroundSize: "cover",
          overflowX: "none",
          paddingTop: "5vw",
          paddingBottom: "15vw",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} lg={6} md={6}>
            <p
              style={{ fontSize: "2.6rem", color: "white", marginTop: "40px" }}
              id="hero"
            >
              Dashboard
            </p>
            <Typography
              variant="h1"
              sx={{
                fontSize: "1.2rem",
                marginLeft: {
                  lg: "20px",
                  xs: "0px",
                  sm: "0px",
                  md: "20px",
                },
                padding: {
                  lg: "0px",
                  xs: "20px",
                  sm: "10px",
                  md: "0px",
                },
                marginTop: "10px",
                fontWeight: "500",
                color: "white",
              }}
              id="hero1"
            >
              Making Caregiving Easier and More Effective, Where Care Meets
              Efficiency.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "50px",
          marginTop: "20px",
        }}
      >
        <Tabs value={value} aria-label="disabled tabs example">
          <Tab label="Request" onClick={(e) => handleChange(0, "Request")} />
          <Tab label="Approved" onClick={(e) => handleChange(1, "Approved")} />
          <Tab label="Rejected" onClick={(e) => handleChange(2, "Rejected")} />
        </Tabs>
      </Box>

      <Box sx={{ marginBottom: "10%" }}>
        {request &&
          (result?.length > 0 ? (
            <Box>
              <p
                style={{
                  fontSize: "2.0rem",
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Bonafide Requests
              </p>
              <center>
                <Divider
                  sx={{
                    backgroundColor: "blue",
                    width: { lg: "17%", xs: "10%", md: "5%" },
                    fontWeight: "800",
                    textAlign: "center",
                    marginTop: "5px",
                  }}
                />
              </center>
              <Box sx={{ padding: "7px" }}>
                <Grid
                  container
                  spacing={2}
                  sx={{ width: "100vw", marginTop: "50px" }}
                >
                  {result.map((data, index) =>
                    data?.status === "pending" ? (
                      <Grid
                        item
                        lg={6}
                        sm={12}
                        xs={12}
                        md={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                        key={index}
                      >
                        <Card
                          sx={{
                            minWidth: { lg: 545, md: 545, xs: 300, sm: 445 },
                          }}
                        >
                          <CardActionArea>
                            <center>
                              <img
                                src={`data:image/*;base64,${decodeURIComponent(
                                  data?.supporting_document
                                )}`}
                                alt="Marksheet"
                                style={{
                                  height: "280px",
                                  objectFit: "cover",
                                  marginTop: "10px",
                                }}
                              />
                            </center>
                            <CardContent style={{ padding: "15px" }}>
                              <Typography
                                textAlign="center"
                                variant="body2"
                                fontSize="1.2rem"
                                color="text.secondary"
                              >
                                {data.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                textAlign="center"
                                color="text.secondary"
                                marginBottom="0%"
                              >
                                Registration No.:{" "}
                                {data?.student_details?.academic_information?.registration_number}
                              </Typography>
                              <Grid container sx={{ padding: "20px" }}>
                                <Grid item xs={12} lg={6} md={6} sm={6}>
                                  <Box sx={{ display: "flex", gap: "5px" }}>
                                    <Typography
                                      textAlign="center"
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Applied Date:{data.applied_date}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", gap: "5px" }}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      marginTop="5px"
                                    >
                                      Bonafide Number:{" "}
                                      <span>{data.bonafide_number}</span>
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", gap: "5px" }}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      marginTop="5px"
                                    >
                                      Status: <span>{data.status}</span>
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} lg={6} md={6} sm={6}>
                                  <Typography
                                    textAlign="center"
                                    variant="body2"
                                    color="text.secondary"
                                    marginTop="10px"
                                  >
                                    Required For: {data.required_for}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </CardActionArea>
                          <CardActions
                            style={{
                              padding: "0px 15px 15px 15px",
                              float: "right",
                            }}
                          >
                            <Button
                              variant="contained"
                              onClick={(e) => handleVerification(data.id)}
                              style={{ backgroundColor: "rgb(107, 169, 169)" }}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="contained"
                              onClick={(e) => handleReject(data.id)}
                              style={{ backgroundColor: "rgb(107, 169, 169)" }}
                            >
                              Reject
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ) : null
                  )}
                </Grid>
              </Box>
            </Box>
          ) : (
            <center>
              <img
                src="./images/No_data.png"
                alt=""
                style={{ width: "250px" }}
              />
            </center>
          ))}

        {approved &&
          (result?.length > 0 ? (
            <Box>
              <p
                style={{
                  fontSize: "2.0rem",
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Approved Bonafide Requests
              </p>
              <center>
                <Divider
                  sx={{
                    backgroundColor: "blue",
                    width: { lg: "17%", xs: "10%", md: "5%" },
                    fontWeight: "800",
                    textAlign: "center",
                    marginTop: "5px",
                  }}
                />
              </center>
              <Box sx={{ padding: "7px" }}>
                <Grid
                  container
                  spacing={2}
                  sx={{ width: "100vw", marginTop: "50px" }}
                >
                  {result.map((data, index) =>
                    data?.status === "approved" ? (
                      <Grid
                        item
                        lg={6}
                        sm={12}
                        xs={12}
                        md={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                        key={index}
                      >
                        <Card
                          sx={{
                            minWidth: { lg: 545, md: 545, xs: 300, sm: 445 },
                          }}
                        >
                          <CardActionArea>
                            <center>
                              <img
                                src={`data:image/*;base64,${decodeURIComponent(
                                  data?.supporting_document
                                )}`}
                                alt="Marksheet"
                                style={{
                                  height: "280px",
                                  objectFit: "cover",
                                  marginTop: "10px",
                                }}
                              />
                            </center>
                            <CardContent style={{ padding: "15px" }}>
                              <Typography
                                textAlign="center"
                                variant="body2"
                                fontSize="1.2rem"
                                color="text.secondary"
                              >
                                {data.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                textAlign="center"
                                color="text.secondary"
                                marginBottom="0%"
                              >
                                Registration No.:{" "}
                                {data?.student_details?.academic_information?.registration_number}
                              </Typography>
                              <Grid container sx={{ padding: "20px" }}>
                                <Grid item xs={12} lg={6} md={6} sm={6}>
                                  <Box sx={{ display: "flex", gap: "5px" }}>
                                    <Typography
                                      textAlign="center"
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Applied Date:{data.applied_date}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", gap: "5px" }}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      marginTop="5px"
                                    >
                                      Bonafide Number:{" "}
                                      <span>{data.bonafide_number}</span>
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", gap: "5px" }}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      marginTop="5px"
                                    >
                                      Status: <span>{data.status}</span>
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} lg={6} md={6} sm={6}>
                                  <Typography
                                    textAlign="center"
                                    variant="body2"
                                    color="text.secondary"
                                    marginTop="10px"
                                  >
                                    Required For: {data.required_for}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </CardActionArea>
                          <CardActions
                            style={{
                              padding: "0px 15px 15px 15px",
                              float: "right",
                            }}
                          >
                            <Button
                              variant="contained"
                              onClick={(e) => handleReject(data.id)}
                              style={{ backgroundColor: "rgb(107, 169, 169)" }}
                            >
                              Reject
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ) : null
                  )}
                </Grid>
              </Box>
            </Box>
          ) : (
            <center>
              <img
                src="./images/No_data.png"
                alt=""
                style={{ width: "250px" }}
              />
            </center>
          ))}

        {reject &&
          (result?.length > 0 ? (
            <Box>
              <p
                style={{
                  fontSize: "2.0rem",
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Rejected Bonafide Requests
              </p>
              <center>
                <Divider
                  sx={{
                    backgroundColor: "blue",
                    width: { lg: "17%", xs: "10%", md: "5%" },
                    fontWeight: "800",
                    textAlign: "center",
                    marginTop: "5px",
                  }}
                />
              </center>
              <Box sx={{ padding: "7px" }}>
                <Grid
                  container
                  spacing={2}
                  sx={{ width: "100vw", marginTop: "50px" }}
                >
                  {result.map((data, index) =>
                    data?.status === "rejected" ? (
                      <Grid
                        item
                        lg={6}
                        sm={12}
                        xs={12}
                        md={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                        key={index}
                      >
                        <Card
                          sx={{
                            minWidth: { lg: 545, md: 545, xs: 300, sm: 445 },
                          }}
                        >
                          <CardActionArea>
                            <center>
                              <img
                                src={`data:image/*;base64,${decodeURIComponent(
                                  data?.supporting_document
                                )}`}
                                alt="Marksheet"
                                style={{
                                  height: "280px",
                                  objectFit: "cover",
                                  marginTop: "10px",
                                }}
                              />
                            </center>
                            <CardContent style={{ padding: "15px" }}>
                              <Typography
                                textAlign="center"
                                variant="body2"
                                fontSize="1.2rem"
                                color="text.secondary"
                              >
                                {data.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                textAlign="center"
                                color="text.secondary"
                                marginBottom="0%"
                              >
                                Registration No.:{" "}
                                {data?.student_details?.academic_information?.registration_number}
                              </Typography>
                              <Grid container sx={{ padding: "20px" }}>
                                <Grid item xs={12} lg={6} md={6} sm={6}>
                                  <Box sx={{ display: "flex", gap: "5px" }}>
                                    <Typography
                                      textAlign="center"
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Applied Date:{data.applied_date}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", gap: "5px" }}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      marginTop="5px"
                                    >
                                      Bonafide Number:{" "}
                                      <span>{data.bonafide_number}</span>
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", gap: "5px" }}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      marginTop="5px"
                                    >
                                      Status: <span>{data.status}</span>
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} lg={6} md={6} sm={6}>
                                  <Typography
                                    textAlign="center"
                                    variant="body2"
                                    color="text.secondary"
                                    marginTop="10px"
                                  >
                                    Required For: {data.required_for}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </CardActionArea>
                          <CardActions
                            style={{
                              padding: "0px 15px 15px 15px",
                              float: "right",
                            }}
                          >
                            <Button
                              variant="contained"
                              onClick={(e) => handleVerification(data.id)}
                              style={{ backgroundColor: "rgb(107, 169, 169)" }}
                            >
                              Accept
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ) : null
                  )}
                </Grid>
              </Box>
            </Box>
          ) : (
            <center>
              <img
                src="./images/No_data.png"
                alt=""
                style={{ width: "250px" }}
              />
            </center>
          ))}
      </Box>
      <Footer />
    </div>
  );
};
