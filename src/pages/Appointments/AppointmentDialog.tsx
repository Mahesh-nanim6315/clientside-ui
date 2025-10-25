import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchInput from "../../components/SearchInput";
import { useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import axios from "axios";



type FormValues = {
  id: string;
  full_name: string;
  gender: string;
  phone: string;
  age: string;
  appointment_date: string;
  referred_by_doctor: string;
  assigned_doctor: string;
  status: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppointmentDialog({
  appointments,
  setAppointments,
}: any) {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


const onSubmit = async (data: FormValues) => {
  const payload = {
    full_name: data.full_name,
    gender: data.gender,
    phone: data.phone,
    age: parseInt(data.age),
    referred_by_doctor: data.referred_by_doctor,
    assigned_doctor: data.assigned_doctor,
    appointment_date: data.appointment_date,
    status: data.status,
  };

  try {
    await axios.post("http://localhost:5000/api/appointments", payload, {
      withCredentials: true,
    });
    alert("✅ Appointment created");
    handleClose();
  } catch (err) {
    console.error("❌ Error creating appointment:", err);
    alert("Failed to create appointment");
  }
};


  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <SearchInput />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Book an Appointment
        </Button>
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth="xs"
        fullWidth
        sx={{ height: "100%" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Appointment Details</DialogTitle>

          <DialogContent dividers>
            <TextField
              margin="dense"
              id="fullName"
              label="Full Name"
              type="fullName"
              fullWidth
              variant="outlined"
              {...register("full_name", {
                required: "Name is required",
              })}
              error={!!errors.full_name}
              helperText={errors.full_name?.message}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                id="gender"
                label="Gender"
                {...register("gender")}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="phone"
              label="Phone no"
              type="phone"
              fullWidth
              variant="outlined"
              placeholder="0 123456789"
              {...register("phone", {
                required: "Phone no is required",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              margin="dense"
              id="age"
              label="Age"
              type="age"
              fullWidth
              variant="outlined"
              placeholder="ex: 18"
              {...register("age", {
                required: "Age is required",
              })}
              error={!!errors.age}
              helperText={errors.age?.message}
            />


        <Controller
          name="appointment_date"
          control={control}
          rules={{ required: "Appointment date is required" }}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Appointment Date"
                value={field.value ? dayjs(field.value) : null} 
                onChange={(date) => field.onChange(date ? date.format("YYYY-MM-DD") : "")}
                sx={{ width: "100%" }}
                slotProps={{
                  textField: {
                    error: !!errors.appointment_date,
                    helperText: errors.appointment_date?.message,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />

            
            <TextField
              margin="dense"
              id="referred_by_doctor"
              label="Referred By Doctor"
              type="referred_by_doctor"
              fullWidth
              variant="outlined"
              placeholder="ex: Dr. Smith"
              {...register("referred_by_doctor", {
                required: "Specialist is required",
              })}
              error={!!errors.referred_by_doctor}
              helperText={errors.referred_by_doctor?.message}
            />
            <TextField
              margin="dense"
              id="assignedDoctor"
              label="Assigned Doctor"
              type="assignedDoctor"
              fullWidth
              variant="outlined"
              placeholder="ex: Dr. Smith"
              {...register("assigned_doctor", {
                required: "Assigned Doctor is required",
              })}
              error={!!errors.assigned_doctor}
              helperText={errors.assigned_doctor?.message}
            />

            <FormControl fullWidth margin="dense">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  defaultValue=""
                  {...register("status", { required: "Status is required" })}
                  error={!!errors.status}
                >
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
