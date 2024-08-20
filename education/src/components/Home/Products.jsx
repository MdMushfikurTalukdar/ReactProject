import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';

const Products = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const products = [
    {
      image: 'product_intro1.jpg',
      description: 'Semester Registration where you can register your semester.',
    },
    {
      image: 'product_intro2.jpg',
      description: 'Certificates: Now you can get your precious certificates online.',
    },
    {
      image: 'product_intro3.jpg',
      description: 'Hostel/Mess: You can apply online for Hostel/Mess rooms.',
    },
    {
      image: 'product_intro4.jpg',
      description: 'Results: Also now you can download your results online.',
    },
  ];

  return (
    <Box py={8} bgcolor="grey.100">
      <Container>
        <Typography variant="h4" align="center" gutterBottom color="textPrimary" >
          Our Products
        </Typography>
        <Slider {...settings}>
          {products.map((product, index) => (
            <Grid key={index} container justifyContent="center">
              <Card 
                sx={{ 
                  maxWidth: 345, 
                  m: 2, 
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', 
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  sx={{ objectFit: "contain", borderBottom: '1px solid #ddd' }}
                  image={`./images/${product.image}`}
                  alt={product.description}
                />
                <CardContent>
                  <Typography variant="body1" color="textPrimary" align="center">
                    {product.description}
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

export default Products;
