import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";


type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  
  } = useForm<FormValues>();
  // const onSubmit = (data: FormValues) => console.log(data);

  


  const onSubmit = async (data: FormValues) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        data,
        { withCredentials: true }
      );

      alert(res.data.message);
      reset();
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong!");
      }
    }
  };


  return (
    <Container component="main" maxWidth="xs" sx={{ height: "80vh" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  //autoComplete="given-name"
                  //name="firstName"
                  //required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  //autoFocus
                  {...register("firstName", {
                    required: "First Name is required"
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  //required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  //name="lastName"
                  //autoComplete="family-name"
                  {...register("lastName", {
                    required: "Last Name is required"
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //required
                  fullWidth
                  id="email"
                  label="Email Address"
                  //name="email"
                  //autoComplete="email"
                  {...register("email", {
                    required: "Email is required"
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //required
                  fullWidth
                  //name="password"
                  label="Password"
                  type="password"
                  id="password"
                  //autoComplete="new-password"
                  {...register("password", {
                    required: "Password is required"
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth margin="normal" error={!!errors.role}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    label="Role"
                    defaultValue=""
                    {...register("role", {
                      required: "Role is required",
                    })}
                  >
                    <MenuItem value="Patient">Patient</MenuItem>
                    <MenuItem value="Doctor">Doctor</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.role?.message}
                  </Typography>
                </FormControl>
             </Grid>


              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to={"/login"}
                  style={{
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
          <DevTool control={control} /> {/* set up the dev tool */}
        </Box>
      </Box>
    </Container>
  );
}
