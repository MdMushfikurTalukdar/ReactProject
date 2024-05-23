import React, { useEffect, useRef, useState} from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import HomepageNav from "../components/HomepageNav"
import {Footer} from "../components/Footer"
import "./Home.css"
import img3 from "../components/img/img3.png"
import Testimonials from "../components/Testimonials"


export const Home = () => {

  const images = [
    "https://img.freepik.com/premium-photo/city-view-iconic-buildings-washington-dc-usa-political-core-center-united-states-america-technologies-education-concept-academic-research-top-ranking-university-hologram_269648-4249.jpg",
    "https://img.freepik.com/free-vector/distance-learning-infographic-concept_1284-17948.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1714521600&semt=ais",
    "https://img.freepik.com/free-vector/school-children-attending-distance-class-monitors-desks-classroom-screen-view_74855-15518.jpg",
  ];


  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 1000); // Change slide every 1 second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       // Enable autoplay
    autoplaySpeed: 3000,  // Set autoplay speed to 1 second
  };
  
  return (
    <>
    <HomepageNav />
      <div className="Homepage mx-auto">
        <div className="container mx-auto px-4">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="mt-4 flex w-full justify-center">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[80vh] object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </Slider>
        </div>
    

        <button onClick={(e)=>navigate('/register')} className="px-4 mx-auto py-2 bg-blue-400 hover:bg-blue-700 text-2xl outline-none rounded-lg btn">
              Register Yourself
        </button>

        <section className="">
          <div className='second'>
            <div >
              <h1 className='aboutTxt'>
              Quest For <span className='redColor'>Excellence</span>
              </h1>
              <p className='underline'>___________________</p>
            </div>
            <div className='txtDiv'>
              <h6 className='txtAbout'><spam className='redColor' >L</spam>orem ipsum dolor sit amet, consectetur ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor adipisicing elit, sed do eiusmod tempor incididunt ut et dolore magna aliqua. Ut enim ad minim veniam</h6>
            </div>
            <div className='second-second'>
              <h4><span className='redColor' >W</span>e Are Creative And Awesome</h4>
              <h6><span className='redColor' >L</span>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.Lorem Ipsum is simply dummy text of the printing and typesetting industry. book.</h6>
            </div>
            <div className='second-third'>
              <img src={img3}/>
            </div>
          </div>
        </section>

        {/* Our Projects Section */}
        <section className="py-8 bg-gray-100">
          <h2 className="text-3xl text-center mb-4">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <img
                src="https://img.freepik.com/premium-photo/city-view-iconic-buildings-washington-dc-usa-political-core-center-united-states-america-technologies-education-concept-academic-research-top-ranking-university-hologram_269648-4249.jpg"
                alt="Project 1"
                className="w-full h-48 object-cover rounded-t-lg hover:scale-125 imgSport"
              />
              <p className="mt-2 textCenter">Smart Education</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <img
                src="https://img.freepik.com/free-vector/distance-learning-infographic-concept_1284-17948.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1714521600&semt=ais"
                alt="Project 2"
                className="w-full h-48 object-cover rounded-t-lg imgSport"
              />
              <p className="mt-2 textCenter">Smart Campus</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <img
                src="https://img.freepik.com/free-vector/school-children-attending-distance-class-monitors-desks-classroom-screen-view_74855-15518.jpg"
                alt="Project 3"
                className="w-full h-48 object-cover rounded-t-lg imgSport"
              />
              <p className="mt-2 textCenter">Smart Class</p>
            </div>
          </div>
        </section>

        {/* Our Clients Section */}
        <section className="py-8">
          <h2 className="text-3xl text-center mb-4">Our Clients</h2>
          <div className="flex gap-8 justify-center overflow-x-scroll space-x-4 px-4 hide-scrollbar">
            <div className="w-64 h-64 bg-green-300 flex-shrink-0 flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1663040197283-fae88b360dad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xpZW50JTIwb2hvdG8lMjBlZHVjYXRpb258ZW58MHx8MHx8fDA%3D"
                alt=""
              />
            </div>
            <div className="w-64 h-64 bg-green-300 flex-shrink-0 flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xpZW50JTIwb2hvdG8lMjBlZHVjYXRpb258ZW58MHx8MHx8fDA%3D"
                alt=""
              />
            </div>
            <div className="w-64 h-64 bg-green-300 flex-shrink-0 flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1494809610410-160faaed4de0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNsaWVudCUyMG9ob3RvJTIwZWR1Y2F0aW9ufGVufDB8fDB8fHww"
                alt=""
              />
            </div>
            <div className="w-64 h-64 bg-green-300 flex-shrink-0 flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVkdWNhdGlvbiUyMGV2ZW50fGVufDB8fDB8fHww"
                alt=""
              />
            </div>
            <div className="w-64 h-64 bg-green-300 flex-shrink-0 flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1664475536921-e8e0e194be65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVkdWNhdGlvbiUyMGV2ZW50fGVufDB8fDB8fHww"
                alt=""
              />
            </div>
           
          </div>
        </section>

        {/* Testimonials Section */}
       <Testimonials />
        {/* <center className="h-full bg-orange-400 p-4">
            {" "}
            <button onClick={(e)=>navigate('/register')} className="px-4 mx-auto py-2 bg-blue-400 hover:bg-blue-700 text-2xl outline-none rounded-lg">
              Register Yourself
            </button>
        </center> */}
        <Footer />
      </div>
    </>
  );
};