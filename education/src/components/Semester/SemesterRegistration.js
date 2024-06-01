import React from 'react'
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Select, MenuItem } from '@mui/material';
import "../../App.css";
import {NavbarNew} from "../NavbarNew"
import {Footer} from "../Footer"
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function SemesterRegistration() {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage?.getItem("accesstoken")) {
          const response = jwtDecode(localStorage?.getItem("accesstoken"));
          if (
            response.token_type !== "access" 
            && response.exp<Math.floor(Date.now() / 1000)
          ) {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
    
      
      }, []);

  return (
    <>
      <NavbarNew />
      <div style={{ marginLeft: "15%", marginTop: "40px", paddingBottom:"80px" }}>
        <h2 style={{ marginRight: "35%", marginTop: "20px", color: "rgb(107 169 169)" }}>
          Semester Registration
        </h2>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="text"
                label="Name"
                value="akkas"
                readOnly
                sx={{
                  width: "70%",
                  marginTop: "12px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="text"
                label="Registration No"
                value={"12343435"}
                readOnly
                sx={{
                  width: "70%",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="text"
                label="Branch"
                value="some"
                readOnly
                sx={{
                  width: "70%",
                  marginTop: "12px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="text"
                label="Session"
                value={"some"}
                readOnly
                sx={{
                  width: "70%",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <Select
                    labelId="semester-label"
                    id="semester"
                    value={""} // Set the initial value to an empty string
                    renderValue={(value) => value === "" ? "Choose Semester" : value} // Display "Choose Semester" if the value is empty
                    displayEmpty
                    sx={{
                    width: "70%",
                    marginBottom: "10px",
                    }}
                >
                    <MenuItem value={""} disabled>
                    Choose Semester
                    </MenuItem>
                    <MenuItem value={"1"}>Semester 1</MenuItem>
                    <MenuItem value={"2"}>Semester 2</MenuItem>
                    <MenuItem value={"3"}>Semester 3</MenuItem>
                </Select>
            </Grid>
        </Grid>
{/* subject list */}
          
            <h2 style={{ marginRight: "35%", marginTop: "20px", color: "rgb(107 169 169)" }}>
                Subject List
            </h2>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField
                    type="text"
                    label="Subject"
                    value="subject 1"
                    readOnly
                    sx={{
                        width: "80%",
                        marginTop: "12px",
                    }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                    type="text"
                    label="Subject"
                    value="subject 2"
                    readOnly
                    sx={{
                        width: "80%",
                        marginTop: "12px",
                    }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                    type="text"
                    label="Subject"
                    value="subject 3"
                    readOnly
                    sx={{
                        width: "80%",
                        marginTop: "12px",
                    }}
                    />
                </Grid>
            </Grid>

            <Button
                variant="contained"
                sx={{
                    marginTop: "2%",
                    width: "34%",
                    backgroundColor: "rgb(107 169 169)",
                    textAlign: "left",
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
                type="submit"
                >
                Send Request
            </Button>
        </form>
        {/* Previout Semster */}
        <h2 style={{ marginRight: "35%", marginTop: "20px", color: "rgb(107 169 169)" }}>
            Previous Semester Registration
        </h2>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="text"
                label="Senester No"
                value={"semester 1"}
                readOnly
                sx={{
                  width: "70%",
                  marginTop: "12px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                type="text"
                label="Date"
                value={"10-10-2024"}
                readOnly
                sx={{
                  width: "70%",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              />
            </Grid>
        </Grid>
      </div>
        
      <Footer/>
    </>
  )
}

export default SemesterRegistration;