import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import NavbarNew from "../components/NavbarNew";
import { Box, Button, Divider, Typography, Select, MenuItem, FormControl, InputLabel, TextField, FormHelperText, TableCell, TableRow, TableBody, TableContainer, Table, TableHead, Paper, CardContent, Card } from "@mui/material";
import { Footer } from "../components/Footer";
import '../App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

// Validation schema
const schema = yup.object().shape({
  purpose: yup.string().required('Purpose is required'),
  toDate: yup.string().required('To date is required'),
  numberOfPersons: yup.number().required('Number of persons is required').min(1, 'At least 1 person').typeError('Number of persons is required')
});

export const GuestRoom = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const today = new Date().toISOString().split('T')[0];
  const [from, setFrom] = useState('');
  const [fromError, setFromError] = useState('');
  const [result, setResult] = useState([]);
  const [responsive, setResponsive] = useState(window.innerWidth < 669);

  useEffect(() => {
    const resize = () => {
      setResponsive(window.innerWidth < 669);
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://amarnath013.pythonanywhere.com/api/user/guest-room-allotments/',
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        },
      };
      try {
        const response = await axios.request(config);
        setResult(response.data.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    let requestData = JSON.stringify({
      "user": jwtDecode(localStorage?.getItem("accesstoken")).user_id,
      "purpose_of_request": data.purpose,
      "from_date": from,
      "to_date": data.toDate,
      "no_of_persons": data.numberOfPersons
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://amarnath013.pythonanywhere.com/api/user/guest-room-allotments/',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
      },
      data: requestData
    };

    try {
      await axios.request(config);
      enqueueSnackbar('Guest room allotment request was successfully created', {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <NavbarNew />
      <Box className="bonafide-form" sx={{ padding: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom style={{color: "rgb(107 169 169)"}}>
          Guest Room Allotment Request
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <Typography variant="h6">Registration number</Typography>
            <Typography variant="body1" style={{ marginBottom: "5px" }}>{localStorage?.getItem('RollNumber')}</Typography>
          </FormControl>

          <FormControl variant="outlined" error={!!errors?.purpose?.message} fullWidth>
            <InputLabel id="purpose-label">Purpose of requesting</InputLabel>
            <Controller
              name="purpose"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="purpose-label"
                  id="purpose"
                  label="Select Purpose"
                  {...field}
                  defaultValue=""
                >
                  <MenuItem value="for staying parents">For staying parents</MenuItem>
                  <MenuItem value="for staying relatives">For staying relatives</MenuItem>
                  <MenuItem value="for staying invited delegate">For staying invited delegate</MenuItem>
                  <MenuItem value="for staying alumni">For staying Alumni</MenuItem>
                </Select>
              )}
            />
            {errors.purpose && <FormHelperText>{errors.purpose?.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="normal">
            <TextField
              id="fromDate"
              label="From"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: today,
              }}
              onChange={(e) => {
                setFrom(e.target.value);
                setFromError('');
              }}
              variant="outlined"
              fullWidth
            />
            <p style={{color:"red",fontSize:"0.75rem",fontWeight:"400"}}>{fromError}</p>
          </FormControl>
          
          <FormControl fullWidth variant="outlined" margin="normal">
            <TextField
              id="toDate"
              label="To"
              type="date"
              {...register("toDate")}
              inputProps={{
                min: from,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.toDate}
              helperText={errors.toDate?.message}
              variant="outlined"
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.numberOfPersons?.message}>
            <InputLabel id="numberOfPersons-label">Number of Persons</InputLabel>
            <Controller
              name="numberOfPersons"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="numberOfPersons-label"
                  id="numberOfPersons"
                  label="Number of Persons"
                  {...field}
                  defaultValue=""
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              )}
            />
            {errors.numberOfPersons && <FormHelperText>{errors.numberOfPersons.message}</FormHelperText>}
          </FormControl>

          <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '16px', backgroundColor: "rgb(107,169,169)" }}>
            Send Request
          </Button>
        </form>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom style={{color: "rgb(107 169 169)"}}>
          Approved Requests
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {result.length === 0 && (
            <p style={{ marginBottom: "50px", marginTop: "100px", fontSize: "1.2rem" }}>
              Nothing to show
            </p>
          )}

          {responsive ? (
            result.length > 0 ? (
              result.map((data, index) => (
                data.registration_number === localStorage.getItem('RollNumber') && (
                  <Box key={index}>
                    <Card
                      sx={{
                        minWidth: 275,
                        marginBottom: 2,
                        backgroundColor: "#D2E9E9",
                      }}
                    >
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Hostel Request Details
                        </Typography>
                        <Typography variant="h6" component="div">
                          Purpose Of Request: {data?.purpose_of_request}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          From Date: {data?.from_date}
                        </Typography>
                        <Typography variant="body2">
                          To Date: {data?.to_date}
                        </Typography>
                        <Typography variant="body2">
                          No Of Persons: {data?.no_of_persons}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                )
              ))
            ) : (
              <p style={{ marginBottom: "50px", marginTop: "100px", fontSize: "1.2rem" }}>
                No matching records found
              </p>
            )
          ) : (
            <Box>
              {result.length > 0 ? (
                <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="hostel requests table">
                    <TableHead style={{ backgroundColor: "#D2E9E9" }}>
                      <TableRow>
                        <TableCell>Purpose Of Request</TableCell>
                        <TableCell>From Date</TableCell>
                        <TableCell>To Date</TableCell>
                        <TableCell>No of Persons</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {result.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{data?.purpose_of_request}</TableCell>
                          <TableCell>{data?.from_date}</TableCell>
                          <TableCell>{data?.to_date}</TableCell>
                          <TableCell>{data?.no_of_persons}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : null}
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </div>
  );
};
