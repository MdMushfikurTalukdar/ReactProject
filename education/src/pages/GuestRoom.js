import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import NavbarNew from "../components/NavbarNew";
import { Box, Button, Divider, Typography, Select, MenuItem, FormControl, InputLabel, TextField, FormHelperText } from "@mui/material";
import { Footer } from "../components/Footer";
import '../App.css';
import { useState } from "react";

// Validation schema
const schema = yup.object().shape({
  purpose: yup.string().required('Purpose is required'),
  toDate: yup.string().required('To date is required'),
  numberOfPersons: yup.number().required('Number of persons is required').min(1, 'At least 1 person').typeError('Number of persons is required')
});

export const GuestRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const today = new Date().toISOString().split('T')[0];
  const [from, setFrom] = useState('');
  const [fromError, setFromError] = useState('');

  const onSubmit = (data) => {
   
    if (String(from.length) === String(0)) {
     
      setFromError("From date is required");
      return;
    }
    console.log(data);
  };

  return (
    <div className="container-fluid">
      <NavbarNew />
      <Box className="bonafide-form" sx={{ padding: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom style={{color: "rgb(107 169 169)"}}>
          Guest Room Allotment Request
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <Typography variant="h6">Registration number</Typography>
            <Typography variant="body1" style={{ marginBottom: "5px" }}>16900120141</Typography>
          </FormControl>

          <FormControl variant="outlined" error={!!errors?.purpose?.message} fullWidth>
            <InputLabel id="purpose-label">Purpose of requesting</InputLabel>
            <Select
              labelId="purpose-label"
              id="purpose"
              label="Select Purpose"
              {...register("purpose")}
              defaultValue=""
               
            >
              <MenuItem value="1">For staying parents</MenuItem>
              <MenuItem value="2">For staying relatives</MenuItem>
              <MenuItem value="3">For staying invited delegate</MenuItem>
              <MenuItem value="4">For staying Alumni</MenuItem>
            </Select>
            {errors.purpose && <FormHelperText>{errors.purpose?.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="normal">
            <TextField
              id="fromDate"
              label="From"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: today,
              }}
              onChange={(e) => {
                setFrom(e.target.value);
                setFromError('');
              }}
              variant="outlined"
              fullWidth
            />
            <p style={{color:"red",fontSize:"0.75rem",fontWeight:"400"}}>{fromError}</p>
          </FormControl>
          

          <FormControl fullWidth variant="outlined" margin="normal">
            <TextField
              id="toDate"
              label="To"
              type="date"
              {...register("toDate")}
              inputProps={{
                min: from,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.toDate}
              helperText={errors.toDate?.message}
              variant="outlined"
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.numberOfPersons?.message}>
            <InputLabel id="numberOfPersons-label">Number of Persons</InputLabel>
            <Select
              labelId="numberOfPersons-label"
              id="numberOfPersons"
              label="Number of Persons"
              {...register("numberOfPersons")}
              defaultValue=""
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
            {errors.numberOfPersons && <FormHelperText>{errors.numberOfPersons.message}</FormHelperText>}
          </FormControl>

          <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '16px', backgroundColor: "rgb(107,169,169)" }}>
            Send Request
          </Button>
        </form>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom style={{color: "rgb(107 169 169)"}}>
          Approved Requests
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Box>
      <Footer />
    </div>
  );
};