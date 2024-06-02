import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|30)$/;
const batchRegex = /^\d{4}-\d{4}$/;

const schema = yup.object().shape({
  year_semester: yup
    .string()
    .matches(/^(1|2|3|4)$/, "year semester should be 1, 2, 3, or 4")
    .required("Year semester is required"),
  batch: yup
    .string()
    .matches(
      batchRegex,
      "Batch has wrong format. Use this format instead: YYYY-YYYY."
    )
    .required("Batch is required"),
  department: yup.string().required("department is required"),
  course_start_date: yup
    .string()
    .matches(
      dateRegex,
      "Date has wrong format. Use this format instead: YYYY-MM-DD."
    ),
});

export const BonafideCertificate = ({
  setCertificateData,
  certificateData,
}) => {
  const [result, setResult] = useState([]);
  const [hide, setHide] = useState(true);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  
  const handleSubmit2 = (data) => {
     
    let data1 = JSON.stringify({
      college: 1,
      student: jwtDecode(localStorage?.getItem("accesstoken")).user_id,
      roll_no: jwtDecode(localStorage?.getItem("accesstoken")).user_id,
      year_semester: data?.year_semester,
      batch: data?.batch,
      department: data?.department,
      course_start_date: data?.course_start_date,
      // issue_date: `${
      //   new Date().getFullYear() - new Date().getMonth() - new Date().getDate()
      // }`,
      issue_date: "2024-05-23",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/bonafide/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
      data: data1,
    };

    axios
      .request(config)
      .then((response) => {
        setHide(false);
        localStorage.setItem("bonafied", true);
    
          if (localStorage?.getItem("accesstoken")) {
            const response = jwtDecode(localStorage?.getItem("accesstoken"));
            console.log(response.exp);
            if (
              response.token_type !== "access" &&
              response.exp < Math.floor(Date.now() / 1000)
            ) {
              navigate("/login");
            }
          } else {
            navigate("/login");
          }

          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "https://amarnath013.pythonanywhere.com/api/user/bonafide/",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          };

          axios
            .request(config)
            .then((response) => {
              console.log(response?.data);
              const res = response?.data?.find(
                (item) =>
                  item?.roll_no ===
                  jwtDecode(localStorage?.getItem("accesstoken"))?.user_id
              );
              setResult(res);
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        
      })
      .catch((error) => {
        console.log(error);
        setHide(false);
      });
  };

  useEffect(() => {

    if (localStorage.getItem("bonafied") === 'true') {

      setHide(false);

      if (localStorage?.getItem("accesstoken")) {
        const response = jwtDecode(localStorage?.getItem("accesstoken"));
        console.log(response.exp);
        if (
          response.token_type !== "access" &&
          response.exp < Math.floor(Date.now() / 1000)
        ) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://amarnath013.pythonanywhere.com/api/user/bonafide/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response?.data);
          const res = response?.data?.find(
            (item) =>
              item?.roll_no ===
              jwtDecode(localStorage?.getItem("accesstoken"))?.user_id
          );
          setResult(res);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
     {hide && <h2 className="text-center pt-5">Kindly fill this form to get Bonafide Certificate</h2>}
      {hide && (
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "65vh", // Full viewport height to center vertically
            // backgroundColor: "#f5f5f5", // Light background color for contrast
            flexDirection:"column"
          }}
        >
         
          <form
            onSubmit={handleSubmit(handleSubmit2)}
            style={{ textAlign: "center",maxWidth:"55%",minWidth:"35%"
          }}
          >
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                type="text"
                label="Year semester"
                placeholder="Year semester"
                {...register("year_semester")}
                error={!!errors?.year_semester}
                helperText={errors?.year_semester?.message}
                fullWidth
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                type="text"
                label="Batch"
                placeholder="Batch"
                {...register("batch")}
                error={!!errors?.batch}
                helperText={errors?.batch?.message}
                fullWidth
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                type="text"
                label="Department"
                placeholder="Department"
                {...register("department")}
                error={!!errors?.department}
                helperText={errors?.department?.message}
                fullWidth
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                type="text"
                label="Course Start Date"
                placeholder="Course Start Date"
                {...register("course_start_date")}
                error={!!errors?.course_start_date}
                helperText={errors?.course_start_date?.message}
                fullWidth
              />
            </Box>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      )}
      {!hide && (
        <div className="container mx-auto print:px-0 print:py-0 print:mx-0 print:w-full print:max-w-none">
          <div className="flex justify-between items-center pb-4 print:flex-col print:items-start">
            <div className="flex items-center space-x-2 print:hidden"></div>
          </div>
          <div className="border border-gray-200 rounded-lg px-8 py-12 print:border-none print:rounded-none print:px-16 print:py-16">
            <div className="text-center pb-4">
              <div className="flex flex-col items-center space-y-4">
                <img
                  src="https://imgs.search.brave.com/nlEnn1zTIbZ2U6Nip9RwamR_i6LXgcdLZbNJO_-Qxnk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vMy8zNy9N/b3RpaGFyaV9Db2xs/ZWdlX29mX0VuZ2lu/ZWVyaW5nX2xvZ28u/anBn"
                  alt="College Logo"
                  className="w-24 h-24 print:w-32 print:h-32 object-cover rounded-lg"
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold print:text-3xl">
                    DEPARTMENT OF SCIENCE & TECHNOLOGY
                  </h2>
                  <h3 className="text-xl font-medium print:text-2xl">
                    MOTIHARI COLLEGE OF ENGINEERING, MOTIHARI
                  </h3>
                  <p className="text-gray-500 print:text-lg">
                    BAIRIYA, FURSATPUR, MOTIHARI, EAST CHAMPARAN, BIHAR – 845401
                    <br />
                    PH. NO. 06252-290699/290695
                    <br />
                    E-MAIL ID- <span>mecmotihari4@gmail.com</span>
                  </p>
                </div>
              </div>
            </div>
            <center>
              <h2
                className="text-2xl font-bold pb-2"
                style={{ textDecoration: "underline" }}
              >
                Bonafide Certificate
              </h2>
            </center>
            <p className="text-justify leading-loose print:text-lg">
              This is to certify that{" "}
              <b>
                {result?.student_details?.first_name?.slice(0,1)?.toUpperCase()}{result?.student_details?.first_name?.slice(1)}{" "}
                {result?.student_details?.last_name?.slice(0,1)?.toUpperCase()}{result?.student_details?.last_name?.slice(1)}
              </b>{" "}
              S/o or D/o <b> {result?.student_details?.father_name?.slice(0,1)?.toUpperCase()}{result?.student_details?.father_name?.slice(1)}</b> bearing
              College Roll No.- {result?.student_details?.registration_number}{" "}
              is a bonafide student of {result?.year_semester} Semester/Year.
              (Batch <b>{result?.batch}</b>)
              <b> {result?.department?.toUpperCase()} Department</b>, under B.Tech
              Programme of this Institute. Class starts from{" "}
              <b>{result?.course_start_date}</b> After completing the usual academic
              procedure, he/she has been enrolled under the 04 years B.Tech
              programme of the Institute.
            </p>
            <div className="flex justify-end print:justify-center">
              <p className="text-right print:text-center">
                Principal/OSD
                <br />
                Motihari College of Engineering,
                <br />
                Motihari.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BonafideCertificate;
