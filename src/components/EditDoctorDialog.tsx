import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Slide,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import axios from "axios";
import { Doctor } from "../types/Doctor";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

type Props = {
  open: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  onUpdate: (updated: Doctor) => void;
};

const DoctorSchema = Yup.object().shape({
  full_name: Yup.string().required("Name is required"),
  gender: Yup.string().required("Gender is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  education: Yup.string().required("Education is required"),
  specialist: Yup.string().required("Specialist is required"),
});


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function EditDoctorDialog({ open, onClose, doctor, onUpdate }: Props) {
 
  const initialValues: Doctor = doctor ?? {
  id: 0,
  full_name: "",
  gender: "",
  phone: "",
  email: "",
  education: "",
  specialist: "",
};


  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Doctor</DialogTitle>
       <Formik<Doctor>
        initialValues={initialValues}
        validationSchema={DoctorSchema}
       onSubmit={(values) => {
       const formattedDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
        const payload = {
            full_name: values.full_name,
            gender: values.gender,
            phone: values.phone,
            email: values.email,
            education: values.education,
            specialist: values.specialist,
            updated_at: formattedDate,
          };

           axios.put(`http://localhost:5000/api/doctors/${values.id}`, payload)
      .then(() => {
        onUpdate(values);
        onClose();
      })
      .catch((err) => console.error("Error updating doctor:", err));
  }}
      >
    {({ errors, touched }) => (
      <Form>
      <DialogContent dividers>
        <Field
          as={TextField}
          margin="dense"
          name="full_name"
          label="Full Name"
          fullWidth
           error={!!errors.full_name && touched.full_name}
           helperText={touched.full_name && errors.full_name}
        />
      <FormControl fullWidth margin="dense" error={!!errors.gender && touched.gender}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Field
            name="gender"
            as={Select}
            labelId="gender-label"
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Field>
          {touched.gender && errors.gender && (
            <p style={{ color: "red", margin: "4px 14px" }}>{errors.gender}</p>
          )}
        </FormControl>

        <Field
          as={TextField}
          margin="dense"
          name="phone"
          label="Phone"
          fullWidth
          error={!!errors.phone && touched.phone}
          helperText={touched.phone && errors.phone}
        />
        <Field
          as={TextField}
          margin="dense"
          name="email"
          label="Email"
          fullWidth
          error={!!errors.email && touched.email}
                    helperText={touched.email && errors.email}
        />
        <Field
          as={TextField}
          margin="dense"
          name="education"
          label="Education"
          fullWidth
          error={!!errors.education && touched.education}
                    helperText={touched.education && errors.education}
        />
        <Field
          as={TextField}
          margin="dense"
          name="specialist"
          label="Specialist"
          fullWidth
          error={!!errors.specialist && touched.specialist}
                    helperText={touched.specialist && errors.specialist}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
         <Button variant="contained" type="submit">Update</Button>
      </DialogActions>
      </Form>
        )}
      </Formik>
    </Dialog>
  );
}
