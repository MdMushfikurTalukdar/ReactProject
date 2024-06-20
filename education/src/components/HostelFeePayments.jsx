import { Button, TextField, MenuItem, Container, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const schema = yup.object().shape({
  feeType: yup.string().required("Fee Type is required"),
  noOfMonths: yup
    .number()
    .min(1, "Must be at least 1 month")
    .required("Number of months is required"),
  monthlyCharges: yup
    .number()
    .min(0, "Must be a positive number")
    .required("Monthly Charges is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .when("startDate", (startDate, schema) => {
      return startDate
        ? schema.min(startDate, "End date cannot be before start date")
        : schema;
    })
    .required("End date is required"),
});

function HostelFeePayment() {
  const [profileData, setProfileData] = useState({
    registrationNo: "",
    name: "",
    branch: "",
  });

  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const noOfMonths = watch("noOfMonths");
  const monthlyCharges = watch("monthlyCharges");

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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "https://amarnath013.pythonanywhere.com/api/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
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

    fetchProfileData();
  }, []);

  const onSubmit = (data) => {
    let data1 = JSON.stringify({
      "registration_details": 16900120125,
      "from_date": "2024-05",
      "to_date": "2024-06",
      "mess_fees": "5000",
      "maintainance_fees": "2000",
      "security_fees": "1000",
      "total_fees": 8000
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://amarnath013.pythonanywhere.com/api/user/mess-fees-payment/',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
      },
      data : data1
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const calculate = () => {
    setTotal(monthlyCharges * noOfMonths);
  };

  return (
    <Container maxWidth="md">
      <div className="bg-white shadow-lg rounded-lg px-8 pb-8" >
        <Typography variant="h4" align="center" gutterBottom style={{marginTop:"20px",marginBottom:"36px"}}>
          Hostel/Mess Fee Payment
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={profileData.name}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Registration No"
                variant="outlined"
                fullWidth
                value={profileData.registrationNo}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    selectsStart
                    startDate={field.value}
                    minDate={new Date()}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    customInput={<TextField label="From" variant="outlined" fullWidth />}
                  />
                )}
              />
              {errors.startDate && (
                <Typography color="error" variant="body2">
                  {errors.startDate.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    selectsEnd
                    startDate={watch("startDate")}
                    endDate={field.value}
                    minDate={watch("startDate")}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    customInput={<TextField label="To" variant="outlined" fullWidth />}
                  />
                )}
              />
              {errors.endDate && (
                <Typography color="error" variant="body2">
                  {errors.endDate.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="feeType"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Fee Type"
                    variant="outlined"
                    fullWidth
                    error={!!errors.feeType}
                    helperText={errors.feeType?.message}
                  >
                    <MenuItem value="Maintenance Fee">Maintenance Fee</MenuItem>
                    <MenuItem value="Mess Fee">Mess Fee</MenuItem>
                    <MenuItem value="Security Money">Security Money</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="number"
                label="Monthly Charges"
                variant="outlined"
                fullWidth
                {...register("monthlyCharges")}
                error={!!errors.monthlyCharges}
                helperText={errors.monthlyCharges?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="number"
                label="No. of Months"
                variant="outlined"
                fullWidth
                {...register("noOfMonths")}
                error={!!errors.noOfMonths}
                helperText={errors.noOfMonths?.message}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" mb={2}>
            <Button
              onClick={calculate}
              variant="contained"
              color="primary"
            >
              Calculate Total
            </Button>
          </Grid>
          <Typography variant="h6" align="right" gutterBottom>
            Total: {total}
          </Typography>
          <Grid container justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{marginBottom:"20px"}}
            >
              Pay & Request to Verify
            </Button>
          </Grid>
        </form>
        <hr />
        <div className="border-t pt-4">
          <Typography variant="h6" gutterBottom>
            Previous Fee Payments:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">Fee Type:</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">From:</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">To:</Typography>
            </Grid>
            <Grid item xs={4}>Maintenance Fee</Grid>
            <Grid item xs={4}>2023-01</Grid>
            <Grid item xs={4}>2023-03</Grid>
            <Grid item xs={4}>Security Money</Grid>
            <Grid item xs={4}>2023-09</Grid>
            <Grid item xs={4}>2024-01</Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
}

export default HostelFeePayment;
