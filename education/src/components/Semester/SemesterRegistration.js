import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  
  Card,
  CardContent,
  
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import "../../App.css";
import NavbarNew from "../NavbarNew";
import { IoIosInformationCircle } from "react-icons/io";
import { PiListNumbersFill } from "react-icons/pi";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from "../Home/Footer";
import { enqueueSnackbar } from "notistack";
import { MdDateRange } from "react-icons/md";
import { GiSpellBook } from "react-icons/gi";
import { BaseUrl } from "../BaseUrl";

const schema = yup.object().shape({
  selectedSemester: yup.string().required("Semester is required"),
  branch: yup.string().required("Branch is required"),
});

export function SemesterRegistration() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [branches, setBranches] = useState([]);
  const [branches1, setBranches1] = useState([]);
  const [branches2, setBranches2] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [userProfile, setUserProfile] = useState([]);
 
  const [totalData, setTotalData] = useState([]);
  const [uniqueCodes, setUniqueCodes] = useState([]);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [responsive, setResponsive] = useState(
    window.innerWidth < 669 ? true : false
  );

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const resize = () => {
    setResponsive(window.innerWidth < 669 ? true : false);
  };

  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");
    if (token && token1) {
      let config = {
        method: "GET",
        maxBodyLength: Infinity,
        url: `${BaseUrl}/${
          jwtDecode(sessionStorage.getItem("accesstoken")).college
        }/profile/`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          setLoading(false);
          setUserProfile(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");
    if (token && token1) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BaseUrl}/${
          jwtDecode(sessionStorage.getItem("accesstoken")).college
        }/semester-registrations/?search=${
          userProfile?.personal_information?.registration_number
        }`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          setLoading1(false);
          setResult(response.data.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  }, [userProfile]);

  useEffect(() => {
    if (sessionStorage?.getItem("accesstoken")) {
      const response = jwtDecode(sessionStorage?.getItem("accesstoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        response.role !== "student"
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
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BaseUrl}/${
          jwtDecode(sessionStorage.getItem("accesstoken")).college
        }/semester/?search`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          setLoading2(false);
          setTotalData(response.data);
          const uniqueBranches = response.data.reduce((acc, current) => {
            const x = acc.find(
              (item) => item.semester_name === current.semester_name
            );
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          setBranches(uniqueBranches);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  }, []);

  const fetchBranches = (semester) => {
    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");
    if (token && token1) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BaseUrl}/${
          jwtDecode(sessionStorage.getItem("accesstoken")).college
        }/semester/?search=${semester}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          const uniqueBranches = response.data.reduce((acc, current) => {
            const x = acc.find(
              (item) =>
                item.semester_name === current.semester_name &&
                item.branch === current.branch
            );
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          setBranches1(uniqueBranches);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  };

  const handleSemesterChange = (event) => {
    const semester = event.target.value;
    setSelectedSemester(semester);
    setValue("selectedSemester", semester);
    trigger("selectedSemester");
    fetchBranches(semester);
  };

  const handleBranchChange = (event) => {
    const branch = event.target.value;
    setBranches2(branch);
    setValue("branch", branch);
    trigger("branch");
  };

  useEffect(() => {
    if (selectedSemester && branches2) {
      const filteredData = totalData.filter(
        (item) =>
          item.semester_name === selectedSemester && item.branch === branches2
      );
      const uniqueCodes = [
        ...new Set(
          filteredData
            .map((item) => item.subjects.map((subject) => subject.subject_code))
            .flat()
        ),
      ];
      const uniqueSubjects = filteredData
        .map((item) => item.subjects)
        .flat()
        .filter(
          (v, i, a) =>
            a.findIndex((t) => t.subject_name === v.subject_name) === i
        );
      setUniqueCodes(uniqueCodes);
      setUniqueSubjects(uniqueSubjects);
    }
  }, [selectedSemester, branches2]);

  const onSubmit = (data) => {
    setLoad(true);

    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");
    if (token && token1) {
      console.log("data");

      if (userProfile?.personal_information?.first_name === null)
        return enqueueSnackbar("name field is empty", { variant: "error" });

      if (!userProfile?.academic_information?.session)
        return enqueueSnackbar("Session field is empty", { variant: "error" });

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BaseUrl}/${
          jwtDecode(sessionStorage.getItem("accesstoken")).college
        }/semester/?search`,
        headers: {
          Authorization: `Bearer ${sessionStorage?.getItem("accesstoken")}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          const b = response.data.find((item) => {
            return (
              item?.subjects?.length !== 0 &&
              item?.semester_name === data?.selectedSemester &&
              item?.branch === data?.branch
            );
          })?.id;

          let data1 = JSON.stringify({
            semester: b,
            status: "pending",
          });

          console.log(data1);

          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${BaseUrl}/${
              jwtDecode(sessionStorage.getItem("accesstoken")).college
            }/semester-registrations/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage?.getItem("accesstoken")}`,
            },
            data: data1,
          };

          axios
            .request(config)
            .then((response) => {
              console.log(response.data);
              setLoad(false);
              setResult([
                ...result,
                {
                  status: "pending",
                  semester: {
                    semester_name: response.data?.semester?.semester_name,
                  },
                  applied_date: response.data?.applied_date,
                },
              ]);
              enqueueSnackbar("Request sent successfully", {
                variant: "success",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                autoHideDuration: 1000,
              });
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

              if (error?.response?.data?.errors?.non_field_errors?.[0]) {
                enqueueSnackbar(
                  error?.response?.data?.errors?.non_field_errors?.[0],
                  {
                    variant: "error",
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "center",
                    },
                    autoHideDuration: 3000,
                  }
                );
              }
            });
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

  if (loading || loading1 || loading2) {
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
  // console.log(uniqueSubjects);
  return (
    <>
      <NavbarNew />

      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1544006659-f0b21884ce1d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          paddingTop: "2vw",
          paddingBottom: "15vw",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Overlay with opacity
            zIndex: 1,
          },
        }}
      >
        <Grid
          container
          sx={{
            position: "relative",
            zIndex: 2,
            color: "white",
            padding: { xs: "20px", sm: "20px", md: "50px" },
          }}
        >
          <Grid item xs={12} sm={12} lg={6} md={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.4rem",
                  md: "2.6rem",
                  lg: "2.6rem",
                },
                marginTop: { xs: "20px", md: "80px" },
                fontWeight: "bold",
              }}
            >
              Semester Registration
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.2rem",
                  lg: "1.2rem",
                },
                marginTop: "10px",
                fontWeight: "500",
                padding: { xs: "10px", sm: "10px", md: "0px" },
              }}
            >
              Streamline student semester registration by prioritizing their course selections and schedules. Customize registration options to ensure efficient processing and optimal academic planning.
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
        Semester Registration
      </p>
      <center>
        <Divider
          sx={{
            backgroundColor: "blue",
            width: { lg: "7%", xs: "30%", md: "10%" },
            fontWeight: "800",
            textAlign: "center",
            marginTop: "5px",
          }}
        />
      </center>

      <Grid
        container
        spacing={1}
        style={{
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
       
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          md={7}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            type="text"
             margin="normal"
            variant="standard"
            placeholder="Student Name"
            value={`${userProfile?.personal_information?.first_name} ${userProfile?.personal_information?.middle_name} ${userProfile?.personal_information?.last_name}`}
            fullWidth
            disabled
            sx={{
              width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
              marginTop: "15px",
              marginBottom: "10px",
              
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoIosInformationCircle />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type="text"
             margin="normal"
            variant="standard"
            value={userProfile?.personal_information?.registration_number}
            fullWidth
            disabled
            sx={{
              width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
              marginBottom: "10px",
              
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PiListNumbersFill />
                </InputAdornment>
              ),
            }}
          />

<TextField
            type="text"
            variant="standard"
            margin="normal"
            value={userProfile?.academic_information?.session}
            placeholder="session"
            sx={{
              width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
              
            }}
            fullWidth
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdDateRange />
                </InputAdornment>
              ),
            }}
          />

          <FormControl
            fullWidth
            margin="normal"
             variant="standard"
            sx={{
              width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
              marginBottom: "10px",
            }}
          >
            <InputLabel id="semester-label">Choose Semester</InputLabel>
            <Controller
              name="selectedSemester"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
               
                  {...field}
                  labelId="semester-label"
                  label="Choose Semester"
                  displayEmpty
                  onChange={(e) => {
                    field.onChange(e);
                    handleSemesterChange(e);
                  }}
                >
                  <MenuItem value="" disabled>
                    Choose Semester
                  </MenuItem>
                  {branches.map((semester, index) => (
                    <MenuItem key={index} value={semester.semester_name}>
                      {semester.semester_name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <FormHelperText>{errors.selectedSemester?.message}</FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            variant="standard"
            sx={{
              width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
              marginBottom: "10px",
            }}
          >
            <InputLabel id="branch-label">Branch</InputLabel>
            <Controller
              name="branch"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                
                  {...field}
                  labelId="branch-label"
                  label="Branch"
                  onChange={(e) => {
                    field.onChange(e);
                    handleBranchChange(e);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {branches1?.map((data, index) => (
                    <MenuItem key={index} value={data.branch}>
                      {data.branch}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.branch?.message}</FormHelperText>
          </FormControl>

         
        </Grid>

        <Grid
          item
          lg={5}
          md={5}
          sx={{
            padding: "20px",
            display: {
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
            },
            marginTop: "20px",
          }}
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            Subject List
          </p>
          <center>
            <Box style={{ marginTop: "10px", marginBottom: "20px" }}>
              {uniqueSubjects.length > 0 ? (
                uniqueSubjects.map((data, index) => (
                  <p key={index} style={{ margin: "10px" }}>
                    <GiSpellBook style={{ fontSize: "1.4rem" }} />{" "}
                    {data.subject_code} : {data.subject_name}
                  </p>
                ))
              ) : (
                <center>
                  <img
                    src="./images/semester_no_data.png"
                    alt=""
                    style={{
                      width: "280px",
                    }}
                  />
                </center>
              )}
            </Box>
            <Button
              variant="contained"
              sx={{backgroundColor:"rgb(107, 169, 169)"}}
              onClick={handleSubmit(onSubmit)}
            >
              {!load && <p >Send Request</p>}
              {load && (
                <CircularProgress
                  style={{ color: "white", width: "20px", height: "22px" }}
                />
              )}
            </Button>
          </center>
        </Grid>
      </Grid>

      {/* for phone */}
      <Grid
        container
        spacing={2}
        sx={{
          padding: "20px",
          display: {
            lg: "none",
            md: "none",
            sm: "flex",
            xs: "flex",
          },
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ marginBottom: "50px" }}
          >
            Subject List
          </Typography>
          <center>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              {uniqueSubjects.length > 0 ? (
                uniqueSubjects.map((data, index) => (
                  <p key={index} style={{ margin: "10px" }}>
                    <GiSpellBook style={{ fontSize: "1.4rem" }} />{" "}
                    {data.subject_code} : {data.subject_name}
                  </p>
                ))
              ) : (
                <center>
                  <img
                    src="./images/semester_no_data.png"
                    alt=""
                    style={{
                      width: "280px",
                    }}
                  />
                </center>
              )}
            </Box>
            <Button
              variant="contained"
              sx={{backgroundColor:"rgb(107, 169, 169)"}}
              onClick={handleSubmit(onSubmit)}
            >
              {!load && <p >Send Request</p>}
              {load && (
                <CircularProgress
                  style={{ color: "white", width: "20px", height: "22px" }}
                />
              )}
            </Button>
          </center>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item xs={12} style={{ marginTop: "40px" }}>
          <center>
            <p style={{ width: "100%", fontSize: "1.4rem",fontWeight:"500" }}>
              Previous Records
            </p>
            <Divider
              sx={{
                backgroundColor: "blue",
                width: { lg: "7%", xs: "30%", md: "10%" },
                fontWeight: "600",
                textAlign: "center",
                marginTop: "9px",
              }}
            />
          </center>
        </Grid>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "30px",
            alignItems: "center",
            alignContent: "center",
            width: "100vw",
          }}
        >
          {result?.length === 0 && (
            
              <center>
                <p
                  style={{
                    padding: "1vw 0 4vw 0",
                    fontSize: "1.0rem",
                    marginTop: "40px",
                    marginLeft:"30px"
                  }}
                >
                  No data Found.
                </p>
              </center>
           
          )}

          {result.length > 0 &&
            result.map((data, index) => (
              <Box key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    minWidth: { lg: 775, sm: 400, xs: 305, md: 575 },
                    marginBottom: 2,
                    color: "whitesmoke",
                    height: 150,
                    padding: 2,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="p"
                      color="text.secondary"
                      component="div"
                      sx={{ fontSize: "1.0rem", marginBottom: "2px" }}
                    >
                      Semester Name: {data?.semester?.semester_name}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontSize: "1.0rem" }}
                    >
                      Applied Date: {data?.applied_date}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontSize: "1.0rem", marginBottom: "2px" }}
                    >
                      Status: {data?.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
        </Box>
      </Grid>
      <Footer />
    </>
  );
}

export default SemesterRegistration;
