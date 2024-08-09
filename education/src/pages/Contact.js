import * as React from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Box,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { Header } from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { Url } from "../components/BaseUrl";
import { useNavigate } from "react-router-dom";

export const Contact = () => {
  const [imageIndex, setImageIndex] = React.useState(0);
  const images = React.useMemo(() => ["contactUs.jpg", "contactUs1.jpg"], []);
  const [url, setUrl] = React.useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    college_name: "",
    college_address: "",
    phone_number: "",
    principal_name: "",
    established_date: "",
    college_logo: "",
    college_code: "",
  });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "established_date") {
      formattedValue = new Date(value).toISOString().split("T")[0];
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      college_logo: e?.target?.files[0],
    });
    if (e.target.files[0]) {
      const imageUrl = URL?.createObjectURL(e?.target?.files[0]);
      setUrl(imageUrl);
    } else {
      setUrl("");
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    if (
      formData.name !== "" &&
      formData.email !== "" &&
      formData.college_name !== "" &&
      formData.college_address !== "" &&
      formData.phone_number !== "" &&
      formData.established_date !== "" &&
      formData.college_logo !== "" &&
      formData.principal_name !== "" &&
      formData.college_code !== ""
    ) {
      let data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("college_name", formData.college_name);
      data.append("college_address", formData.college_address);
      data.append("established_date", formData.established_date);
      data.append("phone_number", formData.phone_number);
      data.append("principal_name", formData.principal_name);
      data.append("college_code", formData.college_code);
      data.append("college_logo", formData.college_logo);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${Url}/college-requests/`,
        headers: {},
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response);
          setLoading(false);
          enqueueSnackbar(response?.data?.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 3000,
          });
          
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      enqueueSnackbar("Please fill all the fields", {
        variant: "warning",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <>
      <Header />

      <div>
        <Container maxWidth="lg" sx={{ py: 3, marginBottom: "100px" }}>
          <Grid container spacing={7}>
            <Grid item xs={12} md={5}>
              <CardMedia
                component="img"
                image={`./images/${images[imageIndex]}`}
                sx={{
                  borderRadius: "15px",
                  marginTop: { lg: "40%", xs: "2%", sm: "2%", md: "40%" },
                  marginBottom: "20px",

                  height: { lg: "50%", xs: "100%", md: "50%", sm: "100%" },
                }}
                alt="Contact Us Image"
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <p
                style={{
                  fontSize: "1.6rem",
                  textAlign: "center",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
               Service Request form
              </p>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                Want to use of our platform?
              </Typography>
              <Box sx={{ py: 1, mt: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  placeholder="Name..."
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ py: 1 }}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  placeholder="Email..."
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ py: 1 }}>
                <TextField
                  fullWidth
                  label="College Name"
                  variant="outlined"
                  placeholder="College Name..."
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="college_name"
                  value={formData.college_name}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ py: 1 }}>
                <TextField
                  fullWidth
                  label="College Address"
                  variant="outlined"
                  placeholder="College Address..."
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="college_address"
                  value={formData.college_address}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ py: 1 }}>
                <TextField
                  fullWidth
                  label="College Code"
                  variant="outlined"
                  placeholder="College Code..."
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="college_code"
                  value={formData.college_code}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ py: 1 }}>
                <TextField
                  type="number"
                  fullWidth
                  label="Phone Number"
                  placeholder="Phone Number"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ py: 1 }}>
                <TextField
                  fullWidth
                  label="Principal Name"
                  variant="outlined"
                  placeholder="Principal Name..."
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="principal_name"
                  value={formData.principal_name}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ py: 1 }}>
                <TextField
                  type="date"
                  fullWidth
                  label="Established Date"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="established_date"
                  value={formData.established_date}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ py: 1 }}>
                <span>College logo: </span>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "rgb(107, 169, 169)",
                    width: { lg: "40%", md: "50%", xs: "100%", sm: "50%" },
                    marginTop: { xs: "10px", lg: "10px" },
                    marginBottom: "20px",
                  }}
                >
                  <label>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    Upload
                  </label>
                </Button>
                <br />
                {url && <img src={url} alt="" style={{ width: "150px" }} />}
              </Box>
              <Button
                variant="contained"
                fullWidth
                style={{
                  backgroundColor: "rgb(107, 169, 169)",
                }}
                onClick={handleSubmit}
              >
                {!loading && <p>Submit Message</p>}
                {loading && (
                  <CircularProgress
                    style={{ color: "white", width: "20px", height: "22px" }}
                  />
                )}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ p: 1, alignItems: "center" }}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Phone style={{ color: "rgb(107, 169, 169)" }} />
              <a href="tel:+1 (123) 456-7890">+1 (123) 456-7890</a>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <p>
                {" "}
                <Email style={{ color: "rgb(107, 169, 169)" }} />
              </p>

              <a href="mailto:info@example.com">info@example.com</a>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <LocationOn style={{ color: "rgb(107, 169, 169)" }} />
              <a
                href="https://www.google.com/maps/search/?api=1&query=123+Main+St,+Anytown,+USA+12345"
                rel="noreferrer"
                target="_blank"
              >
                123 Main St, Anytown, USA 12345
              </a>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default Contact;
