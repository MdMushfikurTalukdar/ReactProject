import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import NavbarNew from "../components/NavbarNew";
import {
  Box,
  Button,
  Divider,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Footer } from "../components/Footer";
import "../App.css";

// Validation schema
const schema = yup.object().shape({
  // Add your validation schema here
  purpose: yup.string().required("Purpose is required"),
  file: yup.mixed().required("File is required").test("fileType", "Only image files are allowed", (value) => {
      return value && value.length > 0 && ['image/jpeg', 'image/png'].includes(value[0].type);
    })
    .test("isImage", "Only image is required", value => {
      return value && value.length > 0 && ['image/jpeg', 'image/png'].includes(value[0].type);
    }),
  fee: yup.string(),
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
    <div className="container-fluid" style={{ backgroundColor: "whitesmoke" }}>
      <NavbarNew />
      <Box
        className="bonafide-form"
        sx={{ padding: 3, bgcolor: "whitesmoke", borderRadius: 2 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" gutterBottom>
            Purpose
          </Typography>
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.purpose?.message}
          >
            <InputLabel id="purpose-label">Select Purpose</InputLabel>
            <Select
              labelId="purpose-label"
              id="purpose"
              label="Select Purpose"
              {...register("purpose")}
              defaultValue=""
            >
              <MenuItem value="1">Apply for student credit card</MenuItem>
              <MenuItem value="2">Apply for Scholarship</MenuItem>
              <MenuItem value="3">Others</MenuItem>
            </Select>
            {errors.purpose && (
              <FormHelperText>{errors.purpose.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.file?.message}>
            <Typography
              variant="h6"
              gutterBottom
              style={{ marginBottom: "10px" }}
            >
              Supporting Document
            </Typography>

            <Button
              component="label"
              variant="contained"
              style={{
                backgroundColor: "rgb(107 169 169)",
                marginBottom: "5px",
              }}
            >
              <input
                type="file"
                name="file"
                {...register("file")}
                style={{ paddingBottom: "28px", display: "none" }}
              />
              Upload File
            </Button>
            {errors?.file && (
              <FormHelperText>{errors?.file?.message}</FormHelperText>
            )}
          </FormControl>
          <Typography variant="h6" gutterBottom>
            Do you want fee structure also?
          </Typography>
          <Box style={{ display: "flex", gap: "10px" }}>
            <label>
              <input type="radio" name="option" value="yes" /> Yes
            </label>
            <label>
              <input type="radio" name="option" value="yes" /> No
            </label>
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: "16px", backgroundColor: "rgb(107 169 169)" }}
          >
            Send Request
          </Button>
        </form>
        <Divider sx={{ my: 3, color: "black", width: "100vw" }} />
        <Typography variant="h6" gutterBottom>
          Approved Bonafides
        </Typography>
      </Box>
      <Box style={{ position: "fixed", bottom: "0%", width: "100vw" }}>
        <Footer />
      </Box>
    </div>
  );
};

export default BonafideForm;
