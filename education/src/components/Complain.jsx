import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  IconButton,
  Card,
  CardContent,
  TableHead,
  useTheme,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavbarNew from "../components/NavbarNew";
import Footer from "../components/Home/Footer";

const settings = {
  infinite: true,
  speed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
};
const complaintSchema = yup.object().shape({
  type: yup.string().required("Complaint type is required"),
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
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

const slides = [
  {
    image: "complaints.jpg",
    title: "Welcome to Smart Campus",
    subtitle: "Your journey to excellence starts here",
  },
  {
    image: "complaints1.png",
    title: "Revolutionizing Campus Life with Smart Tech",
    subtitle:
      "Revolutionizing the campus experience with smart technology and seamless connectivity.",
  },
];

const ComplaintForm = () => {
  const [profileData, setProfileData] = useState({
    registrationNo: "",
    name: "",
    branch: "",
  });
  const [complaints, setComplaints] = useState([]);
  const [previousRecord, setPreviousRecord] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [responsive, setResponsive] = useState(window.innerWidth < 684);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setResponsive(window.innerWidth < 684);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "https://amarnath013.pythonanywhere.com/api/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
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

    const fetchComplaints = async () => {
      try {
        const response = await fetch(
          "https://amarnath013.pythonanywhere.com/api/user/complaints",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch complaints");
        const data = await response.json();
        setComplaints(data.reverse());
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchProfileData();
    fetchComplaints();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(complaintSchema),
  });

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/complaints/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setPreviousRecord(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (response.exp < Math.floor(Date.now() / 1000)) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const currentDate = new Date();

  const onSubmit = (data) => {
    let data1 = JSON.stringify({
      name: profileData?.name,
      branch: profileData?.branch,
      status: "registered",
      subject: data.subject,
      complaint_type: data.type.toLowerCase(),
      complaint_description: data.description,
      registered_date: `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/complaints/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
      data: data1,
    };

    axios
      .request(config)
      .then((response) => {
        toast.success("Complaint registered successfully!", {
          position: "top-center",
          autoClose: 5000,
        });
        reset();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to register complaint.", {
          position: "top-center",
          autoClose: 5000,
        });
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - previousRecord.length)
      : 0;

  return (
    <div className="container-fluid" style={{borderRadius:"20px",border:"1px solid whitesmoke"}}>
      <Box
        className="complaint-form"
        sx={{ bgcolor: "", borderRadius: 3, padding: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Typography
              variant="h5"
              sx={{ marginBottom: "6%", textAlign: "center" }}
            >
              Register Complaint
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "block", md: "none", lg: "none" },
                textAlign: "center",
                marginBottom: "30px",
                width: "300px",
              }}
            >
              <Slider {...settings}>
                {slides.map((slide, index) => (
                  <img src={`./images/${slide.image}`} alt="" />
                ))}
              </Slider>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Registration/ Employee No"
                    fullWidth
                    value={profileData?.registrationNo}
                    disabled
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    fullWidth
                    value={profileData?.name}
                    disabled
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Branch"
                    fullWidth
                    value={profileData?.branch}
                    disabled
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Complaint Type</InputLabel>
                        <Select {...field} label="Complaint Type">
                          <MenuItem value="Ragging related">
                            Ragging related
                          </MenuItem>
                          <MenuItem value="Academic fees">
                            Academic fees
                          </MenuItem>
                          <MenuItem value="Classes related">
                            Classes related
                          </MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </Select>
                        {errors.type && (
                          <Typography color="error">
                            {errors.type.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="subject"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Subject"
                        variant="outlined"
                        fullWidth
                        error={!!errors.subject}
                        helperText={
                          errors.subject ? errors.subject.message : ""
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={
                          errors.description ? errors.description.message : ""
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      width: { lg: "70%", md: "70%", xs: "100%", sm: "90%" },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={12} md={6} lg={6} sx={{ textAlign: "-webkit-center" }}>
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "block", lg: "block" },
                width: "300px",
                marginTop: "50px",
              }}
            >
              <Slider {...settings}>
                {slides.map((slide, index) => (
                  <img src={`./images/${slide.image}`} alt="" key={index} />
                ))}
              </Slider>
            </Box>
            <Typography
              variant="h5"
              sx={{ marginBottom: "2%", textAlign: "center", marginTop: "5%" }}
            >
              Previous Complaints
            </Typography>
            {previousRecord.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                No previous complaints found.
              </Typography>
            ) : responsive ? (
              previousRecord
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <Card key={index} sx={{ marginBottom: 2, bgcolor: "#f5f5f5",textAlign:"justify" }}>
                    <CardContent>
                     
                      <Typography color="textSecondary">
                       <span style={{fontSize:"1.2rem"}}>Subject:</span> {row.complaint_type}
                      </Typography>
                      <Typography color="textSecondary">
                      <span style={{fontSize:"1.0rem"}}>Description:</span> {row.complaint_description}
                      </Typography>
                      <Typography color="textSecondary">
                      <span style={{fontSize:"1.0rem"}}>Type:</span> {row.complaint_type}
                      </Typography>
                      <Typography color="textSecondary"> <span style={{fontSize:"1.0rem"}}>Status:</span> {row.status}</Typography>
                      <Typography color="textSecondary">
                      <span style={{fontSize:"1.0rem"}}>Date:</span>: {row.registered_date}
                      </Typography>
                     
                    </CardContent>
                  </Card>
                ))
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Complaint Type</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {previousRecord.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No records found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      previousRecord
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.complaint_type}</TableCell>
                            <TableCell>{row.subject}</TableCell>
                            <TableCell>{row.complaint_description}</TableCell>
                            <TableCell>{row.registered_date}</TableCell>
                            <TableCell>{row.status}</TableCell>
                          </TableRow>
                        ))
                    )}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={5} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={5}
                        count={previousRecord.length}
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
            )}
          </Grid>
        </Grid>
        <ToastContainer />
      </Box>
    </div>
  );
};

export default ComplaintForm;
