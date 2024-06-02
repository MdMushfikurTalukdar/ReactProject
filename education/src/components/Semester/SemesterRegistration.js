import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Select, MenuItem } from '@mui/material';
import "../../App.css";
import {NavbarNew} from "../NavbarNew"
import {Footer} from "../Footer"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function SemesterRegistration() {
  
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [previousSemesters, setPreviousSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [userProfile, setUserProfile] = useState([]);

  // useEffect(() => {
  //   if (localStorage?.getItem("accesstoken")) {
  //     const response = jwtDecode(localStorage?.getItem("accesstoken"));
  //     if (
  //       response.token_type!== "access" 
  //       && response.exp<Math.floor(Date.now() / 1000)
  //     ) {
  //       navigate("/login");
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

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

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };


  return (
    <>
      <NavbarNew />
      <div style={{ marginLeft: "15%", marginTop: "40px", paddingBottom:"80px" }}>
        <h2 style={{ marginRight: "35%", marginTop: "20px", color: "rgb(107 169 169)" }}>
          Semester Registration
        </h2>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="text"
                label="Name"
                value={userProfile.name}
                readOnly
                sx={{
                  width: "70%",
                  marginTop: "12px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="text"
                label="Registration No"
                value={userProfile?.personal_information?.registration_number}
                readOnly
                sx={{
                  width: "70%",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="text"
                label="Branch"
                value={student.branch}
                readOnly
                sx={{
                  width: "70%",
                  marginTop: "12px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="text"
                label="Session"
                value={student.session}
                readOnly
                sx={{
                  width: "70%",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={6} lg={6}>
            <Select
                    labelId="semester-label"
                    id="semester"
                    value={selectedSemester} 
                    onChange={handleSemesterChange}
                    renderValue={(value) => value === ""? "Choose Semester" : value} 
                    displayEmpty
                    sx={{
                    width: "70%",
                    marginBottom: "10px",
                    }}
                >
                    <MenuItem value={""} disabled>
                    Choose Semester
                    </MenuItem>
                    {semesters.map((semester) => (
                      <MenuItem value={semester.id}>{semester.name}</MenuItem>
                    ))}
                </Select>
            </Grid>
        </Grid>
{/* subject list */}
          
            <h2 style={{ marginRight: "35%", marginTop: "20px", color: "rgb(107 169 169)" }}>
                Subject List
            </h2>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField
                    type="text"
                    label="Subject"
                    value="subject 1"
                    readOnly
                    sx={{
                        width: "80%",
                        marginTop: "12px",
                    }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                    type="text"
                    label="Subject"
                    value="subject 2"
                    readOnly
                    sx={{
                        width: "80%",
                        marginTop: "12px",
                    }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                    type="text"
                    label="Subject"
                    value="subject 3"
                    readOnly
                    sx={{
                        width: "80%",
                        marginTop: "12px",
                    }}
                    />
                </Grid>
            </Grid>

            <Button
                variant="contained"
                sx={{
                    marginTop: "2%",
                    width: "34%",
                    backgroundColor: "rgb(107 169 169)",
                    textAlign: "left",
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
                type="submit"
                >
                Send Request
            </Button>
        </form>
        {/* Previout Semster */}
        <h2 style={{ marginRight: "35%", marginTop: "20px", color: "rgb(107 169 169)" }}>
            Previous Semester Registration
        </h2>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="text"
                label="Senester No"
                value={"semester 1"}
                readOnly
                sx={{
                  width: "70%",
                  marginTop: "12px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="text"
                label="Date"
                value={"10-10-2024"}
                readOnly
                sx={{
                  width: "70%",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              />
            </Grid>
        </Grid>
      </div>
        
      <Footer/>
    </>
  )
}

export default SemesterRegistration;