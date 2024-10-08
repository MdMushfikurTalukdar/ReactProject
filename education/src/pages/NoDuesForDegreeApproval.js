import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarNew from "../components/NavbarNew";
import Footer from "../components/Home/Footer";
import { enqueueSnackbar } from "notistack";
import { BaseUrl } from "../components/BaseUrl";
import { BannerSection } from "../components/BannerSection";

export const NoDuesForDegreeApproval = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [allData, setAllData] = useState([]);
  const [id, setId] = useState();
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(true);

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
            url: `${BaseUrl}/token/refresh/`,
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
        (response.role !== "department" && response.role !== "super-admin")
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (sessionStorage.getItem("accesstoken") !== null) {
      setId(
        parseInt(
          jwtDecode(
            sessionStorage?.getItem("accesstoken")
          ).registration_number.replace("DEP", "")
        )
      );
      let current_id = parseInt(
        jwtDecode(
          sessionStorage?.getItem("accesstoken")
        ).registration_number.replace("DEP", "")
      );

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BaseUrl}/${
          jwtDecode(sessionStorage.getItem("accesstoken")).college
        }/no-dues-list/`,
        headers: {
          Authorization: `Bearer ${sessionStorage?.getItem("accesstoken")}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response?.data);
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
          setLoading(false);
          setAllData(response?.data);
          const filteredResults = response?.data.filter(
            (data) =>
              data?.cloned_departments[current_id - 1]?.status === "pending"
          );
          setResult(filteredResults);

          response?.data?.forEach((data) =>
            data?.cloned_departments?.forEach((data1) => {
              if (
                data1?.Department_id === current_id &&
                data1?.status === "approved"
              ) {
                const newApproval = {
                  status: data1?.status,
                  approved_date: data1?.approved_date,
                  applied_date: data1?.applied_date,
                  registration_number:
                    data?.requested_data?.registration_number,
                  name: data?.requested_data?.name,
                  branch: data?.requested_data?.branch,
                };

                setApproved((prevApproved) => {
                  if (
                    !prevApproved.some(
                      (item) =>
                        item.registration_number ===
                        newApproval.registration_number
                    )
                  ) {
                    return [...prevApproved, newApproval];
                  }
                  return prevApproved;
                });
              }
            })
          );

          response?.data?.forEach((data) =>
            data?.cloned_departments?.forEach((data1) => {
              if (
                data1?.Department_id === current_id &&
                data1?.status === "rejected"
              ) {
                const newRejection = {
                  id: data?.requested_data?.id,
                  status: data1?.status,
                  approved_date: data1?.approved_date,
                  applied_date: data1?.applied_date,
                  registration_number:
                    data?.requested_data?.registration_number,
                  name: data?.requested_data?.name,
                  branch: data?.requested_data?.branch,
                };

                setRejected((prevrejected) => {
                  if (
                    !prevrejected.some(
                      (item) =>
                        item.registration_number ===
                        newRejection.registration_number
                    )
                  ) {
                    return [...prevrejected, newRejection];
                  }
                  return prevrejected;
                });
              }
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleApproval = (user_id) => {
    console.log(user_id);
    let data = JSON.stringify({
      // approved_date: new Date().toLocaleDateString("en-CA"),
      status: "approved",
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${BaseUrl}/${
        jwtDecode(sessionStorage.getItem("accesstoken")).college
      }/no-dues-list/${user_id}/departments/${id}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage?.getItem("accesstoken")}`,
      },
      data: data,
    };
    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");

    if (token && token1) {
      axios
        .request(config)
        .then((response) => {
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
          const itemToApprove = result.find(
            (item) => item?.requested_data?.id === user_id
          );
          if (itemToApprove) {
            setApproved([
              ...approved,
              {
                status: "approved",
                approved_date: new Date().toLocaleDateString("en-CA"),
                applied_date: itemToApprove?.applied_date,
                registration_number:
                  itemToApprove?.requested_data?.registration_number,
                name: itemToApprove?.requested_data?.name,
                branch: itemToApprove?.requested_data?.branch,
              },
            ]);
          }
          setResult(
            result.filter((item) => item?.requested_data?.id !== user_id)
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

  const handleReapproval = (user_id) => {
    console.log(user_id);
    let data = JSON.stringify({
      status: "approved",
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${BaseUrl}/${
        jwtDecode(sessionStorage.getItem("accesstoken")).college
      }/no-dues-list/${user_id}/departments/${id}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage?.getItem("accesstoken")}`,
      },
      data: data,
    };

    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");

    if (token && token1) {
      axios
        .request(config)
        .then((response) => {
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

          const itemToApprove = allData?.find(
            (item) => item?.requested_data?.id === user_id
          );
          if (itemToApprove) {
            setApproved([
              ...approved,
              {
                status: "approved",
                approved_date: new Date().toLocaleDateString("en-CA"),
                applied_date: itemToApprove?.applied_date,
                registration_number:
                  itemToApprove?.requested_data?.registration_number,
                name: itemToApprove?.requested_data?.name,
                branch: itemToApprove?.requested_data?.branch,
              },
            ]);
          }
          setResult(
            result.filter((item) => item?.requested_data?.id !== user_id)
          );

          setRejected(rejected.filter((item) => item?.id !== user_id));
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

  const handleRejection = (user_id) => {
    let data = JSON.stringify({
      status: "rejected",
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${BaseUrl}/${
        jwtDecode(sessionStorage.getItem("accesstoken")).college
      }/no-dues-list/${user_id}/departments/${id}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage?.getItem("accesstoken")}`,
      },
      data: data,
    };

    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");

    if (token && token1) {
      axios
        .request(config)
        .then((response) => {
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

          const itemToReject = result.find(
            (item) => item?.requested_data?.id === user_id
          );
          if (itemToReject) {
            setRejected([
              ...rejected,
              {
                id: user_id,
                status: "rejected",
                approved_date: new Date().toLocaleDateString("en-CA"),
                applied_date: itemToReject?.applied_date,
                registration_number:
                  itemToReject?.requested_data?.registration_number,
                name: itemToReject?.requested_data?.name,
                branch: itemToReject?.requested_data?.branch,
              },
            ]);
          }
          setResult(
            result.filter((item) => item?.requested_data?.id !== user_id)
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
          console.log(error);
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
    <Box>
      <NavbarNew />

      <BannerSection
        image={"../images/banner1.jpg"}
        title={"No Dues Degree Request"}
        subtitle={
          "Streamline the degree no-dues process by prioritizing the settlement of student dues and obligations. Customize clearance procedures to ensure efficient processing and timely issuance of degree certificates."
        }
      />

      <p
        style={{
          fontSize: "1.4rem",
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        No Dues For Degree Requests
      </p>
      <center>
        <Divider
          sx={{
            backgroundColor: "blue",
            width: { lg: "12%", xs: "30%", md: "10%" },
            fontWeight: "800",
            textAlign: "center",
            marginTop: "5px",
            marginBottom: "30px",
          }}
        />
      </center>

      {result.length > 0 ? (
        <Grid container spacing={3}>
          {result.map((data, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={12}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                variant="outlined"
                sx={{
                  width: { lg: "800px", md: "700px", sm: "500px", xs: "300px" },
                }}
              >
                <CardContent>
                  <Typography variant="p" component="div">
                    Registration No: {data?.requested_data?.registration_number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Name: {data?.requested_data?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Branch: {data?.requested_data?.branch}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Applied Date: {data?.applied_date}
                  </Typography>
                  <Box style={{ marginTop: "10px" }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleApproval(data?.requested_data?.id)}
                      style={{ marginRight: "5px", borderRadius: "20px" }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      style={{ borderRadius: "20px" }}
                      onClick={() => handleRejection(data?.requested_data?.id)}
                    >
                      Reject
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <center>
            <img
              src="./images/semester_no_data.png"
              alt=""
              style={{ width: "250px", borderRadius: "10px" }}
            />
          </center>
        </Box>
      )}

      <p
        style={{
          fontSize: "1.4rem",
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Approved No Dues For Degree{" "}
      </p>
      <center>
        <Divider
          sx={{
            backgroundColor: "blue",
            width: { lg: "10%", xs: "30%", md: "10%" },
            fontWeight: "800",
            textAlign: "center",
            marginTop: "5px",
            marginBottom: "30px",
          }}
        />
      </center>
      {approved.length > 0 ? (
        <Grid container spacing={3}>
          {approved.map((data, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={12}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                variant="outlined"
                sx={{
                  width: { lg: "800px", md: "700px", sm: "500px", xs: "300px" },
                }}
              >
                <CardContent>
                  <Typography variant="p" component="div">
                    Registration No: {data?.registration_number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Name: {data?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Branch: {data?.branch}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Applied Date: {data?.applied_date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Approved Date: {data?.approved_date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {data?.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <center>
            <p
              style={{
                padding: "1vw 0 4vw 0",
                fontSize: "1.0rem",
                marginTop: "40px",
                marginLeft: "30px",
              }}
            >
              No data Found.
            </p>
          </center>
        </Box>
      )}

      <p
        style={{
          fontSize: "1.4rem",
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Rejected No Dues For Degree{" "}
      </p>
      <center>
        <Divider
          sx={{
            backgroundColor: "blue",
            width: { lg: "10%", xs: "30%", md: "10%" },
            fontWeight: "800",
            textAlign: "center",
            marginTop: "5px",
            marginBottom: "30px",
          }}
        />
      </center>
      {rejected.length > 0 ? (
        <Grid container spacing={3}>
          {rejected.map((data, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={12}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                variant="outlined"
                sx={{
                  width: { lg: "800px", md: "700px", sm: "500px", xs: "300px" },
                }}
              >
                <CardContent>
                  <Typography variant="p" component="div">
                    Registration No: {data?.registration_number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Name: {data?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Branch: {data?.branch}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Applied Date: {data?.applied_date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rejected Date: {data?.approved_date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {data?.status}
                  </Typography>
                  <Box style={{ marginTop: "10px" }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleReapproval(data?.id)}
                      style={{ marginRight: "5px", borderRadius: "20px" }}
                    >
                      Approve
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <center>
            <p
              style={{
                padding: "1vw 0 4vw 0",
                fontSize: "1.0rem",
                marginTop: "40px",
                marginLeft: "30px",
                marginBottom: "60px",
              }}
            >
              No data Found.
            </p>
          </center>
        </Box>
      )}

      <Footer />
    </Box>
  );
};

export default NoDuesForDegreeApproval;
