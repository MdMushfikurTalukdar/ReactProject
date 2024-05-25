import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import { Header } from "../components/Home/Header";
import Footer from '../components/Home/Footer';
import "./Login.css"
import {
  Button
} from "@mui/material";
import Style from '../components/StyleLogin';

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const navigate=useNavigate();

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
    .then((res) =>{
      enqueueSnackbar(res.data.message, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
      });
      navigate('/dashboard');
      localStorage.setItem('accesstoken',res.data.token.access);
      
    })
    .catch((err) =>{
      
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
    <Header />
    <Style />
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 loginBody">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="roll-number" className="sr-only">Registration no</label>
              <input
                id="roll-number"
                type="text"
                {...register("rollNumber", { required: true })}
                autoComplete="off"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.rollNumber ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Registration no./Employee ID."
              />
              {errors.rollNumber && <p className="text-black-500 text-xs mt-1">Roll Number is required</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                autoComplete="current-password"
                className={`appearance-none rounded-none mt-4 relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {errors.password && <p className="text-black-500 text-xs mt-1">Password is required</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            
            <Button
                    variant="contained"
                    sx={{
                      width: { xs: "100%", sm: "100%" },
                      backgroundColor: "black",
                      textAlign: "start",
                    }}
                    type="submit"
                  >
                    Login
                  </Button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>

    </>
  );
};
