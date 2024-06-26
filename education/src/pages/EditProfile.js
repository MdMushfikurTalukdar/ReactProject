import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { enqueueSnackbar } from "notistack";
import emailValidator from "email-validator";
import NavbarNew from "../components/NavbarNew";
import { CiEdit } from "react-icons/ci";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  father_name: yup.string().required("Father name is required"),
  middle_name: yup.string(),
  gender: yup.string().required("Gender is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .test("valid-email", "Invalid email format", (value) =>
      emailValidator.validate(value)
    ),
  phone_number: yup
    .number()
    .min(1000000000, "phone no. should be of 10 digit")
    .max(9999999999, "phone no. should be of 10 digits")
    .required("Phone number is required"),
  alternate_phone_number: yup.string(),
  date_of_birth: yup
    .string()
    .matches(
      dateRegex,
      "Date has wrong format. Use one of these formats instead: YYYY-MM-DD."
    )
    .required("Date is required."),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  postal_code: yup
    .number()
    .min(100000, "should contain 6 digits")
    .required("Postal code is required"),
  country: yup.string().required("Country is required"),
  enrollment_date: yup
    .string()
    .matches(
      dateRegex,
      "Enrollment date has wrong format. Use one of these formats instead: YYYY-MM-DD."
    )
    .required("Date is required."),
  program: yup.string().required("Program is required"),
  major: yup.string().required("Major is required"),
  department: yup.string().required("Department is required"),
  batch: yup
    .string()
    .required("Batch is required")
    .test("batch_valid", "Format should be like YYYY-YYYY", (value) => {
      console.log(value);
      if (!value.includes("-")) {
        return false;
      }
      let number1 = value.split("-")[0];
      let number2 = value.split("-")[1];

      if (number1.length !== 4 && number2.length !== 4) {
        return false;
      }
      if (isNaN(number1) || isNaN(number2)) {
        return false;
      }

      return number2 - number1 === 4 || number2 - number1 === 3;
    }),
  current_year: yup
    .string()
    .matches(/^(1|2|3|4)$/, "Current year should be 1, 2, 3, or 4")
    .required("Current year is required"),
  gpa: yup.number().required("GPA is required"),
  course_enrolled: yup.number().required("Course is required"),
});

