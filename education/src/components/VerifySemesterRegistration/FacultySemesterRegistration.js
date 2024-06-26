import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
  useMediaQuery,
  Container,
  RadioGroup
} from "@mui/material";
import "../../App.css";
import NavbarNew from "../NavbarNew";
import {jwtDecode} from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import Footer from "../Home/Footer";

const FacultySemesterRegistration = () => {
  const { id } = useParams();
  const [text, setText] = useState([]);
  const [profileDetails, setProfileDetails] = useState(null);
  const [remark, setRemark] = useState('no');
  const [isTextFieldDisabled, setIsTextFieldDisabled] = useState(true);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();

  const handleRadioChange = (event) => {
    setRemark(event.target.value);
    setIsTextFieldDisabled(event.target.value === 'no');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://amarnath013.pythonanywhere.com/api/user/semester-registrations/${id}`,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("accesstoken")}`
          }
        };

        const response = await axios.request(config);
        setProfileDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (response.exp < Math.floor(Date.now() / 1000)) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const onSubmit = (status) => {
    let data1 = JSON.stringify({
      "registration_details": id,
      "remarks": text,
      "status": status
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://amarnath013.pythonanywhere.com/api/user/verify-semester-registration/',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage?.getItem('accesstoken')}`
      },
      data : data1
    };
    
    axios.request(config)
    .then((response) => {
      enqueueSnackbar("Action successful", { variant: 'success' });
      navigate("/verifySemesterRegistration");
    })
    .catch((error) => {
      enqueueSnackbar("Action failed", { variant: 'error' });
      console.log(error);
    });
  };

  if (!profileDetails) return <div>Loading...</div>;

  const { personal_information, academic_information } = profileDetails.student_details;

  return (
    <>
      <NavbarNew />
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Semester Registration
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Student Name"
                  value={`${personal_information?.first_name} ${personal_information?.last_name}`}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Registration Number"
                  value={personal_information?.registration_number}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Semester"
                  value={profileDetails?.semester?.semester_name}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Branch"
                  value={academic_information?.department}
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  label="Batch"
                  value="2020-2024"
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={4}>
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
              <img src={personal_information?.profile_picture} style={{width:"250px",height:"250px"}} alt=""/>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Subject List
            </Typography>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              {profileDetails?.semester?.subjects?.map((data, index) => (
                <Typography key={index} variant="body1" style={{ margin: "10px 0" }}>
                  {data.subject_name} ({data.subject_code})
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box>
         
            <FormControl component="fieldset">
              <FormLabel component="legend">Any Remarks?</FormLabel>
              <RadioGroup row value={remark} onChange={handleRadioChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
         </Box>
          <Box>
            <TextField
              type="text"
              label="Remarks Details"
              fullWidth
              multiline
              rows={3}
              disabled={isTextFieldDisabled}
              style={{
                backgroundColor: isTextFieldDisabled ? '#F8F6F4' : '#E3F4F4',
                borderColor: isTextFieldDisabled ? '#ccc' : '#E3F4F4',
              }}
              onChange={(e) => setText(e.target.value)}
            />
          </Box>
        

        <Grid container justifyContent="center" spacing={2} style={{ marginTop: "40px" }}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => onSubmit("approved")}>
              Approve
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => onSubmit("rejected")}>
              Reject
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default FacultySemesterRegistration;
