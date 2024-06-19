import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import NavbarNew from "../components/NavbarNew";
import {
  Box,
  Button,
  Divider,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  Table,
  TableHead,
  Paper,
  CardContent,
  Card,
} from "@mui/material";
import Footer from "../components/Home/Footer";
import "../App.css";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Validation schema
const exactTwoDecimalRegex = /^\d+\.\d{2}$/;

const schema = yup.object().shape({
  cgpa: yup
    .string()
    .required("CGPA is required")
    .test(
      "is-decimal",
      "CGPA must be a decimal with exactly 2 decimal places",
      (value) => value && exactTwoDecimalRegex.test(value)
    )
    .test("is-valid-range", "CGPA must be between 0 and 10", (value) => {
      if (value) {
        const numValue = parseFloat(value);
        return numValue >= 0 && numValue <= 10;
      }
      return true;
    }),
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
});

export const HostelRoomRequest = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [name, setName] = useState(null);
  const [userProfile, setUserProfile] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [result, setResult] = useState([]);
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
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (response.exp < Math.floor(Date.now() / 1000)) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/profile/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://amarnath013.pythonanywhere.com/api/user/hostel-allotments/?search=${localStorage.getItem('RollNumber')}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setResult(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (data) => {
    console.log(data);

    const formData = new FormData();

    let data1 = {
      registration_number:
        userProfile?.academic_information?.registration_number,
      status: "applied",
      cgpa: data.cgpa,
    };

    for (const key in data1) {
      formData.append(key, data1[key]);
    }

    formData.append("latest_marksheet", data.file[0]);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/hostel-allotments/",
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("accesstoken")}`,
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        enqueueSnackbar("Request sent successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 1000,
        });
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setName(file.name);
    setValue("file", [file]);
    setPreviewUrl(URL.createObjectURL(file));
    await trigger("file");
  };

  return (
    <div className="container-fluid">
      <NavbarNew />
      <Box
        className="bonafide-form"
        sx={{
          padding: 4,
          borderRadius: 2,
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ color: "rgb(107, 169, 169)", fontWeight: "bold" }}
        >
          Hostel Room Allotment Request
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <Typography variant="h6">Registration / Employee Number</Typography>
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              {userProfile?.academic_information?.registration_number}
            </Typography>
          </FormControl>

          <FormControl
            fullWidth
            variant="outlined"
            error={!!errors?.cgpa?.message}
            margin="normal"
          >
            <TextField
              label="Current CGPA"
              type="text"
              {...register("cgpa")}
              error={!!errors.cgpa}
              helperText={errors?.cgpa?.message}
            />
          </FormControl>

          <FormControl fullWidth error={!!errors.file?.message} margin="normal">
            <Box
              sx={{
                display: {
                  lg: "flex",
                  sm: "initial",
                  md: "flex",
                  xs: "initial",
                },
                gap: "15px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Latest Semester Marksheet
              </Typography>
              <Button
                component="label"
                variant="contained"
                sx={{
                  backgroundColor: "rgb(107, 169, 169)",
                  color: "#fff",
                  "&:hover": { backgroundColor: "rgb(85, 136, 136)" },
                  width: "50%",
                }}
              >
                Upload File
                <input
                  type="file"
                  name="file"
                  {...register("file")}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </Button>
            </Box>
            {previewUrl && (
              <Box sx={{ marginTop: 2 }}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ width: "150px" }}
                />
              </Box>
            )}
            {name && (
              <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                <p>{name}</p>
              </Box>
            )}
            {errors?.file && (
              <FormHelperText>{errors?.file?.message}</FormHelperText>
            )}
          </FormControl>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: "rgb(107, 169, 169)",
              color: "#fff",
              "&:hover": { backgroundColor: "rgb(85, 136, 136)" },
            }}
          >
            Send Request
          </Button>
        </form>
        <Divider sx={{ my: 3 }} />
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "rgb(107, 169, 169)" }}
        >
          Previous Hostel Requests
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {result.length === 0 && (
            <p
              style={{
                marginBottom: "50px",
                marginTop: "100px",
                fontSize: "1.2rem",
              }}
            >
              Nothing to show
            </p>
          )}

          {responsive ? (
            result?.length > 0 &&
            result?.map((data, index) => (
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
                      Bonafide Details
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Status : {data?.status}
                    </Typography>
                    <Typography variant="body2">
                      Marksheet:<br/>
                      {data?.latest_marksheet!==null ? (<img
                        src={`data:image/*;base64,${decodeURIComponent(
                          data?.latest_marksheet
                        )}`}
                        alt="description"
                        style={{width:"150px",height:"150px"}}
                      />):(<p>Null</p>) }
                      
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))
          ) : (
            <Box>
              {result?.length > 0 ? (
                <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="bonafide table" style={{textAlign:"center"}}>
                    <TableHead style={{ backgroundColor: "#D2E9E9" }}>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>Applied For</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {result?.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{data?.status}</TableCell>
                          <TableCell>{data?.latest_marksheet!==null ? (<img
                        src={`data:image/*;base64,${decodeURIComponent(
                          data?.latest_marksheet
                        )}`}
                        alt="description"
                        style={{width:"150px",height:"150px"}}
                      />):(<p>Null</p>) }</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : null}
            </Box>
          )}
        </Box>
        <Divider sx={{ mb: 3 }} />
      </Box>
      <Footer />
    </div>
  );
};

export default HostelRoomRequest;
