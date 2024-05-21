import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Homepage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
    "https://media.istockphoto.com/id/1202957911/photo/group-of-international-students-having-fun-after-studying.webp?b=1&s=170667a&w=0&k=20&c=ddamKslA0184nXMWT_ZtMf1MhedsT8Sz1U8Q60zX8cc=",
    "https://media.istockphoto.com/id/1461631609/photo/happy-smiling-students-looking-at-camera-while-preparing-for-exams-by-reading-books-at.webp?b=1&s=170667a&w=0&k=20&c=xcfQWFZ8dGoz_Xm51-keRJ2VEimIiEoAeQZWa_sB7XA=",
    "https://media.istockphoto.com/id/1148219796/photo/teachers-applauding-for-student-at-awards-ceremony.webp?b=1&s=170667a&w=0&k=20&c=65VgszKqMgEfKfv8fx1h1_Mkt1fsbfTiucSvo-aSufk=",
  ];

  return (
    <div className="Homepage mx-auto">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl">
        My Dashboard
      </header>

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
      <section className="py-8 ">
        <h2 className="text-3xl text-center mb-4">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 ">
          <div className="bg-white shadow-md rounded-lg p-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1682124416359-d48d59ad6916?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvamVjdHMlMjBlZHVjYXRpb258ZW58MHx8MHx8fDA%3D"
              alt="Project 1"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <p className="mt-2">Project 1 description goes here.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvamVjdHMlMjBlZHVjYXRpb258ZW58MHx8MHx8fDA%3D"
              alt="Project 2"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <p className="mt-2">Project 2 description goes here.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1682124399858-022a1cf3aa71?dpr=2&w=306&auto=format&fit=crop&q=60&crop=entropy&cs=tinysrgb&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8cHJvamVjdHMlMjBlZHVjYXRpb258ZW58MHwwfHx8MTcxNjI4MDE0MHwx&ixlib=rb-4.0.3"
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
        <div className="flex  gap-8 justify-center  overflow-x-scroll space-x-4 px-4">
          <div className="w-64 h-64 bg-green-300 flex-shrink-0 flex items-center justify-center">
            <img
              className="w-full h-full object-cover "
              src="https://plus.unsplash.com/premium_photo-1663040197283-fae88b360dad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xpZW50JTIwb2hvdG8lMjBlZHVjYXRpb258ZW58MHx8MHx8fDA%3D"
              alt=""
            />
          </div>
          <div className="w-64 h-64 bg-green-300 flex-shrink-0 flex items-center justify-center">
            <img
              className="w-full h-full object-cover "
              src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xpZW50JTIwb2hvdG8lMjBlZHVjYXRpb258ZW58MHx8MHx8fDA%3D"
              alt=""
            />
          </div>
          <div className="w-64 h-64 bg-green-300 flex-shrink-0 flex items-center justify-center">
            <img
              className="w-full h-full object-cover "
              src="https://images.unsplash.com/photo-1494809610410-160faaed4de0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNsaWVudCUyMG9ob3RvJTIwZWR1Y2F0aW9ufGVufDB8fDB8fHww"
              alt=""
            />
          </div>

          <div className="w-64 h-64 bg-green-300 flex-shrink-0 flex items-center justify-center">
            <img
              className="w-full h-full object-cover "
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVkdWNhdGlvbiUyMGV2ZW50fGVufDB8fDB8fHww"
              alt=""
            />
          </div>
          <div className="w-64 h-64 bg-green-300 flex-shrink-0 flex items-center justify-center">
            <img
              className="w-full h-full object-cover "
              src="https://plus.unsplash.com/premium_photo-1664475536921-e8e0e194be65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVkdWNhdGlvbiUyMGV2ZW50fGVufDB8fDB8fHww"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 ">
        <h2 className="text-3xl text-center mb-4">Testimonials</h2>
        <div className="flex overflow-x-scroll gap-8 justify-center space-x-4 px-4 mb-4">
          <div className="w-64 h-64 flex-col flex-shrink-0 flex items-center justify-center">
            <img
              className="w-full h-full object-cover rounded-full  "
              src="https://plus.unsplash.com/premium_photo-1664475536921-e8e0e194be65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVkdWNhdGlvbiUyMGV2ZW50fGVufDB8fDB8fHww"
              alt=""
            />
          </div>
          <div className="w-64 h-64 flex-shrink-0 flex items-center justify-center">
            <img
              className="w-full h-full object-cover rounded-full  "
              src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
            />
          </div>
          <div className="w-64 h-64 flex-shrink-0 flex items-center justify-center">
            <img
              className="w-full h-full object-cover rounded-full  "
              src="https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww"
              alt=""
            />
          </div>
          <div className="w-64 h-64 flex-shrink-0 flex items-center justify-center">
            <img
              className="w-full h-full object-cover rounded-full  "
              src="https://images.unsplash.com/photo-1557862921-37829c790f19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww"
              alt=""
            />
          </div>
          <div className="w-64 h-64 flex-shrink-0 flex items-center justify-center">
            <img
              className="w-full h-full object-cover rounded-full  "
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
