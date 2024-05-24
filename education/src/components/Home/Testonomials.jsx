import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      position: 'CEO, ABC',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sem sed mi fermentum.',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'John Doe',
      position: 'CEO, ABC',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sem sed mi fermentum.',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'John Doe',
      position: 'CEO, ABC',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sem sed mi fermentum.',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'John Doe',
      position: 'CEO, ABC',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sem sed mi fermentum.',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'John Doe',
      position: 'CEO, ABC',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sem sed mi fermentum.',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'John Doe',
      position: 'CEO, ABC',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor sem sed mi fermentum.',
      image: 'https://via.placeholder.com/150',
    },
    // Add more testimonials as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of testimonials to show
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust autoplay speed
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="testimonials bg-gray-100 md:py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl mx-auto bg-sky-500 hover:bg-sky-700 mb-8 px-4 py-2 text-white w-fit font-light rounded-lg cursor-pointer ">Testimonials</h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card flex flex-col items-center justify-center  md:w-60 bg-white p-6 rounded-lg shadow-md">
              <div className="flex  flex-col justify-center items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 md:w-32 md:h-32 md:rounded-full rounded-full mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.quote}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;