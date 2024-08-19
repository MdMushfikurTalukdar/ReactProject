import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  CardMedia,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NavbarNew from "../components/NavbarNew";
import Footer from "../components/Home/Footer";
import { BaseUrl, Url } from "../components/BaseUrl";

const HostelRoomAllotment = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [allotmentData, setAllotmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data1, setData1] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [hostel_room, setHostel_room] = useState(0);
  const [approvedList, setApprovedList] = useState([]);
  const hostelRef = useRef(null);

  const navigate = useNavigate();

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
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BaseUrl}/${
        jwtDecode(sessionStorage?.getItem("accesstoken")).college
      }/hostel-allotments/`,
      headers: {
        Authorization: `Bearer ${sessionStorage?.getItem("accesstoken")}`,
      },
    };

    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");
    if (token && token1) {
      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          setData1(response.data);
          setLoading1(false);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
          setLoading1(false);
        });
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("accesstoken");
    if (token) {
      const response = jwtDecode(token);
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        (response.role !== "caretaker" && response.role !== "super-admin")
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    // if (hostel_room === 0) {
    //   return enqueueSnackbar("Hostel Room field is required", {
    //     variant: "error",
    //   });
    // }

    let array = [];
    console.log(data);

    array.push(parseInt(data));

    const jsonData = {
      hostel_room: hostel_room,
      allotment_details: array,
    };

    console.log(hostel_room);

    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");
    if (token && token1) {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BaseUrl}/${
          jwtDecode(sessionStorage?.getItem("accesstoken")).college
        }/hostel-room-allotments/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
        },
        data: jsonData,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);

          let number =
            response?.data?.allotment_details?.[0]?.prefered_room_type;
          let add;
          if (number === "single") {
            add = 1;
          } else if (number === "double") {
            add = 2;
          } else {
            add = 3;
          }

          setData1((prev) =>
            prev?.filter(
              (item) =>
                item.registration_number !==
                response?.data?.allotment_details?.[0]?.registration_number
            )
          );

          setApprovedList((prevList) => [
            ...prevList,
            {
              registration_number:
                response?.data?.allotment_details?.[0]?.registration_number,
              room_no: response?.data?.hostel_room?.room_no,
            },
          ]);

          // setAllotmentData((prev) =>
          //   prev.map((item) =>
          //     item.id === hostel_room
          //       ? item.current_occupancy+add === item.capacity
          //         ? { ...item, status: "occupied" }
          //         : { ...item, current_occupancy: item.current_occupancy + add }
          //       : item
          //   )
          // );

          setHostel_room("");

          if (hostelRef.current) {
            hostelRef.current.value = "";
          }

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
        })
        .catch((error) => {
          console.error(error);
          setHostel_room("");

          if (hostelRef.current) {
            hostelRef.current.value = "";
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
          if (error?.response?.data?.errors?.hostel_room?.[0]) {
            enqueueSnackbar(error?.response?.data?.errors?.hostel_room?.[0], {
              variant: "error",
            });
          }
          if (error?.response?.data?.errors?.[0])
            enqueueSnackbar(error?.response?.data?.errors?.[0], {
              variant: "error",
            });
        });
    } else {
      navigate("/login");
    }
  };

  const fetchAllotmentData = async () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BaseUrl}/${
        jwtDecode(sessionStorage?.getItem("accesstoken")).college
      }/hostel-room-registrations/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
      },
    };

    try {
      const response = await axios.request(config);
      setAllotmentData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllotmentData();
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Url}/${
        jwtDecode(sessionStorage.getItem("accesstoken")).college
      }/hostel-room-allotments/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);

        const approvedData = response.data
          .filter((item) => item.allotment_details.length > 0) // Filter out items without allotment details
          .map((item) => ({
            registration_number: item.allotment_details[0]?.registration_number,
            room_no: item.hostel_room?.room_no,
          }));

        setApprovedList(approvedData); // Update state with filtered and mapped data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading || loading1) {
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
    <Box className="logout-container">
      <div className="circle circle1"></div>
      <div className="rectangle circle2"></div>
      <div className="circle circle3"></div>
      <div className="rectangle circle4"></div>
      <div className="rectangle circle5"></div>
      <div className="circle circle6"></div>
      <Box
        className="z-10"
        style={{ height: "calc(100vh - 2px)", overflowY: "scroll" }}
      >
        <Box>
          <NavbarNew />
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={12}
              sm={12}
              lg={12}
              sx={{
                width: "100vw",
                padding: "12",
                marginTop: "20px",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontSize: "1.6rem",
                  marginTop: "10px",
                  marginBottom: "50px",
                }}
              >
                Hostel Room Allotments
              </p>
              <center>
                <img
                  src="./images/hostel_caretaker.png"
                  alt=""
                  style={{ width: "300px" }}
                />
              </center>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "1.6rem",
                  marginTop: "10px",
                  marginBottom: "50px",
                }}
              >
                Hostel Room Requests
              </p>
              {data1.some((item) => item.status === "pending") ? null : (
                <center>
                  <img
                    src="./images/No_data.png"
                    alt=""
                    style={{ width: "250px", marginTop: "50px" }}
                  />
                </center>
              )}
              {data1.length === 0 ? (
                <Typography
                  variant="body1"
                  align="center"
                  sx={{
                    marginTop: { xs: "20%", sm: "4%", lg: "4%", md: "4%" },
                  }}
                >
                  <center>
                    <img
                      src="./images/No_data.png"
                      alt=""
                      style={{
                        width: "310px",
                        borderRadius: "10px",
                        marginTop: "30px",
                      }}
                    />
                  </center>
                </Typography>
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  minHeight="20vh"
                  sx={{
                    display: "",
                  }}
                >
                  <Grid container spacing={3}>
                    {data1.map((item, index) =>
                      item.status === "pending" ? (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          lg={4}
                          md={6}
                          key={index}
                          justifyContent="center"
                          display="flex"
                        >
                          <Card
                            sx={{
                              width: {
                                lg: "70%",
                                md: "70%",
                                xs: "88%",
                                sm: "80%",
                              },
                              backgroundColor: "rgb(244, 243, 243)",
                              border: "2px solid whitesmoke",
                            }}
                          >
                            <CardMedia
                              component="img"
                              sx={{ height: 260, objectFit: "cover" }}
                              image={`data:image/jpeg;base64,${item.latest_marksheet}`}
                              alt="Marksheet"
                            />

                            <CardContent>
                              <Grid container spacing={3}>
                                <Grid item xs={12}>
                                  <p>
                                    Registration Number:{" "}
                                    {item?.registration_number}
                                  </p>
                                  <p>{item?.prefered_room_type}</p>
                                </Grid>
                                <Grid item xs={12}>
                                  <Select
                                    labelId="numberOfPersons-label"
                                    id="RoomType"
                                    label="Rooms"
                                    
                                    onChange={(e) =>
                                      setHostel_room(e.target.value)
                                    }
                                    sx={{
                                      width: {
                                        lg: "90%",
                                        md: "70%",
                                        xs: "100%",
                                        sm: "90%",
                                      },
                                    }}
                                  >
                                    {allotmentData?.map((data, index) =>
                                      data?.status === "available" ? (
                                        <MenuItem key={index} value={data.id}>
                                          {data.room_no}{" "}
                                          {data.current_occupancy}{" "}
                                          {data.capacity}
                                        </MenuItem>
                                      ) : null
                                    )}
                                  </Select>
                                </Grid>

                                <Grid item xs={12}>
                                  <center>
                                    <Button
                                      type="submit"
                                      variant="contained"
                                      color="primary"
                                      fullWidth
                                      onClick={() => {
                                        onSubmit(item?.id);
                                      }}
                                      sx={{
                                        width: {
                                          lg: "30%",
                                          md: "40%",
                                          xs: "100%",
                                          sm: "90%",
                                        },
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </center>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      ) : null
                    )}
                  </Grid>
                </Box>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sm={12}
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Divider style={{ marginTop: "20px" }} />
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                Approved Allotment Details
              </Typography>
              <Box
                sx={{ width: { lg: "50%", md: "50%", xs: "90%", sm: "90%" } }}
              >
                {approvedList.length === 0 ? (
                  <center>
                    <img
                      src="./images/No_data.png"
                      alt=""
                      style={{
                        width: "310px",
                        borderRadius: "10px",
                        marginTop: "30px",
                      }}
                    />
                  </center>
                ) : (
                  approvedList.map((data, index) => (
                    <Card
                      style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        backgroundColor: "whitesmoke",
                      }}
                      key={index}
                    >
                      <CardContent style={{ padding: "20px" }}>
                        <Typography variant="subtitle1">
                          Registration Number: {data?.registration_number}
                        </Typography>
                        <Typography variant="subtitle1">
                          Hostel Room: {data?.room_no}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default HostelRoomAllotment;
