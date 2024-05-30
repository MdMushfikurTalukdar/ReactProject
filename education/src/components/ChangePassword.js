import React, { useEffect } from 'react';
import { Box, TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

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
        return enqueueSnackbar(response.data.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 3000,
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh',borderRadius:"20px" }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Typography variant="h4" align="center" gutterBottom style={{color:"rgb(107 169 169)"}}>
            Change Password
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <TextField
                fullWidth
                id="newPassword"
                name="newPassword"
                label="New Password"
                type="password"
                {...register('newPassword')}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                required
              />
            </Box>
            <Button fullWidth color="primary" variant="contained" type="submit" style={{backgroundColor:"rgb(107 169 169)"}}>
              Change Password
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
