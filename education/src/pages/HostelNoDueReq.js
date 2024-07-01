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
  Paper,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import Footer from "../components/Home/Footer";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

// Validation schema
const schema = yup.object().shape({
  semester: yup.string().required("Semester is required"),
  declaration: yup.bool().oneOf([true], "Declaration must be accepted"),
});

export const HostelNoDueReq = () => {
  const [result, setResult] = useState([]);
  const [responsive, setResponsive] = useState(window.innerWidth < 669);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
 
  const [maintainanceToDate, setMaintainanceToDate] = useState(null);
  const [messToDate, setMessToDate] = useState(null);

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
      const payments = response.data.reverse();
      setLoading(false);
      const maintainancePayment = payments.find(payment => payment.maintainance_fees !== null);
      const messPayment = payments.find(payment => payment.mess_fees !== null);

      if (maintainancePayment) {
        setMaintainanceToDate(maintainancePayment.to_date);
      }
      if (messPayment) {
        setMessToDate(messPayment.to_date);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
    const resize = () => {
      setResponsive(window.innerWidth < 669);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);



  const onSubmit = (data) => {

    if(maintainanceToDate===null || messToDate===null)
    {
      return enqueueSnackbar("Have not paid Maintainance or Mess", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    }

    let data1 = JSON.stringify({
      "semester": data.semester,
      "maintenance_fees_date": maintainanceToDate,
      "mess_fees_date": messToDate,
      "self_declaration": true
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://amarnath013.pythonanywhere.com/api/user/hostel-no-dues/',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${localStorage?.getItem('accesstoken')}`
      },
      data : data1
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));

      enqueueSnackbar("Request Sent Successfully", {
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

  useEffect(()=>{
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://amarnath013.pythonanywhere.com/api/user/hostel-no-dues/?search=${localStorage?.getItem('RollNumber')}`,
      headers: { 
        'Authorization': `Bearer ${localStorage?.getItem('accesstoken')}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setResult(response?.data);
      setLoading1(false);
    })
    .catch((error) => {
      console.log(error);
    });
  },[]);

  if (loading || loading1) {
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
    <div className="container-fluid" style={{ backgroundColor: "whitesmoke" }}>
      <NavbarNew />
      <Box
        className="bonafide-form"
        sx={{
          padding: 3,
          bgcolor: "whitesmoke",
          borderRadius: 2,
          maxWidth: 800,
          margin: "auto",
          marginTop:"20px"
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" style={{ marginBottom: "15px",textAlign:"center" }}>
            Hostel No Due Request
          </Typography>
          <Typography variant="h6" gutterBottom>
            Registration/Employee No:
          </Typography>
          <Typography variant="p" gutterBottom>
            {localStorage?.getItem('RollNumber')}
          </Typography>
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.semester?.message}
          >
            <InputLabel id="semester-label">Semester</InputLabel>
            <Select
              labelId="semester-label"
              id="semester"
              label="Semester"
              {...register("semester")}
              defaultValue=""
            >
              <MenuItem value="semester 1">
                semester 1
              </MenuItem>
             
              <MenuItem value="semester 2">
                semester 2
              </MenuItem>
              <MenuItem value="semester 3">
                semester 3
              </MenuItem>
              <MenuItem value="semester 4">
                semester 4
              </MenuItem>
              <MenuItem value="semester 5">
                semester 5
              </MenuItem>
              <MenuItem value="semester 6">
                semester 6
              </MenuItem>
              <MenuItem value="semester 7">
                semester 7
              </MenuItem>
              <MenuItem value="semester 8">
                semester 8
              </MenuItem>
            </Select>
            {errors.semester && (
              <FormHelperText>{errors.semester.message}</FormHelperText>
            )}
          </FormControl>

          <Typography
            variant="h6"
            gutterBottom
            style={{ marginBottom: "10px" }}
          >
            Maintenance Fee paid up to:
          </Typography>
          <Typography
            variant="p"
            gutterBottom
            style={{ marginBottom: "20px" }}
          >
            {maintainanceToDate ? maintainanceToDate:"Have not paid"}
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            style={{ marginBottom: "10px" }}
          >
            Mess Fee paid up to:
          </Typography>
          <Typography
            variant="p"
            gutterBottom
            style={{ marginBottom: "50px" }}
          >
            {messToDate ? messToDate:"Have not paid"}
          </Typography>

          <FormControl
            error={!!errors.declaration?.message}
            component="fieldset"
            margin="normal"
          >
            <Box display="flex" alignItems="center">
              <Checkbox {...register("declaration")} />
              <Typography variant="body1" style={{ marginBottom: "10px" }}>
                I declare that my payments are cleared up to the asked month and
                the payment record shown here is correct.
              </Typography>
            </Box>
            {errors.declaration && (
              <FormHelperText>{errors.declaration.message}</FormHelperText>
            )}
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              marginTop: "5px",
              backgroundColor: "rgb(107, 169, 169)",
              color: "#fff",
              "&:hover": { backgroundColor: "rgb(85, 136, 136)" },
            }}
          >
            Send Request
          </Button>
        </form>
        <Divider sx={{ my: 3, color: "black", width: "100%" }} />
        <Typography variant="h6" gutterBottom>
          Approved No Dues Request
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {result.length === 0 && (
            <Typography
              style={{
                marginBottom: "50px",
                marginTop: "30px",
                fontSize: "1.2rem",
              }}
            >
              <center>
            <img src="./images/No_data.png" alt="" style={{width:"250px",borderRadius:"10px"}}/>
          </center>
            </Typography>
          )}

          {responsive ? (
            result.length > 0 &&
            result.map((data, index) => (
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
                      No Dues Details
                    </Typography>
                    <Typography variant="body2" component="div">
                    semester: {data?.semester}
                    </Typography>
                    <Typography variant="body2">
                      Requested Date: {data?.requested_date}
                    </Typography>
                    <Typography variant="body2">
                      Approved Date: {data?.approved_date===null ? "Not approved yet":data?.approved_date}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))
          ) : (
            <Box>
              {result.length > 0 ? (
                <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="no due table">
                    <TableHead style={{ backgroundColor: "#D2E9E9" }}>
                      <TableRow>
                        <TableCell>Semester</TableCell>
                        <TableCell>Requested Date</TableCell>
                        <TableCell>Approved Date</TableCell>
                       
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {result.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{data?.semester}</TableCell>
                          <TableCell>{data?.requested_date}</TableCell>
                         
                          <TableCell>{data?.approved_date===null ? "Not approved yet":data?.approved_date}</TableCell>
                         
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
      <Box style={{ width: "100vw" }}>
        <Footer />
      </Box>
    </div>
  );
};
