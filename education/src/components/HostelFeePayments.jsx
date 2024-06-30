import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Container,
  Grid,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";

const schema = yup.object().shape({
  feeType: yup.string().required("Fee Type is required"),
  noOfMonths: yup.number().required("Number of months is required"),
  monthlyCharges: yup
    .number()
    .min(0, "Must be a positive number")
    .required("Monthly Charges is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .when("startDate", (startDate, schema) =>
      startDate
        ? schema.min(
            dayjs(startDate).add(1, "month").toDate(),
            "End date cannot be before start date"
          )
        : schema
    )
    .required("End date is required"),
});

function HostelFeePayment() {
  const [profileData, setProfileData] = useState({
    registrationNo: "",
    name: "",
    branch: "",
  });

  const [fees, setFees] = useState({});
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://amarnath013.pythonanywhere.com/api/user/fees/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      setFees(response.data);
    } catch (error) {
      console.error("Failed to fetch fees:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accesstoken")) {
      const token = localStorage.getItem("accesstoken");
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "https://amarnath013.pythonanywhere.com/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
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
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://amarnath013.pythonanywhere.com/api/user/mess-fees-payment/",
        {
          registration_details: localStorage.getItem("id"),
          from_date: dayjs(data.startDate).format("YYYY-MM"),
          to_date: dayjs(data.endDate).format("YYYY-MM"),
          mess_fees: data.feeType === "Mess_fees" ? fees.Mess_fees : null,
          maintainance_fees:
            data.feeType === "Maintainance_fees"
              ? fees.Maintainance_fees
              : null,
          security_fees:
            data.feeType === "Security_Deposit" ? fees.Security_fees : null,
          total_fees: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      enqueueSnackbar("Payment request successful", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Payment request error:", error);
      enqueueSnackbar("Payment request failed", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `https://amarnath013.pythonanywhere.com/api/user/mess-fees-payment/?search=${localStorage.getItem(
            "RollNumber"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        setResult(response.data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const handleStartDateChange = (date) => {
    setValue("startDate", date, { shouldValidate: true });
  };

  const handleEndDateChange = (date) => {
    setValue("endDate", date, { shouldValidate: true });
  };

  useEffect(() => {
    if (watch("startDate") && watch("endDate")) {
      const differenceInMonths =
        dayjs(watch("endDate")).diff(dayjs(watch("startDate")), "month") + 1;
      setValue("noOfMonths", differenceInMonths, { shouldValidate: true });
      setTotal(differenceInMonths * watch("monthlyCharges"));
    }
  }, [watch, setValue]);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "1.7rem",
            marginBottom: "20px",
          }}
        >
          Hostel/Mess Fee Payment
        </p>
        <center style={{ marginBottom: "16px" }}>
          <img src="./images/payment.jpg" alt="" style={{ width: "250px" }} />
        </center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={profileData.name}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Registration No"
                variant="outlined"
                fullWidth
                value={profileData.registrationNo}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={12} md={12}>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={field.value}
                    minDate={new Date()}
                    dateFormat="yyyy-MM"
                    showMonthYearPicker
                    customInput={
                      <TextField
                        label="From"
                        variant="outlined"
                        sx={{
                          width: {
                            lg: "353%",
                            md: "353%",
                            xs: "100%",
                            sm: "130%",
                          },
                        }}
                      />
                    }
                  />
                )}
              />
              {errors.startDate && (
                <Typography color="error" variant="body2">
                  {errors.startDate.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} lg={12} md={12}>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={watch("startDate")}
                    endDate={field.value}
                    minDate={dayjs(watch("startDate")).add(1, "month").toDate()}
                    dateFormat="yyyy-MM"
                    showMonthYearPicker
                    customInput={
                      <TextField
                        label="To"
                        variant="outlined"
                        sx={{
                          width: {
                            lg: "353%",
                            md: "353%",
                            xs: "100%",
                            sm: "90%",
                          },
                        }}
                      />
                    }
                  />
                )}
              />
              {errors.endDate && (
                <Typography color="error" variant="body2">
                  {errors.endDate.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12} lg={12} md={12}>
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
                    <MenuItem value="Maintainance_fees">
                      Maintenance Fee
                    </MenuItem>
                    <MenuItem value="Mess_fees">Mess Fee</MenuItem>
                    <MenuItem value="Security_Deposit">Security Money</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
          <Box mt={2}>
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
          </Box>
        </form>
        <Box mt={4}>
          <p
            style={{
              textAlign: "center",
              fontSize: "1.3rem",
              marginBottom: "20px",
            }}
          >
            Previous Fee Payments
          </p>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Fee Type:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                From:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                To:
              </Typography>
            </Grid>
            {result.length === 0 ? (
              <Grid item xs={12}>
                <center style={{ marginTop: "20px" }}>
                  <p>No payment records found.</p>
                </center>
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
        </Box>
      </Paper>
    </Container>
  );
}

export default HostelFeePayment;


