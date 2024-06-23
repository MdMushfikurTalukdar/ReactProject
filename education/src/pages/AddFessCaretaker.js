import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
  TableContainer,
  Paper,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import NavbarNew from "../components/NavbarNew";
import Footer from "../components/Home/Footer";

// Validation schema using yup
const schema = yup.object().shape({
  Maintainance_fees: yup
    .number()
    .typeError("Maintenance Fees must be a number")
    .positive("Maintenance Fees must be positive")
    .required("Maintenance Fees is required"),
  Mess_fees: yup
    .number()
    .typeError("Mess Fees must be a number")
    .positive("Mess Fees must be positive")
    .required("Mess Fees is required"),
  Security_Deposit: yup
    .number()
    .typeError("Security Deposit must be a number")
    .positive("Security Deposit must be positive")
    .required("Security Deposit is required"),
});

const AddFeesCaretaker = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset, // Reset function from react-hook-form
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [result, setResult] = useState([]);
  const [editId, setEditId] = useState(null); // State to hold the id of the fee being edited
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        response.role !== "caretaker"
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: "get",
          url: "https://amarnath013.pythonanywhere.com/api/user/fees/",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        };

        const response = await axios.request(config);
        setResult(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData here to fetch data when component mounts
  }, []);

  const onSubmit = async (data) => {
    const jsonData = JSON.stringify(data);

    try {
      let config;
      if (editId) {
        config = {
          method: "put",
          url: `https://amarnath013.pythonanywhere.com/api/user/fees/update/${editId}/`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
          data: jsonData,
        };
      } else {
        config = {
          method: "post",
          url: "https://amarnath013.pythonanywhere.com/api/user/fees/create/",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
          data: jsonData,
        };
      }

      const response = await axios.request(config);
      console.log(response.data);

      enqueueSnackbar("Data added successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });

      // Clear form and reset editId state after submission
      reset();
      setEditId(null);

      // Fetch updated data after submission
      setTimeout(()=>{
        window.location.reload();
      },1500)
    } catch (error) {
      console.error("Error adding/updating data:", error);
    }
  };

  const handleEdit = (feeId) => {
    // Find the fee with feeId in result state and populate the form fields
   
      reset({
        Maintainance_fees: result.Maintainance_fees,
        Mess_fees: result.Mess_fees,
        Security_Deposit: result.Security_Deposit,
      });
      setEditId(feeId);
    
  };

  return (
    <>
      <NavbarNew />
      <Container maxWidth="sm" style={{ marginBottom: "11%" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ marginTop: "20px", marginBottom: "36px" }}
        >
          Add Fees
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="Maintainance_fees"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Maintenance Fees"
                    variant="outlined"
                    fullWidth
                    error={!!errors.Maintainance_fees}
                    helperText={errors.Maintainance_fees?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="Mess_fees"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Mess Fees"
                    variant="outlined"
                    fullWidth
                    error={!!errors.Mess_fees}
                    helperText={errors.Mess_fees?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="Security_Deposit"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Security Deposit"
                    variant="outlined"
                    fullWidth
                    error={!!errors.Security_Deposit}
                    helperText={errors.Security_Deposit?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {editId ? "Update" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box style={{ marginTop: "20px" }}>
          <Divider />
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Previous Fees Structure
          </p>
        </Box>

        {result.length === 0 ? (
          <Typography variant="body1" align="center">
            You have not added any fees structure.
          </Typography>
        ) : (
          <Box>
            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
              <Table sx={{ minWidth: "auto" }} aria-label="Fees table">
                <TableHead style={{ backgroundColor: "#D2E9E9" }}>
                  <TableRow>
                    <TableCell>Maintenance</TableCell>
                    <TableCell>Mess </TableCell>
                    <TableCell>Security</TableCell>
                    <TableCell>Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow key={result.id}>
                      <TableCell>{result.Maintainance_fees}</TableCell>
                      <TableCell>{result.Mess_fees}</TableCell>
                      <TableCell>{result.Security_Deposit}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEdit(result.id)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default AddFeesCaretaker;
