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
  Paper,
  Card,
  CardContent,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import "../../App.css";
import NavbarNew from "../NavbarNew";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from "../Home/Footer";
import { Table } from "heroicons-react";
import { enqueueSnackbar } from "notistack";

const schema = yup.object().shape({
  selectedSemester: yup.string().required("Semester is required"),
  branch: yup.string().required("Branch is required"),
});

export function SemesterRegistration() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [branches, setBranches] = useState([]);
  const [branches1, setBranches1] = useState([]);
  const [branches2, setBranches2] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [userProfile, setUserProfile] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [uniqueCodes, setUniqueCodes] = useState([]);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);
  const [result, setResult] = useState([]);
  

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
    register,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/profile/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(userProfile?.personal_information?.registration_number);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://amarnath013.pythonanywhere.com/api/user/semester-registrations/?search=${userProfile?.personal_information?.registration_number}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setResult(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userProfile]);

  useEffect(() => {
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (response.exp < Math.floor(Date.now() / 1000)) {
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
      url: `https://amarnath013.pythonanywhere.com/api/user/semester/?search`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
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
  }, []);

  const fetchBranches = (semester) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://amarnath013.pythonanywhere.com/api/user/semester/?search=${semester}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
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
    console.log(data);

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/semester/?search",
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        const b = response.data.find((item) => {
          return item?.subjects?.length!==0 &&  item?.semester_name ===  data?.selectedSemester && item?.branch === data?.branch;
      })?.id;

        let data1 = JSON.stringify({
          semester: b,
          student: `${jwtDecode(localStorage?.getItem("accesstoken")).user_id}`,
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://amarnath013.pythonanywhere.com/api/user/semester-registrations/",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage?.getItem("accesstoken")}`,
          },
          data: data1,
        };

        axios
          .request(config)
          .then((response) => {
            console.log(response.data);

            enqueueSnackbar("Request sent successfully", {
              variant: "success",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              autoHideDuration: 1000,
            });
    
            setTimeout(() => {
              window.location.reload();
            }, 3000);

          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(uniqueSubjects);
  return (
    <>
      <NavbarNew />
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom style={{ width: "100%" }}>
            Semester Registration
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            label="Student Name"
            value={`${userProfile?.personal_information?.first_name} ${userProfile?.personal_information?.middle_name} ${userProfile?.personal_information?.last_name}`}
            fullWidth
            disabled
          />
        </Grid>
        {/* Other form fields */}
        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            value={userProfile?.personal_information?.registration_number}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
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

        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            label="Session"
            value={student.session}
            fullWidth
          />
        </Grid>
      </Grid>
      {/* Subject List */}
      <Grid container spacing={2} style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Subject List
          </Typography>
          <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
            {uniqueSubjects &&
              uniqueSubjects.map((data, index) => (
                <p key={index} style={{ margin: "10px" }}>
                  {data.subject_code} {data.subject_name}
                </p>
              ))}
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ padding: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Send Request
        </Button>
      </Grid>

      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom style={{ width: "100%" }}>
            Previous Semester Registration
          </Typography>
        </Grid>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "20px",
            alignItems: "center",
            alignContent: "center",
            width: "100vw",
          }}
        >
          {result?.semester?.subjets?.length === 0 && (
            <p
              style={{
                marginBottom: "50px",
                marginTop: "100px",
                fontSize: "1.2rem",
              }}
            >
              Nothing to show
            </p>
          )}

          { result.length > 0 &&
            result.map((data, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    minWidth: 275,
                    marginBottom: 2,
                    backgroundColor: "#D2E9E9",
                    height: 150,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Semester Name: {data?.semester?.semester_name}
                    </Typography>

                    <Typography variant="body2">
                      Applied Date: {data?.applied_date}
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
