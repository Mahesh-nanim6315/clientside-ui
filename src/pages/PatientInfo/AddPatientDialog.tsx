import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import AddIcon from "@mui/icons-material/Add";
import SearchInput from "../../components/SearchInput";
import { Patient } from "../../types/Patient";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PatientSchema = Yup.object().shape({
  full_name: Yup.string().required("Name is required"),
  age: Yup.number().min(0, "Age must be positive").required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  referred_by_doctor: Yup.string().required("Doctor name is required"),
  date_of_entry: Yup.date().required("Date is required"),
  status: Yup.string().required("Status is required"),
});

export default function AddPatientDialog({ patients, setPatients, handleChange }: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues: Patient = {
    id: 0,
    full_name: "",
    age: 0,
    gender: "",
    address: "",
    referred_by_doctor: "",
    date_of_entry: dayjs().format("YYYY-MM-DD"),
    status: "In Treatment",
  };

  const handleSubmit = async (values: Patient) => {
    try {
      const payload = {
        ...values,
        date_of_entry: dayjs(values.date_of_entry).format("YYYY-MM-DD"),
      };

      const res = await axios.post("http://localhost:5000/api/patients", payload, {
        withCredentials: true,
      });

      setPatients((prev: Patient[]) => [...prev, { ...payload, id: res.data.id }]);
      handleClose();
    } catch (err) {
      console.error("Error saving patient:", err);
    }
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <SearchInput handleChange={handleChange} />
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Add Patient
        </Button>
      </Stack>

      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} maxWidth="xs" fullWidth>
        <Formik initialValues={initialValues} validationSchema={PatientSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <form onSubmit={(e) => {
              e.preventDefault();
              // The Formik's handleSubmit will be called automatically
            }}>
              <DialogTitle>Add Patient</DialogTitle>
              <DialogContent dividers>
                <Field
                  as={TextField}
                  name="full_name"
                  label="Full Name"
                  fullWidth
                  margin="dense"
                  error={!!errors.full_name && touched.full_name}
                  helperText={touched.full_name && errors.full_name}
                />

                <FormControl fullWidth margin="dense" error={!!errors.gender && touched.gender}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {touched.gender && errors.gender && (
                    <FormHelperText>{errors.gender}</FormHelperText>
                  )}
                </FormControl>

                <Field
                  as={TextField}
                  name="address"
                  label="Address"
                  fullWidth
                  margin="dense"
                  placeholder="ex: street name, number, postal code"
                  error={!!errors.address && touched.address}
                  helperText={touched.address && errors.address}
                />

                <Field
                  as={TextField}
                  name="age"
                  label="Age"
                  type="number"
                  fullWidth
                  margin="dense"
                  error={!!errors.age && touched.age}
                  helperText={touched.age && errors.age}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Entry"
                    value={dayjs(values.date_of_entry)}
                    onChange={(date) => setFieldValue("date_of_entry", date?.toDate())}
                    sx={{ width: "100%", marginTop: "16px" }}
                    slotProps={{
                      textField: {
                        error: !!errors.date_of_entry && touched.date_of_entry,
                        helperText: touched.date_of_entry && errors.date_of_entry,
                      },
                    }}
                  />
                </LocalizationProvider>

                <Field
                  as={TextField}
                  name="referred_by_doctor"
                  label="Referred By Doctor"
                  fullWidth
                  margin="dense"
                  placeholder="ex: Dr. Smith"
                  error={!!errors.referred_by_doctor && touched.referred_by_doctor}
                  helperText={touched.referred_by_doctor && errors.referred_by_doctor}
                />

                <FormControl fullWidth margin="dense" error={!!errors.status && touched.status}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="In Treatment">In Treatment</MenuItem>
                    <MenuItem value="Discharged">Discharged</MenuItem>
                  </Select>
                  {touched.status && errors.status && (
                    <FormHelperText>{errors.status}</FormHelperText>
                  )}
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained">Submit</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}