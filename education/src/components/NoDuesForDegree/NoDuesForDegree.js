import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  CardContent,
  Card,
  Box,
  Divider,
} from "@mui/material";
import NavbarNew from "../NavbarNew";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from "../Home/Footer";
import { enqueueSnackbar } from "notistack";

// Validation schema
const schema = yup.object().shape({
  Category: yup.string().required("Category is required"),
  checkbox: yup.boolean().oneOf([true], "Please agree to the terms and conditions"),
});

export function NoDuesForDegree() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const [result, setResult] = useState([]);
  const [responsive, setResponsive] = useState(window.innerWidth < 669);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setResponsive(window.innerWidth < 669);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setResponsive(window.innerWidth < 669);
      });
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://amarnath013.pythonanywhere.com/api/user/profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await axios.get("https://amarnath013.pythonanywhere.com/api/user/overall-no-dues/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        });
        setResult(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (localStorage.getItem("accesstoken")) {
      const decodedToken = jwtDecode(localStorage.getItem("accesstoken"));
      if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
        navigate("/login");
      } else {
        fetchData();
        fetchRequests();
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const requestData = {
      name: `${userProfile?.personal_information?.first_name} ${userProfile?.personal_information?.last_name}` ,
      branch: userProfile?.academic_information?.department,
      father_name: userProfile?.personal_information?.father_name,
      category: data?.Category,
      self_declaration: true,
      status: "applied",
      session: userProfile?.academic_information?.batch,
    };

    try {
      const response = await axios.post("https://amarnath013.pythonanywhere.com/api/user/overall-no-dues/", requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });

      setTimeout(()=>{
        window.location.reload();
      },2000);

      enqueueSnackbar("Request was applied successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });

    } catch (error) {
      console.log(error);
      enqueueSnackbar("The request has already been made.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <>
      <NavbarNew />
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom style={{ width: "100%" }}>
            Overall No Dues Request (For TC)
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            value={`${userProfile?.personal_information?.first_name} ${userProfile?.personal_information?.middle_name} ${userProfile?.personal_information?.last_name}`}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            value={userProfile?.personal_information?.registration_number}
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              value={userProfile?.academic_information?.department || ""}
              disabled
              placeholder="Batch"
            />
            <FormHelperText>{errors.branch?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            value={userProfile?.personal_information?.father_name}
            fullWidth
            disabled
            placeholder="Father name"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            value={userProfile?.academic_information?.batch}
            fullWidth
            placeholder="Session"
            disabled
          />
          <FormHelperText style={{ color: "red" }}>
            {errors?.Session?.message}
          </FormHelperText>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            label="Category"
            fullWidth
            {...register("Category")}
           
          />
          <FormHelperText style={{ color: "red" }}>
            {errors?.Category?.message}
          </FormHelperText>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControlLabel
          sx={{ marginLeft: "2%" }}
          control={<Checkbox name="checkbox" {...register("checkbox")} />}
          label="I declare that all these information are correct and I have no dues in any department/section as per my knowledge."
        />
        {errors.checkbox && (
          <FormHelperText style={{ marginLeft: "16%" }} error>
            {errors.checkbox.message}
          </FormHelperText>
        )}
      </Grid>

      <Grid container justifyContent="center" style={{ padding: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Send Request
        </Button>
      </Grid>

      <Typography
        variant="h5"
        align="center"
        gutterBottom
        style={{ marginTop: "20px" }}
      >
        No Dues Request Status
      </Typography>
      <Divider />

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {result.length === 0 && (
          <Typography
            style={{
              marginBottom: "50px",
              marginTop: "100px",
              fontSize: "1.2rem",
              textAlign:"center"
            }}
          >
            Nothing to show
          </Typography>
        )}
        {result.length > 0 &&
          result.map((data, index) => (
            <Box key={index} style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",maxWidth:"100%",marginTop:"20px"}}>
              <Card
                sx={{
                  minWidth: 275,
                  width:'60vw',
                  marginBottom: 2,
                  backgroundColor: "#D2E9E9",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Request Details
                  </Typography>
                  <Typography variant="body2">
                    Registration Number: {data?.registration_number}
                  </Typography>
                  <Typography variant="h6" component="div">
                    Name: {data?.name}
                  </Typography>
                  <Typography variant="body2">Status: {data?.status}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
      </Box>
      <Footer />
    </>
  );
}

export default NoDuesForDegree;
