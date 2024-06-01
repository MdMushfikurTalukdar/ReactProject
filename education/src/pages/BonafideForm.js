import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import NavbarNew from "../components/NavbarNew";
import { Box, Button, Divider, Typography, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from "@mui/material";
import { Footer } from "../components/Footer";
import '../App.css';

// Validation schema
const schema = yup.object().shape({
  // Add your validation schema here
  purpose:yup.string().required('this is required'),
  file:yup.string().required('this is required'),
  fee:yup.string()
});

export const BonafideForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <div className="container-fluid" style={{backgroundColor:"whitesmoke"}}>
      <NavbarNew />
      <Box className="bonafide-form" sx={{ padding: 3,  bgcolor: 'whitesmoke', borderRadius: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" gutterBottom >Purpose</Typography>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="purpose-label" >Select Purpose</InputLabel>
            <Select
              labelId="purpose-label"
              id="purpose"
              label="Select Purpose"
              {...register("purpose")}
              defaultValue=""
              error={!!errors.purpose}
            >
              <MenuItem value="1">Purpose 1</MenuItem>
              <MenuItem value="2">Purpose 2</MenuItem>
              <MenuItem value="3">Purpose 3</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom style={{marginBottom:"15px"}}>Supporting Document</Typography>

          <Button component='label' variant="contained" style={{backgroundColor:"rgb(107 169 169)",marginBottom:"15px"}}>
          <input type="file" name="file" {...register("file")} style={{ paddingBottom: '28px', display: 'none' }} />
            Upload File
          </Button>
         

          <Typography variant="h6" gutterBottom>Do you want fee structure also?</Typography>
          <FormControlLabel
            control={<Checkbox {...register("fee")} />}
            label="Yes"
          
          />
           <FormControlLabel
            control={<Checkbox {...register("fee")} />}
            label="No"
          
          />

          <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '16px',backgroundColor:"rgb(107 169 169)" }}>
            Send Request
          </Button>
        </form>
        <Divider sx={{ my: 3, color:"black",width:"100vw" }} />
        <Typography variant="h6" gutterBottom>Approved Bonafides</Typography> 
      </Box>
      <Box style={{position:"fixed",bottom:"0%",width:"100vw"}}>
      <Footer  />
      </Box>
    </div>
  );
}

export default BonafideForm;
