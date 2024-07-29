import * as React from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Box,
  CardMedia,
} from "@mui/material";
import { Header } from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";

export const Contact = () => {
  const [imageIndex, setImageIndex] = React.useState(0);
  const images = React.useMemo(() => ["contactUs.jpg", "contactUs1.jpg"], []);
  const [url,setUrl]=React.useState('');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    collegeCode: '',
    collegeName: '',
    collegeAddress: '',
    collegeId: '',
    idCount: '',
    establishedDate: '',
    collegeLogo:'',
  });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      collegeLogo: e?.target?.files[0],
    });
    if(e.target.files[0]){
    const imageUrl=URL?.createObjectURL(e?.target?.files[0]);
    setUrl(imageUrl);
    }else{
      setUrl('');
    }
  };

  const handleSubmit = () => {
    
    if(formData.name!=='' && formData.email!=='' && formData.collegeCode!=='' && formData.collegeName!=='' && formData.collegeAddress!=='' && formData.collegeId!=='' && formData.idCount!=='' && formData.establishedDate!=='' && formData.collegeLogo!=='')
    {
      console.log(formData);
    }else{
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
        <Container maxWidth="lg" sx={{ py: 3,marginBottom:"100px" }}>
          <Grid container spacing={7}>
            <Grid item xs={12} md={5}>
              <CardMedia
                component="img"
                
                image={`./images/${images[imageIndex]}`}
                sx={{
                  borderRadius: "15px",
                  marginTop: {lg:"40%",xs:"2%",sm:"2%",md:"40%"},
                  marginBottom: "20px",
                 
                  height:{lg:"50%",xs:"100%",md:"50%",sm:"100%"}
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
                Contact Us
              </p>
              <Typography variant="body1" color="text.secondary">
                Have a question or want to get in touch? Fill out the form below
                and we'll get back to you soon!
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
                  label="College Code"
                  variant="outlined"
                  placeholder="College Code..."
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="collegeCode"
                  value={formData.collegeCode}
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
                  name="collegeName"
                  value={formData.collegeName}
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
                  name="collegeAddress"
                  value={formData.collegeAddress}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ py: 1 }}>
                <TextField
                  type="text"
                  fullWidth
                  label="College Id"
                  placeholder="College Id"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="collegeId"
                  value={formData.collegeId}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ py: 1 }}>
                <TextField
                  type="number"
                  fullWidth
                  label="Id count"
                  placeholder="how many id do you want ?"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="idCount"
                  value={formData.idCount}
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
                  name="establishedDate"
                  value={formData.establishedDate}
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
                </Button><br/>
                {url && 
                <img 
                src={url} 
                alt="" 
                style={{width:"150px"}}
                />}
              </Box>
              <Button
                variant="contained"
                fullWidth
                style={{
                  backgroundColor: "rgb(107, 169, 169)",
                }}
                onClick={handleSubmit}
              >
                Send Message
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
