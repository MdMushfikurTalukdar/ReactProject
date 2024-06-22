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
      if (response.exp < Math.floor(Date.now() / 1000)) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

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
    console.log(data);
    enqueueSnackbar("Request sent successfully", { variant: "success" });
  };

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
            16900120124
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
            15th Aug, 2024
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
            15th Aug, 2024
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
                marginTop: "100px",
                fontSize: "1.2rem",
              }}
            >
              Nothing to show
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
                    <Typography variant="h6" component="div">
                      No Due Number: {data?.no_due_number}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Student Information
                    </Typography>
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
            ))
          ) : (
            <Box>
              {result.length > 0 ? (
                <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="no due table">
                    <TableHead style={{ backgroundColor: "#D2E9E9" }}>
                      <TableRow>
                        <TableCell>No Due Number</TableCell>
                        <TableCell>Applied For</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Applied Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {result.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{data?.no_due_number}</TableCell>
                          <TableCell>{data?.required_for}</TableCell>
                          <TableCell>{data?.status}</TableCell>
                          <TableCell>{data?.applied_date}</TableCell>
                          <TableCell>
                            <Typography variant="body2" color="textSecondary">
                              N/A
                            </Typography>
                          </TableCell>
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
