import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import NavbarNew from "../components/NavbarNew";
import {
  Box,
  Button,
  Divider,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Footer  from "../components/Home/Footer";
import "../App.css";
import { enqueueSnackbar } from "notistack";

// Validation schema
const exactTwoDecimalRegex = /^\d+\.\d{2}$/;

const schema = yup.object().shape({
    cgpa: yup
    .string()
    .required('CGPA is required')
    .test(
      'is-decimal',
      'CGPA must be a decimal with exactly 2 decimal places',
      value => value && exactTwoDecimalRegex.test(value)
    )
    .test(
      'is-valid-range',
      'CGPA must be between 0 and 10',
      value => {
        if (value) {
          const numValue = parseFloat(value);
          return numValue >= 0 && numValue <= 10;
        }
        return true;
      }
    ),
  file: yup
    .mixed()
    .test("fileRequired", "File is required", (value) => {
      return !!value.length;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      return (
        !value ||
        (value.length > 0 &&
          ["image/jpeg", "image/png"].includes(value[0].type))
      );
    }),
});

export const HostelRoomRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    enqueueSnackbar('Request sent successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        autoHideDuration: 1000,
      });
  };

  return (
    <div className="container-fluid">
      <NavbarNew />
      <Box
        className="bonafide-form"
        sx={{
          padding: 4,
          borderRadius: 2,
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ color: "rgb(107, 169, 169)", fontWeight: "bold" }}
        >
          Hostel Room Allotment Request
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <Typography variant="h6">Registration / Employee Number</Typography>
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              {localStorage.getItem("RollNumber")}
            </Typography>
          </FormControl>

          <FormControl
            fullWidth
            variant="outlined"
            error={!!errors?.cgpa?.message}
            margin="normal"
          >
            <TextField
              label="Current CGPA"
              type="text"
              {...register("cgpa")}
              error={!!errors.cgpa}
              helperText={errors?.cgpa?.message}
            />
          </FormControl>

          <FormControl fullWidth error={!!errors.file?.message} margin="normal">
            <Box
              sx={{
                display: {lg:"flex",sm:'initial',md:'flex',xs:'initial'},
                gap: "15px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Latest Semester Marksheet
              </Typography>
              <Button
                component="label"
                variant="contained"
                sx={{
                  backgroundColor: "rgb(107, 169, 169)",
                  color: "#fff",
                  "&:hover": { backgroundColor: "rgb(85, 136, 136)" },
                  width: "50%",
                }}
              >
                Upload File
                <input
                  type="file"
                  name="file"
                  {...register("file")}
                  style={{ display: "none" }}
                />
              </Button>
             
            </Box>
            {errors?.file && (
                <FormHelperText>{errors?.file?.message}</FormHelperText>
              )}
          </FormControl>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: "rgb(107, 169, 169)",
              color: "#fff",
              "&:hover": { backgroundColor: "rgb(85, 136, 136)" },
            }}
          >
            Send Request
          </Button>
        </form>
        <Divider sx={{ my: 3 }} />
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "rgb(107, 169, 169)" }}
        >
          Previous Hostel Requests
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          Nothing to show
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Box>
      <Footer />
    </div>
  );
};

export default HostelRoomRequest;
