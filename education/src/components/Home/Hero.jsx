// src/components/Hero.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const slides = [
    {
      image:
        "https://img.freepik.com/free-vector/distance-learning-infographic-concept_1284-17948.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1714521600&semt=ais",
      title: "Welcome to Smart Campus",
      subtitle: "Your journey to excellence starts here",
    },
    {
      image:
        "data:image/jpeg;base64,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",
      title: "Innovative Learning",
      subtitle: "Transforming education with technology",
    },
    {
      image:
        "data:image/jpeg;base64,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",
      title: "Join Our Community",
      subtitle: "Where students and faculty thrive",
    },
  ];

  return (
    <section className="hero">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className=" w-full object-cover h-96"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
              <h2 className="text-4xl font-bold">{slide.title}</h2>
              <p className="text-2xl mt-2">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};