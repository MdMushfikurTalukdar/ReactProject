import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import NavbarNew from "../components/NavbarNew";

import Footer from "../components/Home/Footer";
import { useNavigate } from "react-router-dom";
import { Url } from "../components/BaseUrl";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { enqueueSnackbar } from "notistack";
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { MdDialerSip } from "react-icons/md";

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const [result, setResult] = useState([]);

  useEffect(() => {
    if (sessionStorage?.getItem("accesstoken")) {
      const response = jwtDecode(sessionStorage?.getItem("accesstoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        response.role !== "super-admin"
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Url}/college-requests/`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleVerification = (e) => {
    const data = {
      is_verified: true,
    };
    axios
      .put(`${Url}/college-requests/${e}/verify/`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        enqueueSnackbar("Email Sent.", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "Request failed with status code 500") {
          enqueueSnackbar("Already action is taken.", {
            variant: "warning",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 3000,
          });
        }
      });
  };
  const handleReject = (e) => {
    const data = {
      is_verified: false,
    };
    axios
      .put(`${Url}/college-requests/${e}/verify/`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        enqueueSnackbar("Email Sent.", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "Request failed with status code 500") {
          enqueueSnackbar("Already action is taken.", {
            variant: "warning",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 3000,
          });
        }
      });
  };

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
          backgroundPosition: "center",
          backgroundSize: "cover",
          overflowX: "none",
          paddingTop: "2vw",
          paddingBottom: "15vw",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} lg={6} md={6}>
            <p
              style={{ fontSize: "2.6rem", color: "black", marginTop: "20px" }}
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
                color: "black",
              }}
              id="hero1"
            >
              If you have any questions, suggestions, or require assistance,
              please do not hesitate to reach out to us. We are here to help and
              look forward to hearing from you.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>

      <p
        style={{
          fontSize: "2.0rem",
          fontWeight: "500",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Requests
      </p>
      <center>
        <Divider
          sx={{
            backgroundColor: "blue",
            width: { lg: "7%", xs: "10%", md: "5%" },
            fontWeight: "800",
            textAlign: "center",
            marginTop: "5px",
          }}
        />
      </center>
      <Box sx={{padding:"7px"}}>
        <Grid container spacing={2} sx={{ width: "100vw", marginTop: "50px" }}>
          {result?.length > 0 &&
            result?.map((data, index) => (
              <Grid
                item
                lg={6}
                sm={12}
                xs={12}
                md={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Card sx={{ minWidth: { lg: 545, md: 545, xs: 300, sm: 445 } }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      image={data?.college_logo}
                      alt="green iguana"
                    />
                    <CardContent style={{ padding: "15px" }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        textAlign="center"
                        marginBottom="2%"
                      >
                        {data?.college_name}
                      </Typography>
                      <Typography  textAlign="center" variant="body2" color="text.secondary">
                            College Address: {data?.college_address}
                          </Typography>
                      <Typography variant="body2" textAlign="center" color="text.secondary"  marginBottom="0%">
                            Principal Name: {data?.principal_name}
                          </Typography>
                      <Grid container sx={{padding:"20px"}}>
                        <Grid item xs={12} lg={6} md={6} sm={6}>
                          <Box sx={{ display: "flex", gap: "5px" }}>
                            <Typography  textAlign="center" variant="body2" color="text.secondary">
                              <IoMdPerson style={{ fontSize: "1.2rem" }} />
                            </Typography>
                            <Typography textAlign="center" variant="body2" color="text.secondary">{data?.name}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: "5px" }}>
                            <Typography  textAlign="center" variant="body2" color="text.secondary">
                              <MdEmail style={{ fontSize: "1.2rem" }} />
                            </Typography>
                            <Typography  textAlign="center" variant="body2" color="text.secondary">{data?.email}</Typography>
                          </Box>
                         

                          
                        </Grid>
                        <Grid item xs={12} lg={6} md={6} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            <SlCalender />
                            {"  "}
                            {data?.established_date} 
                          </Typography>
                          <Typography variant="body2" color="text.secondary" marginTop="5px">
                            <MdDialerSip />: <span>{data?.phone_number}</span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={{ padding: "0px 15px 15px 15px",float:"right" }}>
                    <Button
                      variant="contained"
                      onClick={(e) => handleVerification(data.id)}
                      style={{backgroundColor: "rgb(107, 169, 169)"}}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      onClick={(e) => handleReject(data.id)}
                      style={{backgroundColor: "rgb(107, 169, 169)"}}
                    >
                      Reject
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};
