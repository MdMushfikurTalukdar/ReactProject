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
  CircularProgress,
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
import { BaseUrl } from "./BaseUrl";
import { CiUser } from "react-icons/ci";
import { PiIdentificationBadgeThin, PiMoneyWavy } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

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
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
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
    if (localStorage.getItem("accesstoken") !== null) {
      try {
        const response = await axios.get(`${BaseUrl}/fees/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        });
        console.log(response.data);
        setLoading(false);
        setFees(response.data);
      } catch (error) {
        console.error("Failed to fetch fees:", error);
        if (error?.response?.data?.message === "ID does not Exists") {
          enqueueSnackbar("Fees Structure is not added by caretaker", {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 3000,
          });
          navigate("/dashboard");
        }
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        response.role !== "student"
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("accesstoken") !== null) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BaseUrl}/hostel-room-allotments/?search=${
          jwtDecode(localStorage?.getItem("accesstoken"))?.registration_number
        }`,
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("accesstoken")}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setId(response?.data?.[0]?.id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("accesstoken") !== null) {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(`${BaseUrl}/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
              "Content-Type": "application/json",
            },
          });
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
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/mess-fees-payment/`,
        {
          registration_details: id,
          from_date: dayjs(data.startDate).format("YYYY-MM"),
          to_date: dayjs(data.endDate).format("YYYY-MM"),
          // mess_fees: data.feeType === "Mess_fees" ? fees.Mess_fees : null,
          fee_type: data.feeType,
          //   data.feeType === "Maintainance_fees"
          //     ? fees.Maintainance_fees
          //     : null,
          // security_fees:
          //   data.feeType === "Security_Deposit" ? fees.Security_Deposit : null,
          total_fees: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      console.log(response);
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
      if (
        error?.response?.data?.errors?.detail ===
        "Given token not valid for any token type"
      ) {
        enqueueSnackbar("Logging out", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });
        navigate("/login");
      }
      enqueueSnackbar("Caretaker have not alloted a room to you yet.", {
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
          `${BaseUrl}/mess-fees-payment/?search=${
            jwtDecode(localStorage?.getItem("accesstoken"))?.registration_number
          }`,
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

  console.log(fees);
  useEffect(() => {
    if (watch("startDate") && watch("endDate")) {
      const differenceInMonths = dayjs(watch("endDate")).diff(
        dayjs(watch("startDate")),
        "month"
      );
      setValue("noOfMonths", differenceInMonths, { shouldValidate: true });
      const feeType = watch("feeType");
      let monthlyCharge = 0;
      if (feeType === "mess_fee") monthlyCharge = fees.Mess_fees;
      else if (feeType === "maintainance_fee")
        monthlyCharge = fees.Maintainance_fees;
      else if (feeType === "security_fee")
        monthlyCharge = fees.Security_Deposit;

      setValue("monthlyCharges", monthlyCharge, { shouldValidate: true });
      setTotal(differenceInMonths * monthlyCharge);
    }
  }, [watch("startDate"), watch("endDate"), watch("feeType"), setValue, fees]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box elevation={0} sx={{ p: { lg: 1, md: 1 ,xs:0}, mt: 3 }}>
        <p
          style={{
            marginBottom: "50px",
            textAlign: "center",
            fontSize: "1.4rem",
          }}
        >
          Hostel/Mess Fee Payment
        </p>
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "block",
              md: "none",
              lg: "none",
            },
            marginBottom:"10px"
          
          }}
        >
          <center style={{ marginBottom: "35px" }}>
            <img
              src="./images/payment1.png"
              alt="Payment"
              style={{ width: "300px", marginLeft: "0px", borderRadius: "5px" }}
            />
          </center>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box
              sx={{
                backgroundColor: {xs:"rgb(243 244 246)",lg:"transparent",md:"transparent",sm:"transparent"},
                padding: {lg:"0px",md:"0px",xs:"15px",sm:"0px"},
                marginTop: {lg:"42px",md:"42px",xs:"29px",sm:"29px"},
               
                borderRadius: "8px"
              }}
            >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginTop:{
                        xs:"3px",lg:"0px",sm:"0px",md:"0px"
                      }
                    }}
                    value={profileData.name}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CiUser />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Registration No"
                    variant="outlined"
                    fullWidth
                    value={profileData.registrationNo}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PiIdentificationBadgeThin />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="feeType"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PiMoneyWavy />
                            </InputAdornment>
                          ),
                        }}
                        select
                        label="Fee Type"
                        variant="outlined"
                        fullWidth
                        error={!!errors.feeType}
                        helperText={errors.feeType?.message}
                      >
                        <MenuItem value="maintainance_fee">
                          Maintenance Fee
                        </MenuItem>
                        <MenuItem value="mess_fee">Mess Fee</MenuItem>
                        <MenuItem value="security_fee">Security Money</MenuItem>
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
                        minDate={new Date()}
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
                                lg: "225%",
                                md: "calc(100vw - 55vw)",
                                xs: "100%",
                                sm: "46vw",
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
                                lg: "225%",
                                md: "calc(100vw - 55vw)",
                                xs: "100%",
                                sm: "46vw",
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
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IoMdTime />
                            </InputAdornment>
                          ),
                        }}
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
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <RiMoneyRupeeCircleLine />
                            </InputAdornment>
                          ),
                        }}
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
            </Box>
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
                className=" mb-5 lg:p-5 md:p-5 p-2 rounded-lg "
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
                      <img
                        src="./images/No_data.png"
                        alt=""
                        style={{
                          width: "280px",
                          borderRadius: "15px",
                          
                        }}
                      />
                    </center>
                  </Grid>
                ) : (
                  result.map((payment) => (
                    <React.Fragment key={payment.id}>
                      <Grid item xs={4}>
                        {payment.fee_type === "maintainance_fee" &&
                          "Maintenance Fee"}
                        {payment.fee_type === "mess_fee" && "Mess Fee"}
                        {payment.fee_type === "security_fee" &&
                          "Security Money"}
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
          </Grid>
          <Grid
          item lg={6} md={6} xs={12} sm={12}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
              },
              
            }}
          >
            <center style={{ marginBottom: "16px" }}>
              <img
                src="./images/payment1.png"
                alt="Payment"
                style={{
                  width: "430px",
                  marginTop:"25px",
                  borderRadius: "5px",
                 
                }}
              />
            </center>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default HostelFeePayment;
