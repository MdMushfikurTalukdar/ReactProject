import React, { useEffect } from 'react';
import { Box, TextField, Button, Grid, Typography, Paper, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import NavbarNew from './NavbarNew';
import { Footer } from './Footer';


const validationSchema = yup.object({
  newPassword: yup
    .string('Enter your new password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('New password is required'),
  confirmPassword: yup
    .string('Confirm your new password')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const ChangePassword = () => {

  const { enqueueSnackbar } = useSnackbar();
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function regenerateToken(){
    let data = JSON.stringify({
      "refresh": localStorage.getItem('refreshtoken')
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://amarnath013.pythonanywhere.com/api/user/token/refresh/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      localStorage.setItem('refreshtoken', response.data.refresh);
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
  const onSubmit = (data) => {
    let data1 = JSON.stringify({
        "password": data.newPassword,
        "password2": data.confirmPassword
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://amarnath013.pythonanywhere.com/api/user/change-password/',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
        },
        data : data1
      };
      
      axios.request(config)
      .then((response) => {
        
        setTimeout(()=>{
            enqueueSnackbar(response.data.message, {
                variant: "success",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                autoHideDuration: 3000,
              });
        },1000); 

        setTimeout(()=>{
            enqueueSnackbar('Logging out', {
                variant: "info",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                autoHideDuration: 3000,
              });
              localStorage?.removeItem('accesstoken');
              localStorage?.removeItem('refreshtoken');

        },2000); 

        setTimeout(()=>{
            navigate('/login');
        },3000)
       
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <NavbarNew/>
    <div className="flex justify-center items-center min-h-screen font-sans bg-gray-100">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl">
      <center>
        <HiOutlineExclamationCircle style={{fontSize:"3.4rem",marginBottom:"20px"}}/>
      </center>
      <h2 className="text-3xl font-semibold text-center mb-6 ">Change Password</h2>
      <p style={{textAlign:"center"}}>Enter new password and confirm password</p><p style={{textAlign:"center",marginBottom:"20px"}}>to change your password</p>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
         
          <TextField
            id="newPassword"
            name="newPassword"
            type="password"
             label='password'
            {...register('newPassword')}
            sx={{
              width: "100%",
            }}
          
            required
          />
          {errors.newPassword && <p className="mt-2 text-sm text-red-600">{errors.newPassword.message}</p>}
        </div>
        <div className="mb-4">
         
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            label='Confirm-password'
            sx={{
              width: "100%",
            }}
            required
          />
          {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
        </div>
        <Button type="submit" variant='contained' className="w-full py-2 px-4 bg-blue-500 text-white font-medium text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Change Password
        </Button>
      </form>
    </div>
  </div>
  <Footer/>
  </>
  );
};

export default ChangePassword;