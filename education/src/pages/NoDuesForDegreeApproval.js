import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarNew from "../components/NavbarNew";
import Footer from "../components/Home/Footer";
import { enqueueSnackbar } from "notistack";

export const NoDuesForDegreeApproval = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [allData,setAllData]=useState([]);
  const [id, setId] = useState();
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  useEffect(() => {
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        response.role !== "department"
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (localStorage.getItem("accesstoken") !== null) {
      setId(
        parseInt(
          jwtDecode(
            localStorage?.getItem("accesstoken")
          ).registration_number.replace("DEP", "")
        )
      );
      let current_id = parseInt(
        jwtDecode(
          localStorage?.getItem("accesstoken")
        ).registration_number.replace("DEP", "")
      );

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://amarnath013.pythonanywhere.com/api/user/No-dues-list/",
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("accesstoken")}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response?.data);
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
      approved_date: new Date().toLocaleDateString("en-CA"),
      status: "approved",
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `https://amarnath013.pythonanywhere.com/api/user/No-dues-list/${user_id}/departments/${id}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage?.getItem("accesstoken")}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
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
        if(error?.response?.data?.errors?.detail==="Given token not valid for any token type"){
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
  };

  const handleReapproval=(user_id)=>{
   
        console.log(user_id);
        let data = JSON.stringify({
          approved_date: new Date().toLocaleDateString("en-CA"),
          status: "approved",
        });
    
        let config = {
          method: "patch",
          maxBodyLength: Infinity,
          url: `https://amarnath013.pythonanywhere.com/api/user/No-dues-list/${user_id}/departments/${id}/`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage?.getItem("accesstoken")}`,
          },
          data: data,
        };
    
        axios
          .request(config)
          .then((response) => {
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
    
            setRejected(
                rejected.filter((item) => item?.id !== user_id)
              );
    
    
          })
          .catch((error) => {
            console.log(error);
            if(error?.response?.data?.errors?.detail==="Given token not valid for any token type"){
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
};
  


  const handleRejection = (user_id) => {
    let data = JSON.stringify({
      approved_date: new Date().toLocaleDateString("en-CA"),
      status: "rejected",
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `https://amarnath013.pythonanywhere.com/api/user/No-dues-list/${user_id}/departments/${id}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage?.getItem("accesstoken")}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const itemToReject = result.find(
          (item) => item?.requested_data?.id === user_id
        );
        if (itemToReject) {
          setRejected([
            ...rejected,
            {
              id: user_id,
              status: "approved",
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
  };
console.log(rejected);
  return (
    <Box>
      <NavbarNew />
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
                      style={{ marginRight: "5px" }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
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
          <img
            src="./images/No_data.png"
            alt="No data"
            style={{
              width: "100%",
              maxWidth: "310px",
              borderRadius: "10px",
              marginTop: "30px",
            }}
          />
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
          <img
            src="./images/No_data.png"
            alt="No data"
            style={{
              width: "100%",
              maxWidth: "310px",
              borderRadius: "10px",
              marginTop: "30px",
            }}
          />
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
                    Approved Date: {data?.approved_date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {data?.status}
                  </Typography>
                </CardContent>
                <Box style={{ marginTop: "10px" }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleReapproval(data?.id)}
                    style={{ marginRight: "5px" }}
                  >
                    Approve
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <img
            src="./images/No_data.png"
            alt="No data"
            style={{
              width: "100%",
              maxWidth: "310px",
              borderRadius: "10px",
              marginTop: "30px",
            }}
          />
        </Box>
      )}

      <Footer />
    </Box>
  );
};

export default NoDuesForDegreeApproval;
