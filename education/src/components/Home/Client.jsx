
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Clients = () => {
  const clients = [
    {
      logo: "https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "John",
      description: "A leading technology company specializing in software development and digital solutions.",
    },
    {
      logo: "https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Rehen",
      description: "A global consulting firm offering strategic advisory and business optimization services.",
    },
    {
      logo: "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Henry",
      description: "A renowned educational institution committed to excellence in teaching and research.",
    },
    {
      logo: "https://images.pexels.com/photos/4100672/pexels-photo-4100672.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Mark",
      description: "A leading healthcare provider dedicated to delivering compassionate care and innovative treatments.",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <center>
          <h2 className="text-3xl mx-auto bg-sky-500 hover:bg-sky-700 mt-5 mb-8 px-4 py-2 text-white w-fit font-light rounded-lg cursor-pointer">
            Our Clients
          </h2>
        </center>
        <Slider {...settings}>
          {clients.map((client, index) => (
            <div key={index} className="p-4">
              <div className="bg-white p-4 shadow-lg rounded-lg text-center hover:bg-gray-200">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="mx-auto h-32 w-32 object-cover rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{client.name}</h3>
                <p className="text-gray-700 text-sm opacity-80">{client.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
