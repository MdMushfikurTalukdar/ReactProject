import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import NavbarNew from "../components/NavbarNew";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Cookies from 'js-cookie';
import {
  Box,
  Button,
  Divider,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import  Footer  from "../components/Home/Footer";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";

// Validation schema
const schema = yup.object().shape({
  // Add your validation schema here
  purpose: yup.string().required("Purpose is required"),
  file: yup
    .mixed()
    .test("fileRequired", "File is required", (value) => {
      return !!value.length;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      return (
        !value ||
        (value.length > 0 &&
          ["image/jpeg", "image/png"].includes(value[0].type))
      );
    }),
  fee: yup.string(),
});

export const BonafideForm = () => {
  const [result, setResult] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [responsive, setResponsive] = useState(
    window.innerWidth < 669 ? true : false
  ); 
  
  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const resize = () => {
    setResponsive(window.innerWidth < 669 ? true : false);
  };



  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://amarnath013.pythonanywhere.com/api/user/bonafide/?search=${localStorage.getItem('RollNumber')}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setResult(response.data.reverse());
       
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (data) => {

    const formData=new FormData();
    formData.append('file',data.file[0]);
    // console.log(data);

    let data1 = JSON.stringify({
      college: 1,
      student: jwtDecode(localStorage?.getItem("accesstoken")).user_id,
      roll_no: jwtDecode(localStorage?.getItem("accesstoken")).user_id,
      required_for: data.purpose,
      status: "pending",
      supporting_document: formData,
      fee_structure: "false",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/bonafide/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
      },
      data: data1,
    };

    axios
      .request(config)
      .then((response) => {

        enqueueSnackbar('Request sent successfully', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          autoHideDuration: 1000,
        });

        setTimeout(()=>{
            window.location.reload();
        },3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "whitesmoke" }}>
      <NavbarNew />
      <Box
        className="bonafide-form"
        sx={{ padding: 3, bgcolor: "whitesmoke", borderRadius: 2 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" gutterBottom>
            Purpose
          </Typography>
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.purpose?.message}
          >
            <InputLabel id="purpose-label">Select Purpose</InputLabel>
            <Select
              labelId="purpose-label"
              id="purpose"
              label="Select Purpose"
              {...register("purpose")}
              defaultValue=""
            >
              <MenuItem value="credit card">Apply for student credit card</MenuItem>
              <MenuItem value="scholarship">Apply for Scholarship</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
            {errors.purpose && (
              <FormHelperText>{errors.purpose.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.file?.message}>
            <Typography
              variant="h6"
              gutterBottom
              style={{ marginBottom: "10px" }}
            >
              Supporting Document
            </Typography>

            <Button
              component="label"
              variant="contained"
              sx={{
                marginTop:"5px",
                marginBottom:"5px",
                backgroundColor: "rgb(107, 169, 169)",
                color: "#fff",
                "&:hover": { backgroundColor: "rgb(85, 136, 136)" },
              }}
            >
              <input
                type="file"
                name="file"
                {...register("file")}
                style={{ paddingBottom: "28px", display: "none" }}
              />
              Upload File
            </Button>
            {errors?.file && (
              <FormHelperText>{errors?.file?.message}</FormHelperText>
            )}
          </FormControl>
          <Typography variant="h6" gutterBottom>
            Do you want fee structure also?
          </Typography>
          <Box style={{ display: "flex", gap: "10px" }}>
            <label>
              <input type="radio" name="option" value="yes" /> Yes
            </label>
            <label>
              <input type="radio" name="option" value="yes" /> No
            </label>
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              marginTop:"5px",
              backgroundColor: "rgb(107, 169, 169)",
              color: "#fff",
              "&:hover": { backgroundColor: "rgb(85, 136, 136)" },
            }}
          >
            Send Request
          </Button>
        </form>
        <Divider sx={{ my: 3, color: "black", width: "100vw" }} />
        <Typography variant="h6" gutterBottom>
          Approved Bonafides
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {result.length === 0 && (
            <p style={{ marginBottom: "50px" }}>Nothing to show</p>
          )}


          {responsive ?( result.length > 0 &&
            result.map((data, index) => (
             
              <Box key={index}>
                
                <Card sx={{ minWidth: 275, marginBottom: 2,backgroundColor:"#D2E9E9" }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Bonafide Details
                    </Typography>
                    <Typography variant="h6" component="div">
                      Bonafide Number: {data?.bonafide_number}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Student Information
                    </Typography>
                    {/* <Typography variant="body2">
                      Name: {data?.student_details?.first_name}{" "}
                      {data?.student_details?.last_name}
                    </Typography> */}
                    <Typography variant="body2">
                      Applied For: {data?.required_for}
                    </Typography>
                    <Typography variant="body2">
                      Status: {data?.status}
                    </Typography>
                    <Typography variant="body2">
                      Applied Date: {data?.applied_date}
                    </Typography>
                  </CardContent>
                </Card>
                  
              </Box>
           
          ))):(<Box>
            {result.length > 0 ? (
              <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="bonafide table">
                  <TableHead style={{backgroundColor:"#D2E9E9"}}>
                    <TableRow>
                      <TableCell>Bonafide Number</TableCell>
                      <TableCell>Applied For</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Applied Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{data?.bonafide_number}</TableCell>
                        <TableCell>{data?.required_for}</TableCell>
                        <TableCell>{data?.status}</TableCell>
                        <TableCell>{data?.applied_date}</TableCell>
                        <TableCell>
                          {data?.status === 'approved' ? (
                            <Button size="small" variant="contained" color="primary">
                              View
                            </Button>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              N/A
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
             null 
            )}
          </Box>)}
        </Box>
      </Box>
      <Box style={{ width: "100vw" }}>
        <Footer />
      </Box>
    </div>
  );
};

export default BonafideForm;
