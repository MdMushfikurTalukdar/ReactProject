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
  fromDate: yup.string().required('Date is required'),
  toDate: yup.date().required('To date is required').typeError('Date is required')
    .test('is-after-fromDate', 'You need to set the "From" date first', function(value) {
      const { fromDate } = this.parent;
      return !fromDate ? !value : true; // If "fromDate" is not set, "toDate" should not be set.
    }),
  numberOfPersons: yup.number().required('Number of persons is required').min(1, 'At least 1 person').typeError('Number of persons is required')
});

export const GuestRoom = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    resolver: yupResolver(schema),
  });

  const today = new Date().toISOString().split('T')[0];
  const [from, setFrom] = useState('');

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  const handleFromDateChange = (e) => {
    setFrom(e.target.value);
    // Trigger validation when fromDate changes
    trigger("fromDate");
  };

  return (
    <div className="container-fluid">
      <NavbarNew />
      <Box className="bonafide-form" sx={{ padding: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom  style={{color:"rgb(107 169 169)"}}>Guest Room Allotment Request</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth variant="outlined" margin="normal">
           <Typography variant="h6">Registration number</Typography>
           <Typography variant="p" style={{marginBottom:"5px"}}>16900120141</Typography>
          </FormControl>

          <FormControl fullWidth variant="outlined" error={!!errors?.purpose?.message}>
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
             
              {...register("fromDate")}

              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: today,
              }}
              onChange={handleFromDateChange}
              error={!!errors.fromDate}
              helperText={errors.fromDate?.message}
              variant="outlined"
              fullWidth
            />
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

          <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '16px',backgroundColor:"rgb(107,169,169)"}} >
            Send Request
          </Button>
        </form>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom style={{color:"rgb(107 169 169)"}}>Approved Requests</Typography>
        <Divider sx={{ mb: 3 }} />
      </Box>
      <Footer />
    </div>
  );
}
