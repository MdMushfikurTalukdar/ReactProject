import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "../App.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const ProfileMainBody = () => {
  const [userProfile, setUserProfile] = useState([]);
  const navigate=useNavigate();

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
 
  return (
    <>
      <Box
        className=" mt-3 w-full lg:p-10 sm:p-5 p-5"
        style={{ height: "calc(100vh - 5px)", overflowY: "scroll" }}
      >
        <Box>
          <Typography variant="p" className="text-xl">
            Profile
          </Typography>
        </Box>

        <Box className="text-center">
          <img
            src="https://mui.com/static/images/avatar/2.jpg"
            alt=""
            className="lg:w-[10%] w-[40%] sm:w-[25%] md:w-[15%] h-auto text-center"
            style={{ borderRadius: "50%" }}
          />
        </Box>

        <Box className="lg:p-10 sm:p-5 p-5">
          <div className="flex justify-between">
            <Typography variant="p text-xl mx-auto mb-10">
              Basic details
            </Typography>
            <Button variant="contained" onClick={(e)=>navigate('/profileEdit')}>
              Edit
            </Button>
          </div>
          <Grid container className="mt-10">
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">Registration No.</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.personal_information?.registration_number}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">First Name</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.personal_information?.first_name}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">Middle Name</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.personal_information?.middle_name}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">Last Name</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.personal_information?.last_name}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">DOB</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.personal_information?.date_of_birth}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">Gender</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.personal_information?.gender}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box className="lg:p-10 sm:p-5 p-5">
          <Typography variant="p text-xl mx-auto mb-10">
            Contact Information
          </Typography>
          <Grid container className="mt-10">
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">Email</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.contact_information?.email}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">Phone no.</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.contact_information?.phone_number}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">Alternate phone no</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.contact_information?.alternate_phone_number}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">Address</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.contact_information?.address}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">City</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.contact_information?.city}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">State</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.contact_information?.state}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">Postal Code</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.contact_information?.postal_code}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">Country</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.contact_information?.country}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box className="lg:p-10 sm:p-5 p-5">
          <Typography variant="p text-xl mx-auto mb-10">
            Academic Information
          </Typography>
          <Grid container className="mt-10">
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">registration_number</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.academic_information?.registration_number}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">enrollment_date</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.academic_information?.enrollment_date}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">program</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.academic_information?.program}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">major</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.academic_information?.major}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">Current year</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.academic_information?.current_year}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">gpa</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.academic_information?.gpa}
              </Typography>
            </Grid>


            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">Department</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.academic_information?.department}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">course_enrolled</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12}>
              <Typography variant="p">
                {userProfile?.academic_information?.course_enrolled}
              </Typography>
            </Grid>

            <Divider style={{ width: "100%", margin: "10px 0" }} />
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              md={12}
              style={{ marginTop: "10px" }}
            >
              <Typography variant="p">Country</Typography>
            </Grid>
            <Grid item lg={4} sm={12} xs={12} md={12} style={{marginBottom:"40px"}}>
              <Typography variant="p">
                {userProfile?.contact_information?.country}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
