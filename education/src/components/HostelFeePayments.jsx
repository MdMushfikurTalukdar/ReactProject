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
  InputAdornment,
} from "@mui/material";
import { MdDateRange } from "react-icons/md";
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
      console.log(response.data);
      setFees(response.data);
    } catch (error) {
      console.error("Failed to fetch fees:", error);
    }
  };

  useEffect(() => {
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (response.exp < Math.floor(Date.now() / 1000)|| response.role!=="student" ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

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
      await axios.post(
        "https://amarnath013.pythonanywhere.com/api/user/mess-fees-payment/",
        {
          registration_details: fees.id,
          from_date: dayjs(data.startDate).format("YYYY-MM"),
          to_date: dayjs(data.endDate).format("YYYY-MM"),
          mess_fees: data.feeType === "Mess_fees" ? fees.Mess_fees : null,
          maintainance_fees:
            data.feeType === "Maintainance_fees"
              ? fees.Maintainance_fees
              : null,
          security_fees:
            data.feeType === "Security_Deposit" ? fees.Security_Deposit : null,
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
      const differenceInMonths = dayjs(watch("endDate")).diff(
        dayjs(watch("startDate")),
        "month"
      );
      setValue("noOfMonths", differenceInMonths, { shouldValidate: true });
      const feeType = watch("feeType");
      let monthlyCharge = 0;
      if (feeType === "Mess_fees") monthlyCharge = fees.Mess_fees;
      else if (feeType === "Maintainance_fees")
        monthlyCharge = fees.Maintainance_fees;
      else if (feeType === "Security_Deposit")
        monthlyCharge = fees.Security_Deposit;

      setValue("monthlyCharges", monthlyCharge, { shouldValidate: true });
      setTotal(differenceInMonths * monthlyCharge);
    }
  }, [watch("startDate"), watch("endDate"), watch("feeType"), setValue, fees]);

  return (
    <Container maxWidth="md">
      <Paper elevation={0} sx={{ p: { lg: 4, md: 4 }, mt: 4 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ marginBottom: "30px" }}
        >
          Hostel/Mess Fee Payment
        </Typography>
        <center style={{ marginBottom: "16px" }}>
          <img
            src="./images/payment.png"
            alt="Payment"
            style={{ width: "250px", marginLeft: "15px" }}
          />
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
            <Grid item xs={12}>
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
            <Grid item xs={6} sm={6} md={12} lg={12}>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={handleStartDateChange}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    customInput={
                      <TextField
                        label="Start Date"
                        variant="outlined"
                        fullWidth
                        error={!!errors.startDate}
                        helperText={errors.startDate?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <MdDateRange />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          width: {
                            lg: "320%",
                            md: "320%",
                            xs: "100%",
                            sm: "100%",
                          },
                        }}
                      />
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={12} lg={12}>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={handleEndDateChange}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    customInput={
                      <TextField
                        label="End Date"
                        variant="outlined"
                        fullWidth
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <MdDateRange />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          width: {
                            lg: "320%",
                            md: "320%",
                            xs: "100%",
                            sm: "100%",
                          },
                        }}
                      />
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="noOfMonths"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Number of Months"
                    variant="outlined"
                    fullWidth
                    error={!!errors.noOfMonths}
                    helperText={errors.noOfMonths?.message}
                    disabled
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="monthlyCharges"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Monthly Charges"
                    variant="outlined"
                    fullWidth
                    error={!!errors.monthlyCharges}
                    helperText={errors.monthlyCharges?.message}
                    disabled
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">Total Amount:</Typography>
                <Typography variant="h6">Rs: {total}/-</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#8ecccc" }}
                fullWidth
              >
                Request For Payment
              </Button>
            </Grid>
          </Grid>
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
          <Grid
            container
            spacing={1}
            className="shadow-xl mb-5 lg:p-5 md:p-5 p-2 rounded-lg "
            style={{ textAlign: "center" }}
          >
            {result.length !== 0 && (
              <>
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
              </>
            )}
            {result.length === 0 ? (
              <Grid item xs={12}>
                <center style={{ marginTop: "20px" }}>
                  <img src="./images/No_data.png" alt="" style={{width:"320px",borderRadius:"15px",marginRight:"15px"}}/>
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
