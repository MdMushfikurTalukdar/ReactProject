import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  CardContent,
  Card,
  Box,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TableFooter,
  TablePagination,
  useTheme
} from "@mui/material";

import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { enqueueSnackbar } from "notistack";
import NavbarNew from "../NavbarNew";
import Footer from "../Home/Footer";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

// Validation schema
const schema = yup.object().shape({
  
  checkbox: yup
    .boolean()
    .oneOf([true], "Please agree to the terms and conditions"),
});

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export function NoDuesForDegree() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const [result, setResult] = useState([]);
  const [responsive, setResponsive] = useState(window.innerWidth < 669);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setResponsive(window.innerWidth < 669);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setResponsive(window.innerWidth < 669);
      });
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://amarnath013.pythonanywhere.com/api/user/profile/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        setUserProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "https://amarnath013.pythonanywhere.com/api/user/overall-no-dues/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        setResult(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (localStorage.getItem("accesstoken")) {
      const decodedToken = jwtDecode(localStorage.getItem("accesstoken"));
      if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
        navigate("/login");
      } else {
        fetchData();
        fetchRequests();
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const requestData = {
      name: `${userProfile?.personal_information?.first_name} ${userProfile?.personal_information?.last_name}`,
      branch: userProfile?.academic_information?.branch,
      father_name: userProfile?.personal_information?.father_name,
      category: userProfile?.academic_information?.category,
      self_declaration: true,
      status: "applied",
      session: userProfile?.academic_information?.session,
    };

    try {
      const response = await axios.post(
        "https://amarnath013.pythonanywhere.com/api/user/overall-no-dues/",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );

      setTimeout(() => {
        window.location.reload();
      }, 2000);

      enqueueSnackbar("Request was applied successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("The request has already been made.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  return (
    <div className="container-fluid" style={{ backgroundColor: "whitesmoke" }}>
      <NavbarNew />
      <Box
        className="no-dues-form"
        sx={{ bgcolor: "whitesmoke", borderRadius: 3, padding: 3 }}
      >
        <Grid container>
          <Grid item xs={12} md={6} lg={6}>
            <Typography
              variant="h5"
              sx={{ marginBottom: "1px", textAlign: "center" }}
            >
              Overall No Dues Request (For TC)
            </Typography>

            <Grid
            item
            xs={12}
            
            sm={12}
            sx={{
              display: { xs: "block", md: "none", lg: "none", sm: "block" },
            }}
          >
            <Box sx={{ marginTop: { lg: "5%", md: "15%",textAlign:"center"  } }}>
              <img
                src="./images/NoDues.png"
                alt=""
                style={{ width: "230px", marginLeft: "0%",marginTop:"20%",}}
              />
            </Box>
          </Grid>



            <Box
              sx={{
                marginLeft: { lg: "20%", md: "20%" },
                marginTop: { lg: "60px", md: "40px" },
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginTop: "10px",fontSize:"1rem" }}
                >
                  Name
                </Typography>

                <TextField
                  type="text"
                  value={`${userProfile?.personal_information?.first_name} ${userProfile?.personal_information?.middle_name} ${userProfile?.personal_information?.last_name}`}
                  sx={{
                    width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
                  }}
                  disabled
                />

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginTop: "10px",fontSize:"1rem" }}
                >
                  Registration Number
                </Typography>
                <TextField
                  type="text"
                  value={userProfile?.personal_information?.registration_number}
                  sx={{
                    width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
                  }}
                  disabled
                />

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginTop: "10px",fontSize:"1rem" }}
                >
                  Branch
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    value={userProfile?.academic_information?.branch || ""}
                    disabled
                    placeholder="Branch"
                    sx={{
                      width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
                    }}
                  />
                  <FormHelperText>{errors.branch?.message}</FormHelperText>
                </FormControl>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginTop: "10px",fontSize:"1rem" }}
                >
                  Father's Name
                </Typography>

                <TextField
                  type="text"
                  value={userProfile?.personal_information?.father_name}
                  sx={{
                    width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
                  }}
                  disabled
                  placeholder="Father name"
                />

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginTop: "10px",fontSize:"1rem" }}
                >
                  Session
                </Typography>

                <TextField
                  type="text"
                  value={userProfile?.academic_information?.session}
                  sx={{
                    width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
                  }}
                  placeholder="Session"
                  disabled
                />
                <FormHelperText style={{ color: "red" }}>
                  {errors?.Session?.message}
                </FormHelperText>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ marginTop: "10px",fontSize:"1rem" }}
                >
                  Category
                </Typography>
                <FormControl
                  sx={{
                    width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
                  }}
                  variant="outlined"
                  margin="normal"
                  error={!!errors.Category?.message}
                >
                  <TextField  
                  value={userProfile?.academic_information?.category}
                  disabled
                  />
                 
                </FormControl>
                <br />

              
                <FormControlLabel
                  control={
                    <Checkbox name="checkbox" {...register("checkbox")} />
                  }
                  sx={{marginTop:"15px"}}
                  label="I declare that all these information are correct and I have no dues in any department/section as per my knowledge."
                />
                {errors.checkbox && (
                  <FormHelperText error>
                    {errors.checkbox.message}
                  </FormHelperText>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    marginTop: "15px",
                    backgroundColor: "rgb(107, 169, 169)",
                    color: "#fff",
                    "&:hover": { backgroundColor: "rgb(85, 136, 136)" },
                    width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
                  }}
                >
                  Send Request
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            sm={12}
            sx={{
              display: { xs: "none", md: "block", lg: "block", sm: "none" },
            }}
          >
            <Box sx={{ marginTop: { lg: "5%", md: "15%" } }}>
              <img
                src="./images/NoDues.png"
                alt=""
                style={{ width: "55%", marginLeft: "15%",marginTop:"20%" }}
              />
            </Box>
          </Grid>
        </Grid>

        {responsive && (
          <Box>
            <div style={{ marginTop: "25px" }}>
              <Divider sx={{ width: "90vw" }} />
              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontSize: "1.2rem",
                }}
              >
                Previous Requests
              </p>
            </div>
          </Box>
        )}
        {responsive ? (
          result.length > 0 && (
               result.map((data, index) => (
            <Box key={index} style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",maxWidth:"100%",marginTop:"20px"}}>
              <Card
                sx={{
                  minWidth: 275,
                  width:'60vw',
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
                    Request Details
                  </Typography>
                  <Typography variant="body2">
                    Registration Number: {data?.registration_number}
                  </Typography>
                  <Typography variant="h6" component="div">
                    Name: {data?.name}
                  </Typography>
                  <Typography variant="body2">Status: {data?.status}</Typography>
                </CardContent>
              </Card>
            </Box>
          
        )))) : (
          <Grid container>
            <Grid
              item
              lg={6}
              md={4}
              sx={{
                display: { xs: "none", sm: "none", md: "block", lg: "block" },
              }}
            ></Grid>
            <Grid
              item
              lg={6}
              md={8}
              sm={12}
              sx={{
                display: { xs: "none", sm: "block", md: "block", lg: "block" },
              }}
            >
              <Box sx={{ marginTop: 5 }}>
                <Divider style={{ fontWeight: "bold" }} />

                <p style={{ marginTop: "20px", textAlign: "center",marginBottom:"20px" }}>
                  Previous Requests
                </p>
                {result.length > 0 ? (
                <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                  <TableHead style={{ backgroundColor: "#D2E9E9" }}>
                    <TableRow>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center"> Registration Number</TableCell>
                      <TableCell align="center">Status</TableCell>
                    
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? result.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : result
                    ).map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" style={{ width: 160 }} scope="row" align="center">
                          {row.name}
                        </TableCell>
                        <TableCell  align="center" style={{ width: 160 }}>
                          {row.registration_number}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="center">
                          {row.status}
                        </TableCell>
                       
                      </TableRow>
                    ))}

                    {result.length === 0 && (
                      <TableRow style={{ height: 53 * rowsPerPage }}>
                        <TableCell colSpan={6}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            align="center"
                          >
                            No request history available.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter style={{ backgroundColor: "#D2E9E9" }}>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={6}
                        count={result.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
                ) : (
                  <Typography
                    style={{
                      marginBottom: "50px",
                      marginTop: "100px",
                      fontSize: "1.2rem",
                      textAlign: "center",
                    }}
                  >
                    Nothing to show
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      <Footer />
    </div>
  );
}

export default NoDuesForDegree;
