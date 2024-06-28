import React, { useEffect } from 'react';
import { Box, TextField, Button, Typography, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import NavbarNew from './NavbarNew';
import Footer from './Home/Footer';
import { RiLockPasswordFill } from "react-icons/ri";

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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function regenerateToken() {
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
      data: data
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
      data: data1
    };

    axios.request(config)
      .then((response) => {
        setTimeout(() => {
          enqueueSnackbar(response.data.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 3000,
          });
        }, 1000);

        setTimeout(() => {
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
        }, 2000);

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavbarNew />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #b5eded 30%, white 70%)',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:"5px"
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: 3,
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <center>
            <HiOutlineExclamationCircle style={{ fontSize: "3.4rem", marginBottom: "20px" }} />
          </center>
          <Typography variant="h4" textAlign="center" mb={2}>
            Change Password
          </Typography>
          <Typography variant="body1" textAlign="center" mb={2}>
            Enter new password and confirm password to change your existing password
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="newPassword"
              name="newPassword"
              type="password"
              label="New Password"
              {...register('newPassword')}
              fullWidth
              margin="normal"
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiLockPasswordFill />
                  </InputAdornment>
                ),
              }}
              required
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              {...register('confirmPassword')}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiLockPasswordFill />
                  </InputAdornment>
                ),
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: 'skyblue',
                color: '#fff',
                '&:hover': { backgroundColor: 'deepskyblue' },
              }}
            >
              Change Password
            </Button>
          </form>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ChangePassword;