export const EditProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage?.getItem("accesstoken")) {
      const response = jwtDecode(localStorage?.getItem("accesstoken"));
      if (
        response.token_type !== "access" &&
        response.exp < Math.floor(Date.now() / 1000)
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);
  const [userProfile, setUserProfile] = useState([]);
  const [file, setFile] = useState("");
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/profile/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setUserProfile(response?.data);
        setValue(
          "first_name",
          response.data.personal_information?.first_name || ""
        );
        setValue(
          "last_name",
          response.data.personal_information?.last_name || ""
        );
        setValue(
          "father_name",
          response.data.personal_information?.father_name || ""
        );
        setValue(
          "middle_name",
          response.data.personal_information?.middle_name || ""
        );
        setValue(
          "date_of_birth",
          response.data.personal_information?.date_of_birth || ""
        );
        setValue("gender", response.data.personal_information?.gender || "");
        setValue("email", response.data.contact_information?.email || "");
        setValue(
          "phone_number",
          response.data.contact_information?.phone_number || ""
        );
        setValue(
          "alternate_phone_number",
          response.data.contact_information?.alternate_phone_number || ""
        );
        setValue("address", response.data.contact_information?.address || "");
        setValue("city", response.data.contact_information?.city || "");
        setValue("state", response.data.contact_information?.state || "");
        setValue(
          "postal_code",
          response.data.contact_information?.postal_code || ""
        );
        setValue("country", response.data.contact_information?.country || "");
        setValue(
          "enrollment_date",
          response.data.academic_information?.enrollment_date || ""
        );
        setValue("program", response.data.academic_information?.program || "");
        setValue("major", response.data.academic_information?.major || "");
        setValue(
          "current_year",
          response.data.academic_information?.current_year || ""
        );
        setValue("gpa", response.data.academic_information?.gpa || "");
        setValue(
          "department",
          response.data.academic_information?.department || ""
        );
        setValue("batch", response.data.academic_information?.batch || "");
        setValue(
          "course_enrolled",
          response.data.academic_information?.course_enrolled || ""
        );
      })

      .catch((error) => {
        console.log(error);
      });
  }, [setValue]);

  // console.log(errors);

  const UpdateSubmit = (data) => {
    console.log(file);

    const formData = new FormData();
    formData.append("personal_information.first_name", data.first_name);
    formData.append("personal_information.last_name", data.last_name);
    formData.append("personal_information.father_name", data.father_name);
    formData.append("personal_information.middle_name", data.middle_name);
    formData.append("personal_information.date_of_birth", data.date_of_birth);
    formData.append("personal_information.gender", data.gender);
    if (file) {
      formData.append("personal_information.profile_picture", file);
    }

    // Append contact information
    formData.append("contact_information.email", data.email);
    formData.append("contact_information.phone_number", data.phone_number);
    formData.append(
      "contact_information.alternate_phone_number",
      data.alternate_phone_number
    );
    formData.append("contact_information.address", data.address);
    formData.append("contact_information.city", data.city);
    formData.append("contact_information.state", data.state);
    formData.append("contact_information.postal_code", data.postal_code);
    formData.append("contact_information.country", data.country);

    // Append academic information
    formData.append(
      "academic_information.enrollment_date",
      data.enrollment_date
    );
    formData.append("academic_information.program", data.program);
    formData.append("academic_information.major", data.major);
    formData.append("academic_information.current_year", data.current_year);
    formData.append("academic_information.gpa", data.gpa);
    formData.append("academic_information.department", data.department);
    formData.append("academic_information.batch", data.batch);
    formData.append(
      "academic_information.course_enrolled",
      data.course_enrolled
    );

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "https://amarnath013.pythonanywhere.com/api/user/profile/",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar(response.data.message, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        });
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    let url = URL.createObjectURL(e.target.files[0]);
    setImgPreview(url);
  };
  return (
    <Box style={{ fontFamily: "Math", minHeight: "100vh" }}>
      <NavbarNew />
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box
            className=" mt-3 w-full lg:p-10 sm:p-5 p-5"
            style={{ height: "calc(100vh - 5px)", overflowY: "scroll" }}
          >
            <Box>
              <Typography variant="p" className="text-xl">
                Profile
              </Typography>
            </Box>

            <Box className="text-center">
              <label component="label">
                {!imgPreview &&
                userProfile?.personal_information?.profile_picture !== null ? (
                  <img
                    src={userProfile?.personal_information?.profile_picture}
                    alt="Loading..."
                    style={{
                      width: "150px",
                      height: "150px",
                      margin: "10px 0px 10px 40px",
                      borderRadius: "50%",
                    }}
                  />
                ) : imgPreview ? (
                  <img
                    src={imgPreview}
                    alt="description"
                    style={{
                      width: "150px",
                      height: "150px",
                      margin: "10px 0px 10px 40px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <img
                    src="https://mui.com/static/images/avatar/2.jpg"
                    alt=""
                    className="lg:w-[10%] w-[40%] sm:w-[25%] md:w-[15%] h-auto text-center"
                    style={{ borderRadius: "50%" }}
                  />
                )}
                <CiEdit style={{ fontSize: "1.2rem" }} />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
            </Box>

            <form onSubmit={handleSubmit(UpdateSubmit)}>
              <Box className="lg:p-10 sm:p-5 p-5">
                <div className="flex justify-between">
                  <Box className="flex justify-between">
                    <Typography variant="p text-xl mx-auto mb-10">
                      Basic details
                    </Typography>
                  </Box>
                </div>
                <Grid container className="mt-10">
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <Typography variant="p">Registration No.</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    {userProfile.personal_information?.registration_number}
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">First Name</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("first_name")}
                      error={!!errors.first_name}
                      helperText={errors.first_name?.message}
                    />
                  </Grid>
                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Middle Name</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("middle_name")}
                      error={!!errors.middle_name}
                      helperText={errors.middle_name?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Last Name</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("last_name")}
                      error={!!errors.last_name}
                      helperText={errors.last_name?.message}
                    />
                  </Grid>
                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Father Name</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("father_name")}
                      error={!!errors.father_name}
                      helperText={errors.father_name?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />

                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">DOB</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("date_of_birth")}
                      error={!!errors.date_of_birth}
                      helperText={errors.date_of_birth?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Gender</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("gender")}
                      error={!!errors.gender}
                      helperText={errors.gender?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box className="lg:p-10 sm:p-5 p-5">
                <Typography variant="p text-xl mx-auto mb-10">
                  Contact Information
                </Typography>
                <Grid container className="mt-10">
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <Typography variant="p">Email</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="email"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Phone no.</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="number"
                      {...register("phone_number")}
                      error={!!errors.phone_number}
                      helperText={errors.phone_number?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Alternate phone no</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="number"
                      {...register("alternate_phone_number")}
                      error={!!errors.alternate_phone_number}
                      helperText={errors.alternate_phone_number?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Address</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("address")}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">City</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("city")}
                      error={!!errors.city}
                      helperText={errors.city?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">State</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("state")}
                      error={!!errors.state}
                      helperText={errors.state?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Postal Code</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("postal_code")}
                      error={!!errors.postal_code}
                      helperText={errors.postal_code?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Country</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("country")}
                      error={!!errors.country}
                      helperText={errors.country?.message}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box className="lg:p-10 sm:p-5 p-5">
                <Typography variant="p text-xl mx-auto mb-10">
                  Academic Information
                </Typography>
                <Grid container className="mt-10">
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <Typography variant="p">Registration_number</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <Typography variant="p">
                      {userProfile?.academic_information?.registration_number}
                    </Typography>
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Enrollment_date</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("enrollment_date")}
                      error={!!errors.enrollment_date}
                      helperText={errors.enrollment_date?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Program</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("program")}
                      error={!!errors.program}
                      helperText={errors.program?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Major</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("major")}
                      error={!!errors.major}
                      helperText={errors.major?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Current year</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("current_year")}
                      error={!!errors.current_year}
                      helperText={errors.current_year?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">GPA</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("gpa")}
                      error={!!errors.gpa}
                      helperText={errors.gpa?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Department</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("department")}
                      error={!!errors.department}
                      helperText={errors.department?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Batch</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="text"
                      {...register("batch")}
                      error={!!errors.batch}
                      helperText={errors.batch?.message}
                    />
                  </Grid>

                  <Divider style={{ width: "100%", margin: "10px 0" }} />
                  <Grid
                    item
                    lg={4}
                    sm={12}
                    xs={12}
                    md={12}
                    style={{ marginTop: "10px" }}
                  >
                    <Typography variant="p">Course enrolled</Typography>
                  </Grid>
                  <Grid item lg={4} sm={12} xs={12} md={12}>
                    <TextField
                      type="number"
                      {...register("course_enrolled")}
                      error={!!errors.course_enrolled}
                      helperText={errors.course_enrolled?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
              <center>
                <Button
                  variant="contained"
                  type="submit"
                  style={{ marginBottom: "40px" }}
                >
                  Update
                </Button>
              </center>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
