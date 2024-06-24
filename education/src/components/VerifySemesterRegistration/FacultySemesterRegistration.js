import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl
} from "@mui/material";
import "../../App.css";
import NavbarNew from "../NavbarNew";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from "../Home/Footer";
import { enqueueSnackbar } from "notistack";

const schema = yup.object().shape({
  selectedSemester: yup.string().required("Semester is required"),
  branch: yup.string().required("Branch is required"),
});

const FacultySemesterRegistration = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [branches1, setBranches1] = useState([]);
  const [branches2, setBranches2] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");


  // Radio button
  const [remark, setremark] = useState('no');
  const [isTextFieldDisabled, setIsTextFieldDisabled] = useState(true);

  const handleRadioChange = (event) => {
    setremark(event.target.value);
    if (event.target.value === 'no') {
      setIsTextFieldDisabled(true);
    } else {
      setIsTextFieldDisabled(false);
    }
  };
  // radio button end
  const [userProfile, setUserProfile] = useState({
    personal_information: {
      first_name: "John",
      middle_name: "Doe",
      last_name: "Smith",
      registration_number: "123456"
    }
  });
  const [totalData, setTotalData] = useState([
    {
      semester_name: "Semester 1",
      branch: "Barccg 1",
      subjects: [
        {
          subject_code: "SUB101",
          subject_name: "Subject 1"
        },
        {
          subject_code: "SUB102",
          subject_name: "Subject 2"
        }
      ]
    },
    {
      semester_name: "Semester 2",
      branch: "Barccg 2",
      subjects: [
        {
          subject_code: "SUB201",
          subject_name: "Subject 3"
        },
        {
          subject_code: "SUB202",
          subject_name: "Subject 4"
        }
      ]
    }
  ]);
  const [uniqueCodes, setUniqueCodes] = useState([
    "SUB101",
    "SUB102",
    "SUB201",
    "SUB202"
  ]);
  const [uniqueSubjects, setUniqueSubjects] = useState([
    {
      subject_code: "SUB101",
      subject_name: "Subject 1"
    },
    {
      subject_code: "SUB102",
      subject_name: "Subject 2"
    },
    {
      subject_code: "SUB201",
      subject_name: "Subject 3"
    },
    {
      subject_code: "SUB202",
      subject_name: "Subject 4"
    }
  ]);
  const [result, setResult] = useState([
    {
      id: 1,
      semester_name: "Semester 1",
      branch: "Barccg 1",
      subjects: [
        {
          subject_code: "SUB101",
          subject_name: "Subject 1"
        },
        {
          subject_code: "SUB102",
          subject_name: "Subject 2"
        }
      ]
    },
    {
      id: 2,
      semester_name: "Semester 2",
      branch: "Barccg 2",
      subjects: [
        {
          subject_code: "SUB201",
          subject_name: "Subject 3"
        },
        {
          subject_code: "SUB202",
          subject_name: "Subject 4"
        }
      ]
    }
  ]);

  const [responsive, setResponsive] = useState(
    window.innerWidth < 669? true : false
  );

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const resize = () => {
    setResponsive(window.innerWidth < 669? true : false);
  };

  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log(userProfile?.personal_information?.registration_number);
  }, [userProfile]);

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

  // useEffect(() => {
  //   if (localStorage?.getItem("accesstoken")) {
  //     const response = jwtDecode(localStorage?.getItem("accesstoken"));
  //     if (response.exp < Math.floor(Date.now() / 1000)) {
  //       navigate("/login");
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    const uniqueBranches = totalData.reduce((acc, current) => {
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
  }, []);

  const fetchBranches = (semester) => {
    const uniqueBranches = totalData.reduce((acc, current) => {
      const x = acc.find(
        (item) =>
          item.semester_name === semester && item.branch === current.branch
      );
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setBranches1(uniqueBranches);
  };

  const onSubmit = (data) => {
    console.log(data);

    const b = result.find((item) => {
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
  };

  return (
    <>
      <NavbarNew />
      <Grid container spacing={3} style={{ padding: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom style={{ width: "100%" }}>
              Semester Registration
            </Typography>
          </Grid>

          <Grid item xs={8} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Student Name"
                  value={`${userProfile?.personal_information?.first_name} ${userProfile?.personal_information?.middle_name} ${userProfile?.personal_information?.last_name}`}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  value={userProfile?.personal_information?.registration_number}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Semester"
                  value={totalData[0].semester_name}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Branch"
                  value={totalData[0].branch}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="2020-2024"
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4} sm={4}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '250px',
                width: '250px',
                border: '1px solid #ddd',
              }}
            >
              <img
                src={userProfile.profile_picture}
                alt="Profile Picture"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
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
      
      {/* Any remarks  */}
      <Grid container>
      <Grid item xs={12} sm={6} style={{ paddingLeft: "40px" }}>
        <FormControl component="fieldset">
          <Grid container alignItems="center">
            <Grid item>
              <FormLabel component="legend">Any Remarks?</FormLabel>
            </Grid>
            <Grid item style={{ paddingLeft: "40px" }}>
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Yes"
                onChange={handleRadioChange}
                checked={remark === 'yes'}
              />
            </Grid>
            <Grid item style={{ paddingLeft: "40px" }}>
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="No"
                onChange={handleRadioChange}
                checked={remark === 'no'}
              />
            </Grid>
          </Grid>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} >
        <Box
            sx={{
              marginLeft: "-100%",
              marginTop: "4%",
              padding: "40px"
            }}
          >
          <TextField
            type="text"
            label="Medical Condition Details"
            fullWidth
            multiline
            rows={3}
            disabled={isTextFieldDisabled}
            style={{
              backgroundColor: isTextFieldDisabled ? '#F8F6F4' : '#E3F4F4',
              borderColor: isTextFieldDisabled ? '#ccc' : '#E3F4F4',
            }}
          />
        </Box>
      </Grid>

    </Grid>

      {/* Any remarks  end */}

{/* Button  */}
      <Grid container justify="center" spacing={2} style={{ padding: "40px" }}>
        <Grid item>
          <Button variant="contained" color="primary">
            Approve
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Reject
          </Button>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default FacultySemesterRegistration;