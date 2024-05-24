import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Products = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
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
      image: 'https://via.placeholder.com/150',
      description: 'Product 1: A fantastic product that solves all your problems.',
    },
    {
      image: 'https://via.placeholder.com/150',
      description: 'Product 2: Another great product that you  will love will love.',
    },
    {
      image: 'https://via.placeholder.com/150',
      description: 'Product 3: This product is the best thing since sliced bread.',
    },
    {
      image: 'https://via.placeholder.com/150',
      description: 'Product 4: An innovative product that changes the game.',
    },
  ];

  return (
    <section className="products bg-gray-100 py-6">
      <div className="container mx-auto">
        <h2 className="text-3xl mx-auto bg-sky-500 hover:bg-sky-700 mt-5 mb-8  px-4  py-2 text-white w-fit font-light  rounded-lg cursor-pointer ">Our Products</h2>
        <Slider {...settings}>
          {products.map((product, index) => (
            <div key={index} className="product-card bg-white p-4 shadow-lg rounded-lg text-center flex gap-4">
              <img src={product.image} alt={`Product ${index + 1}`} className="mx-auto mb-4 w-40 h-40 object-cover " />
              <p className="text-gray-700">{product.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Products;
