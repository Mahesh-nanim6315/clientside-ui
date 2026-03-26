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
import axios from "axios";
import { Doctor } from "../../types/Doctor";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

type Props = {
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DoctorSchema = Yup.object().shape({
  full_name: Yup.string().required("Name is required"),
  gender: Yup.string().required("Gender is required"),
  phone: Yup.string().required("Phone no is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  education: Yup.string().required("Education is required"),
  specialist: Yup.string().required("Specialist is required"),
});

export default function AddDoctorDialog({ doctors, setDoctors }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues: Doctor = {
    id: 0,
    full_name: "",
    gender: "",
    phone: "",
    email: "",
    education: "",
    specialist: "",
  };

  const handleSubmit = async (values: Doctor) => {
    try {
      const res = await axios.post("http://localhost:5000/api/doctors", values);
      setDoctors((prev) => [...prev, { ...values, id: res.data.id }]);
      handleClose();
    } catch (err) {
      console.error("Error adding doctor:", err);
    }
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <SearchInput />
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Add doctor
        </Button>
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth="xs"
        fullWidth
      >
        <Formik<Doctor>
          initialValues={initialValues}
          validationSchema={DoctorSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, values }) => (
            <form>
              <DialogTitle>Add Doctor</DialogTitle>
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
                  name="phone"
                  label="Phone no"
                  fullWidth
                  margin="dense"
                  placeholder="0123456789"
                  error={!!errors.phone && touched.phone}
                  helperText={touched.phone && errors.phone}
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Email Address"
                  fullWidth
                  margin="dense"
                  placeholder="ex: test@test.com"
                  error={!!errors.email && touched.email}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  name="education"
                  label="Education"
                  fullWidth
                  margin="dense"
                  placeholder="ex: MBBS, MD"
                  error={!!errors.education && touched.education}
                  helperText={touched.education && errors.education}
                />
                <Field
                  as={TextField}
                  name="specialist"
                  label="Specialist"
                  fullWidth
                  margin="dense"
                  placeholder="ex: Cardiologist, Dentist"
                  error={!!errors.specialist && touched.specialist}
                  helperText={touched.specialist && errors.specialist}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
