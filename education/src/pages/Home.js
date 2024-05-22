import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import HomepageNav from "../components/HomepageNav"

export const Home = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
    "https://img.freepik.com/premium-vector/video-call-conference-working-from-home-social-distancing-business-discussion-illustration-flat-style_189033-135.jpg",
    "https://cdn.elearningindustry.com/wp-content/uploads/2023/08/The-Rise-Of-Virtual-Classrooms-In-Hybrid-Workplaces.jpg",
    "https://www.bu.edu/ctl/files/2020/10/shutterstock_1684170829-scaled.jpg",
  ];

  return (
    <>
    <HomepageNav />
      <div className="Homepage mx-auto">
        {/* Slider Section */}
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

        {/* Our Projects Section */}
        <section className="py-8">
          <h2 className="text-3xl text-center mb-4">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <img
                src="https://img.freepik.com/premium-photo/city-view-iconic-buildings-washington-dc-usa-political-core-center-united-states-america-technologies-education-concept-academic-research-top-ranking-university-hologram_269648-4249.jpg"
                alt="Project 1"
                className="w-full h-48 object-cover rounded-t-lg hover:scale-125"
              />
              <p className="mt-2">Project 1 description goes here.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <img
                src="https://img.freepik.com/free-vector/distance-learning-infographic-concept_1284-17948.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1714521600&semt=ais"
                alt="Project 2"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <p className="mt-2">Project 2 description goes here.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <img
                src="https://img.freepik.com/free-vector/school-children-attending-distance-class-monitors-desks-classroom-screen-view_74855-15518.jpg"
                alt="Project 3"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <p className="mt-2">Project 3 description goes here.</p>
            </div>
          </div>
        </section>

        {/* Our Clients Section */}
        <section className="py-8 bg-gray-100">
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
        <section className="py-8">
          <h2 className="text-3xl text-center mb-10">Testimonials</h2>
          <div className="flex overflow-x-scroll gap-8 justify-center space-x-4 px-4 mb-4 hide-scrollbar">
            <div className="w-64 h-64 flex-col flex-shrink-0 flex items-center justify-center">
              <img
                className="w-full h-full object-cover rounded-full"
                src="https://plus.unsplash.com/premium_photo-1664475536921-e8e0e194be65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVkdWNhdGlvbiUyMGV2ZW50fGVufDB8fDB8fHww"
                alt=""
              />
            </div>
            <div className="w-64 h-64 flex-shrink-0 flex items-center justify-center">
              <img
                className="w-full h-full object-cover rounded-full"
                src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
            </div>
            <div className="w-64 h-64 flex-shrink-0 flex items-center justify-center">
              <img
                className="w-full h-full object-cover rounded-full"
                src="https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww"
                alt=""
              />
            </div>
            <div className="w-64 h-64 flex-shrink-0 flex items-center justify-center">
              <img
                className="w-full h-full object-cover rounded-full"
                src="https://images.unsplash.com/photo-1557862921-37829c790f19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww"
                alt=""
              />
            </div>
            <div className="w-64 h-64 flex-shrink-0 flex items-center justify-center">
              <img
                className="w-full h-full object-cover rounded-full"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww"
                alt=""
              />
            </div>
          </div>
      
        </section>
        <center className="h-full bg-orange-400 p-4">
            {" "}
            <button onClick={(e)=>navigate('/register')} className="px-4 mx-auto py-2 bg-blue-400 hover:bg-blue-700 text-2xl outline-none rounded-lg">
              Register Yourself
            </button>
          </center>
      </div>
    </>
  );
};