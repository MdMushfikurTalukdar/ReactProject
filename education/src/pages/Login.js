import React from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import { Header } from "../components/Home/Header";
import Footer from '../components/Home/Footer';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";

import {
  Box,
  Button,
  InputAdornment,
  TextField
} from "@mui/material";
import Style from '../components/StyleLogin';
import { RiLockPasswordFill } from 'react-icons/ri';

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    let data1 = JSON.stringify({
      "registration_number": data.rollNumber,
      "password": data.password,
    });

    axios({
      url: "https://amarnath013.pythonanywhere.com/api/user/login/",
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data1,
    })
      .then((res) => {
        enqueueSnackbar(res.data.message, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          autoHideDuration: 3000,
        });
        navigate('/dashboard');
        localStorage.setItem('RollNumber', data.rollNumber);
        localStorage.setItem('accesstoken', res.data.token.access);
        localStorage.setItem('refreshtoken', res.data.token.refresh);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.response.data.error.non_fields_errors[0], {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          autoHideDuration: 3000,
        });
      });

    reset();
  };

  return (
    <>
      <Style />
      <Header />

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 loginBody">
        <Box className="max-w-md w-full space-y-8" sx={{ boxShadow: { lg: 3, md: 3, sm: 3, xs: 0,borderRadius: '16px',
            padding: '32px',width: '100%',
            maxWidth: '400px' }}}>
           <center>
           <img src='./images/login.png' alt='' style={{width:"150px",textAlign:"center",height:"auto"}}/>
          </center>   
         
            <p className="text-center text-3xl text-gray-900 textSign" style={{marginTop:"-16px",marginBottom:"20px"}}>Welcome Back !!</p>
            <p className="text-center text-md text-gray-900 textSign" style={{marginTop:"-16px"}}>Sign in to your account</p>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="roll-number" className="sr-only">Registration no.</label>
                <TextField
                  id="roll-number"
                  type="text"
                  label="Registration no./Employee ID."
                  fullWidth
                  {...register("rollNumber", { required: true })}
                  autoComplete="off"
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.rollNumber ? 'border-red-500' : 'border-gray-300'} placeholder-blue-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Registration no./Employee ID."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CgProfile />
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.rollNumber && <p className="text-black-500 text-xs mt-1 textSign">Regestration No./Employee Id is required</p>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <TextField
                  id="password"
                  type="password"
                  label="password"
                  {...register("password", { required: true })}
                  fullWidth
                  autoComplete="current-password"
                  sx={{ marginTop: "14px" }}
                  placeholder="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RiLockPasswordFill />
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && <p className="text-black-500 text-xs mt-1 textSign">Password is required</p>}
              </div>
            </div>

            <div>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  color: "#fff",
                  backgroundColor: "rgb(107, 169, 169)",
                  "&:hover": { backgroundColor: "rgb(85, 136, 136)" },
                }}
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </Box>
      </div>
      <Footer />
    </>
  );
};
