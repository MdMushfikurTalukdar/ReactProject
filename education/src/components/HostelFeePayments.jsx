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
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

const schema = yup.object().shape({
  feeType: yup.string().required("Fee Type is required"),
  noOfMonths: yup
    .number()
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
        ? schema.min(dayjs(startDate).add(1, "day").toDate(), "End date cannot be before start date")
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

  const [fees, setFees] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://amarnath013.pythonanywhere.com/api/user/fees/',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
      },
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        setFees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const noOfMonths = watch("noOfMonths");
  const monthlyCharges = watch("monthlyCharges");
  const feeType = watch("feeType");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

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

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://amarnath013.pythonanywhere.com/api/user/hostel-room-allotments/?search=${localStorage.getItem('RollNumber')}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('id', response?.data[0]?.id)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (feeType) {
      const selectedFee = fees[feeType];
      setValue("monthlyCharges", selectedFee ? parseFloat(selectedFee) : 0);
      trigger("monthlyCharges");
    }
  }, [feeType, fees, setValue]);

  useEffect(() => {
    if (startDate && endDate) {
      const differenceInDays = dayjs(endDate).diff(dayjs(startDate), "day");
      const calculatedMonths = Math.ceil(differenceInDays / 30);
      setValue("noOfMonths", calculatedMonths);
      trigger("noOfMonths");
      setTotal(calculatedMonths * monthlyCharges);
    }
  }, [startDate, endDate, setValue, monthlyCharges]);

  const onSubmit = (data) => {
    let data1 = JSON.stringify({
      "registration_details": localStorage.getItem('id'),
      "from_date": dayjs(data.startDate).format("YYYY-MM-DD"),
      "to_date": dayjs(data.endDate).format("YYYY-MM-DD"),
      "mess_fees": data.feeType === "Mess_fees" ? fees.Mess_fees : null,
      "maintainance_fees": data.feeType === "Maintainance_fees" ? fees.Maintainance_fees : null,
      "security_fees": data.feeType === "Security_fees" ? fees.Security_fees : null,
      "total_fees": total
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://amarnath013.pythonanywhere.com/api/user/mess-fees-payment/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
      },
      data: data1
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar("Amount Paying Request successfull", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });

        setTimeout(()=>{
          window.location.reload();
        },2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://amarnath013.pythonanywhere.com/api/user/mess-fees-payment/?search=${localStorage?.getItem('RollNumber')}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log((response.data));
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth="md">
      <div className="bg-white shadow-lg rounded-lg px-8 pb-8">
        <Typography variant="h4" align="center" gutterBottom style={{ marginTop: "20px", marginBottom: "36px" }}>
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
                    dateFormat="yyyy-MM-dd"
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
                    minDate={dayjs(watch("startDate")).add(1, "day").toDate()}
                    dateFormat="yyyy-MM-dd"
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
                    <MenuItem value="Maintainance_fees">Maintenance Fee</MenuItem>
                    <MenuItem value="Mess_fees">Mess Fee</MenuItem>
                    <MenuItem value="Security_Deposit">Security Money</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="number"
                placeholder="Monthly Charges"
                variant="outlined"
                fullWidth
                {...register("monthlyCharges")}
                error={!!errors.monthlyCharges}
                helperText={errors.monthlyCharges?.message}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="number"
                placeholder="No. of Months"
                variant="outlined"
                fullWidth
                {...register("noOfMonths")}
                error={!!errors.noOfMonths}
                helperText={errors.noOfMonths?.message}
                disabled
              />
            </Grid>
          </Grid>
          <Typography variant="h6" align="right" gutterBottom>
            Total: {total}
          </Typography>
          <Grid container justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginBottom: "20px" }}
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
            {result.length === 0 ? (
              <Grid item xs={12}>
                <Typography>No payment records found.</Typography>
              </Grid>
            ) : (
              result.map((payment) => (
                <React.Fragment key={payment.id}>
                  <Grid item xs={4}>
                    {payment.maintainance_fees && "Maintenance Fee"}
                    {payment.mess_fees && "Mess Fee"}
                    {payment.security_fees && "Security Money"}
                  </Grid>
                  <Grid item xs={4}>
                    {payment.from_date}
                  </Grid>
                  <Grid item xs={4}>
                    {payment.to_date}
                  </Grid>
                </React.Fragment>
              ))
            )}
          </Grid>
        </div>
      </div>
    </Container>
  );
}

export default HostelFeePayment;
