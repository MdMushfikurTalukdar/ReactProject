import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import '../App.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterUser = () => {

    const [responsive, setResponsive] = useState(window.innerWidth < 900 ? true : false); // Check if the screen is smaller than 1024
    const navigate=useNavigate();
    
    useEffect(() => {

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize)
        };
    }, []);

    const resize = () => {
        setResponsive(window.innerWidth < 900 ? true : false);
    }

    const schema=yup.object().shape({
      
      firstname: yup.string().required('firstname is required'),
      lastname: yup.string().required('lastname is required'),
      email:yup.string().email('email is invalid').required('email is required'),
      password:yup.string().min(8,'password must be at least 8 characters').max(15,"password cannot exceed 24 characters")
                .required("password is required")

    })
    const { reset, register, handleSubmit, formState: { errors } } = useForm({
        resolver:yupResolver(schema)
    })

    const onSubmit=async(data)=>{
      console.log(data);
      reset();
    }
    return (
        <div className="App" >
            {responsive && <div className='parentdiv_small_screen'>
                <img src='../images/logo.png' alt='' style={{ height: "auto", width: "70px" }} />
                <div className='children1_small_screen'>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={9} lg={9} className='parentGrid_small_screen'>
                            <h2 style={{ marginRight: "35%" }}>Create Account</h2>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Box>
                                    <TextField
                                        type='text'
                                        label='Email'
                                        placeholder='johndoe@gmail.com'
                                        required
                                        sx={{
                                            width: { lg: '50%', md: "50%", sm: "50%", xs: "80%" },
                                            marginTop: "12px"
                                        }}
                                        {...register('email')}
                                        helperText={errors.email?.message}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        type='text'
                                        label='Email'
                                        placeholder='johndoe@gmail.com'
                                        required
                                        sx={{
                                            width: { lg: '50%', md: "50%", sm: "50%", xs: "80%" },
                                            marginTop: "12px"
                                        }}
                                        {...register('email')}
                                        helperText={errors.email?.message}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        type='password'
                                        label='password'
                                        placeholder='password...'
                                        required
                                        sx={{
                                            width: { lg: '50%', md: "50%", sm: "50%", xs: "80%" },
                                            marginBottom: "10px",
                                            marginTop: "10px"
                                        }}
                                        {...register('password')}
                                        helperText={errors.password?.message}
                                    />

                                </Box>
                                <Button variant='contained' sx={{ width: { xs: "85%", sm: "50%" }, backgroundColor: "black", textAlign: "start" }} type='submit'>Create Account</Button>
                            </form>
                            
                            <p style={{ fontSize: "0.8rem" }}>Already have an account? <span style={{ color: "violet" }}>Login</span></p>


                            <Divider component="span" role="presentation" className='Divider'>
                                <Typography >or</Typography>
                            </Divider>

                            <Box container sx={{ display: "flex", gap: "5px", justifyContent: { xs: "center", sm: "center" }, width: "100vw", marginTop: "20px", marginLeft: "-5%" }}>

                                <Button variant='outlined' startIcon={<GoogleIcon />}> Google</Button>
                                <Button variant='outlined' startIcon={<FacebookIcon />}> facebook</Button>

                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </div>
            }

            {!responsive &&
                <Grid container style={{ height: "100vh", backgroundColor: "#6c42ec" }}>
                    <Grid item xs={12} sm={12} md={3} lg={3} style={{ backgroundColor: "#6c42ec" }}>
                        <div style={{ color: 'white' }}>
                            <h1 className='largeScreen_typography'> Stay on top of
                            </h1>
                            <h1 className='largeScreen_typography1'>time tracking</h1>

                            <img src='../images/register_page_icon.png' className='img' alt='' />

                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={9} className='parentGrid_largeScreen'>
                        <h2 style={{ marginRight: "35%", marginTop: "60px" }}>Create Account</h2>
                        
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <Box>
                            <TextField
                                type='text'
                                label='Resistation Number'
                                placeholder='0123442'
                                required
                                sx={{
                                    width: '50%',
                                    marginTop: "12px"
                                }}
                                {...register('email')}
                                helperText={errors?.email?.message}
                            />
                        </Box>
                        <Box>
                            <TextField
                                type='password'
                                label='Password'
                                placeholder='password...'
                                required
                                sx={{
                                    width: '50%',
                                    marginTop: "12px"
                                }}
                                {...register('email')}
                                helperText={errors?.email?.message}
                            />
                        </Box>
                        <Box>
                            <TextField
                                type='password'
                                label='Confirm Password'
                                placeholder='confirm password...'
                                required
                                sx={{
                                    width: '50%',
                                    marginBottom: "10px",
                                    marginTop: "10px"
                                }}
                                {...register('password')}
                                helperText={errors?.password?.message}
                            />
                        </Box>
                        <Box>
                            <TextField
                                type='text'
                                label='Student'
                                placeholder='student'
                                disabled
                                defaultValue={"student"}
                                sx={{
                                    width: '50%',
                                    marginBottom: "10px",
                                    marginTop: "10px"
                                }}
                                {...register('password')}
                                helperText={errors?.password?.message}
                            />
                        </Box>
                        <Button variant='contained' style={{ width: "50%", backgroundColor: "black", textAlign: "start" }} type='submit'>Create Account</Button>
                        </form>

                        <p style={{ fontSize: "0.8rem" }}>Already have an account? <span onClick={(e)=>navigate('/login')} style={{ color: "violet" }}>Login</span></p>


                        <Divider component="span" role="presentation" className='Divider'>
                            <Typography >or</Typography>
                        </Divider>

                        <Box className='icon_button'>
                            <Button variant='outlined' startIcon={<GoogleIcon />}> Google</Button>
                            <Button variant='outlined' startIcon={<FacebookIcon />}>Facebook</Button>
                        </Box>
                    </Grid>
                </Grid>
            }

        </div>

    );
}