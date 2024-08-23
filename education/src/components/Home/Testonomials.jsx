import React from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Container, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: 'John Doe',
    title: 'CEO, ABC',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sem sed mi fermentum.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jane Smith',
    title: 'CTO, XYZ',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sem sed mi fermentum.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Alice Johnson',
    title: 'CFO, DEF',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sem sed mi fermentum.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Bob Brown',
    title: 'COO, GHI',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sem sed mi fermentum.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Charlie White',
    title: 'CMO, JKL',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sem sed mi fermentum.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Diana Green',
    title: 'CIO, MNO',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sem sed mi fermentum.',
    image: 'https://via.placeholder.com/150',
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: (
      <IconButton>
        <ArrowForwardIos />
      </IconButton>
    ),
    prevArrow: (
      <IconButton>
        <ArrowBackIos />
      </IconButton>
    ),
  };

  return (
    <Box py={8} bgcolor="#f5f5f5">
      <Container>
        <Typography variant="h4" align="center" gutterBottom sx={{fontWeight: "600",color:"rgb(107, 169, 169)"}}>
          What Our Clients Say
        </Typography>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <Grid key={index} container justifyContent="center">
              <Card 
                sx={{
                  maxWidth: 345,
                  m: 2,
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={testimonial.image}
                  alt={testimonial.name}
                  sx={{
                    filter: 'grayscale(100%)',
                    '&:hover': {
                      filter: 'grayscale(0%)',
                    },
                  }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {testimonial.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {testimonial.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Testimonials;
