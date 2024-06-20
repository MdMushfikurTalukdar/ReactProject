import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

// Validation schema
const complaintSchema = yup.object().shape({
  type: yup.string().required("Complaint type is required"),
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
});

const ComplaintForm = () => {
  const [profileData, setProfileData] = useState({
    registrationNo: "",
    name: "",
    branch: "",
  });
  const [complaints, setComplaints] = useState([]);
  const [previousRecord, setPreviousRecord] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      window.location.href = "/login";
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "https://amarnath013.pythonanywhere.com/api/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch profile data");
        const data = await response.json();
        setProfileData({
          registrationNo: data?.academic_information?.registration_number,
          name: data?.personal_information?.first_name,
          branch: data?.academic_information?.department,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          "https://amarnath013.pythonanywhere.com/api/user/complaints",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch complaints");
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchProfileData();
    fetchComplaints();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(complaintSchema),
  });

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/complaints/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setPreviousRecord(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (response.exp < Math.floor(Date.now() / 1000)) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const onSubmit = (data) => {
    let data1 = JSON.stringify({
      name: profileData?.name,
      branch: "Computer Science",
      status: "applied",
      complaint_type: data.type.toLowerCase(),
      complaint_description: data.description,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/complaints/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
      data: data1,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        toast.success("Complaint successfully created");
        setPreviousRecord(response.data);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="md">
      <ToastContainer />
      <Box component={Paper} p={4} mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Complaints Form
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Registration/ Employee No"
                fullWidth
                value={profileData?.registrationNo}
                disabled
                variant="outlined"
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                value={profileData?.name}
                disabled
                variant="outlined"
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Branch"
                fullWidth
                value={profileData?.branch}
                disabled
                variant="outlined"
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Complaint Type</InputLabel>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Complaint Type">
                      <MenuItem value="Ragging related">Ragging related</MenuItem>
                      <MenuItem value="Academic fees">Academic fees</MenuItem>
                      <MenuItem value="Classes related">Classes related</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                  )}
                />
                {errors.type && <Typography color="error">{errors.type.message}</Typography>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Subject"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  />
                )}
              />
              {errors.subject && (
                <Typography color="error">{errors.subject.message}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Complaint Description"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  />
                )}
              />
              {errors.description && (
                <Typography color="error">{errors.description.message}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  backgroundColor:"rgb(107, 169, 169)"
                }}
              >
                Register Complaint
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Previous Complaints
        </Typography>
        {complaints.length > 0 ? (
          complaints.map((complaint, index) =>
            complaint.registration_number === profileData.registrationNo ? (
              <Box key={index} component={Paper} p={2} mb={2}>
                <Typography variant="body1">
                  <strong>Name:</strong> {complaint?.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Branch:</strong> {complaint?.branch}
                </Typography>
                <Typography variant="body1">
                  <strong>Complaint Description:</strong> {complaint?.complaint_description}
                </Typography>
                <Typography variant="body1">
                  <strong>Complaint Type:</strong> {complaint?.complaint_type}
                </Typography>
              </Box>
            ) : null
          )
        ) : (
          <Typography>No previous complaints.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default ComplaintForm;
