import * as React from 'react';
import { Grid, Typography, TextField, Button, Container, Box, CardMedia} from '@mui/material';
import { Header } from "../components/Home/Header";
import Footer from '../components/Home/Footer';
import { Phone, Email , LocationOn} from '@mui/icons-material';

export const Contact = () => {

    const [imageIndex, setImageIndex] = React.useState(0);
    const images = React.useMemo(() => [
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
  ],[]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <>
        <Header/>

        <div>
        <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="100%"
            image={images[imageIndex]}
            alt="Contact Us Image"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom >
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            Have a question or want to get in touch? Fill out the form below and we'll get back to you soon!
          </Typography>
          <Box sx={{ py: 2 }}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Box sx={{ py: 2 }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Box sx={{ py: 2 }}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
          </Box>
          <Button variant="contained" color="primary" fullWidth>
            Send Message
          </Button>
        </Grid>
      </Grid>
    </Container>
        </div>

        <Container maxWidth="lg" sx={{ py: 4 }}>
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container spacing={2} sx={{ py: 2, alignItems: 'center' }}>
        <Grid item xs={4} sm={4}>
          <Typography variant="body1">
            <Phone sx={{ mr: 1 }} />
            <strong>Phone:</strong> +1 (123) 456-7890
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Typography variant="body1">
            <Email sx={{ mr: 1 }} />
            <strong>Email:</strong> <a href="mailto:info@example.com">info@example.com</a>
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4}>
            <Typography variant="body1">
                <LocationOn sx={{ mr: 1 }} />
                <strong>Address:</strong> 123 Main St, Anytown, USA 12345
            </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Container>

        <Footer/>
    </>
  )
}

export default Contact
