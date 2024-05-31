import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import NavbarNew from "../components/NavbarNew";
import HistoryCard from "../components/Dashboard/HistoryCard";
import SemesterCard from "../components/Dashboard/SemsterDashboard";
import AttendanceDashboard from "../components/Dashboard/Attendance";
import { Footer } from "../components/Footer";

export const Dashboard = () => {
  const navigate = useNavigate();

  const historyData = [
    { date: "2024-05-01", description: "Logged into the system" },
    { date: "2024-05-02", description: "Updated profile information" },
    { date: "2024-05-03", description: "Submitted an assignment" },
    { date: "2024-05-04", description: "Paid semester fee" },
  ];

  function regenerateToken() {
    let data = JSON.stringify({
      refresh: localStorage.getItem("refreshtoken"),
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/token/refresh/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.setItem("refreshtoken", response.data.refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (
        response.token_type !== "access" &&
        typeof response.user_id !== Number &&
        typeof response.jti !== String &&
        response.exp < Math.floor(Date.now() / 1000)
      ) {
        regenerateToken();
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarNew />
      <div className="flex flex-col items-center justify-center mt-8 space-y-8 px-4 min-h-[80vh]">
        <div className="flex flex-col lg:flex-row items-center justify-around w-full p-8 gap-6">
          <AttendanceDashboard presentPercentage={77}/>
        
          <div className="flex items-center justify-center w-full lg:w-1/2">
            <SemesterCard />
          </div>
        </div>
        <div className="w-full flex justify-center mt-8">
          <HistoryCard historyItems={historyData} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
