import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "../App.css";
import { CiEdit } from "react-icons/ci";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../pages/logout.css';
import { jwtDecode } from "jwt-decode";
import { Opacity } from "@mui/icons-material";

export const ProfileMainBody = () => {
  const [userProfile, setUserProfile] = useState([]);
  const navigate = useNavigate();

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

  // const handleChange=(e)=>{

  //   const formData=new FormData();
  //   console.log(e.target.files[0]);
  //   formData.append("profile_picture",e.target.files[0]);

  //   let data = JSON.stringify({
  //     "personal_information": {
  //       "profile_picture":formData
  //     },
  //     "contact_information": {},
  //     "academic_information": {}
  //   });

  //   let config = {
  //     method: 'put',
  //     maxBodyLength: Infinity,
  //     url: 'https://amarnath013.pythonanywhere.com/api/user/profile/',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
  //     },
  //     data : data
  //   };

  //   axios.request(config)
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // }
  return (
    <Box className="logout-container">
      <div className="circle circle1"></div>
      <div className="rectangle circle2"></div>
      <div className="circle circle3"></div>
      <div className="rectangle circle4"></div>
      <div className="rectangle circle5"></div>
      <div className="circle circle6"></div>

      <Box
        className=" mt-3 w-full lg:p-10 sm:p-5 p-5 z-10"
        style={{ height: "calc(100vh - 5px)", overflowY: "scroll" }}
      >
        <Box>
          <Typography variant="p" className="text-2xl">
            Profile
          </Typography>
        </Box>

        <Box className="text-center" >
          {userProfile?.personal_information?.profile_picture !== null ? (
            <img
              src={userProfile?.personal_information?.profile_picture}
              alt="Loading..."
              style={{
                width: "150px",
                height: "150px",
                margin: "10px 0px 10px 40px",
                borderRadius: "50%",
                filter:"opacity(1)"
              }}
            />
          ) : (
            <img
              src="https://mui.com/static/images/avatar/2.jpg"
              alt="Loading..."
              className="lg:w-[10%] w-[40%] sm:w-[25%] md:w-[15%] h-auto text-center"
              style={{ borderRadius: "50%" }}
            />
          )}
          <Typography varient="span" component="label">
            <input type="file" style={{ display: "none" }} />
          </Typography>
        </Box>

        <Box className="lg:p-10 sm:p-5 xs:p-0 md:p-5 mb-4">
          <div className="flex justify-between">
            <p style={{ fontSize: "1.5rem", marginTop: "20px" }}>
              Basic details
            </p>

            <CiEdit
              style={{ fontSize: "1.5rem" }}
              onClick={(e) => navigate("/profileEdit")}
            />
          </div>
          <Box className="bg-gray-100 p-3 rounded-2xl mt-6">
            <Grid container className="mt-3">
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{ marginTop: "0px", marginBottom: "5px" }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Registration No.
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.personal_information?.registration_number}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  First Name
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.personal_information?.first_name}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Middle Name
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.personal_information?.middle_name || <p>NA</p>}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Last Name
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.personal_information?.last_name}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  DOB
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.personal_information?.date_of_birth}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Gender
                </Typography>
              </Grid>
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                style={{ marginBottom: "10px" }}
              >
                <Typography variant="p">
                  {userProfile?.personal_information?.gender}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className="lg:p-10 sm:p-5 xs:p-0 md:p-5 mb-6">
          <Typography variant="p" className="text-2xl mx-auto mb-5">
            Contact Information
          </Typography>
          <Box className="bg-gray-100 p-3 rounded-2xl mt-6">
            <Grid container className="mt-3">
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "0px", sm: "0px", md: "0px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Email
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.contact_information?.email}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Phone no.
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.contact_information?.phone_number}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Alternate phone no
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.contact_information?.alternate_phone_number || (
                    <p>NA</p>
                  )}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Address
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.contact_information?.address}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  City
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.contact_information?.city}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  State
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.contact_information?.state}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Postal Code
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.contact_information?.postal_code}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Country
                </Typography>
              </Grid>
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                style={{ marginBottom: "5px" }}
              >
                <Typography variant="p">
                  {userProfile?.contact_information?.country}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box className="lg:p-10 sm:p-5 md:p-5 xs:p-0">
          <Typography variant="p " className="  text-2xl mx-auto mb-10">
            Academic Information
          </Typography>
          <Box className="bg-gray-100 p-3 rounded-2xl mt-6">
            <Grid container className="mt-3">
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                style={{ marginTop: "0px", marginBottom: "5px" }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Registration_number
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.academic_information?.registration_number}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
               
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Enrollment_date
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.academic_information?.enrollment_date}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Program
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.academic_information?.program}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Major
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.academic_information?.major}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Current year
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.academic_information?.current_year}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  GPA
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.academic_information?.gpa}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Batch
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.academic_information?.batch}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Department
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.academic_information?.department}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Course_enrolled
                </Typography>
              </Grid>
              <Grid item lg={4} sm={12} xs={12} md={12}>
                <Typography variant="p">
                  {userProfile?.academic_information?.course_enrolled}
                </Typography>
              </Grid>

              <Divider
                sx={{
                  width: "100%",
                  margin: "10px 0",
                  display: {
                    xs: "none",
                    sm: "none",
                    lg: "block",
                    md: "block",
                  },
                }}
              />
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                sx={{
                  marginTop: { xs: "15px", sm: "15px", md: "15px", lg: "0px" },
                  marginBottom: "5px",
                }}
              >
                <Typography variant="p" style={{ fontSize: "1.2rem" }}>
                  Country
                </Typography>
              </Grid>
              <Grid
                item
                lg={4}
                sm={12}
                xs={12}
                md={12}
                style={{ marginBottom: "20px" }}
              >
                <Typography variant="p">
                  {userProfile?.contact_information?.country}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
