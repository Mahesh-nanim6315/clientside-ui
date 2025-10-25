import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { Patient } from "../types/Patient";

type EditPatientDialogProps = {
  open: boolean;
  onClose: () => void;
  patient: Patient | null;
  onUpdate: (updated: Patient) => void;
};

const PatientSchema = Yup.object().shape({
  full_name: Yup.string().required("Name is required"),
  age: Yup.number().min(0, "Age must be positive").required("Age is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  referred_by_doctor: Yup.string().required("Doctor name is required"),
  date_of_entry: Yup.string().required("Date is required"),
  status: Yup.string().oneOf(["In Treatment", "Discharged"]).required("Status is required"),
});

export default function EditPatientDialog({
  open,
  onClose,
  patient,
  onUpdate,
}: EditPatientDialogProps) {
  if (!patient) return null;

  const initialValues: Patient = {
    ...patient,
    date_of_entry: dayjs(patient.date_of_entry).format("YYYY-MM-DD"),
  };

  const handleSubmit = (values: Patient) => {
    onUpdate(values);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Formik initialValues={initialValues} validationSchema={PatientSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogContent>
              <Field
                as={TextField}
                name="full_name"
                label="Full Name"
                fullWidth
                margin="normal"
                error={!!errors.full_name && touched.full_name}
                helperText={touched.full_name && errors.full_name}
              />
              <Field
                as={TextField}
                name="age"
                label="Age"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.age && touched.age}
                helperText={touched.age && errors.age}
              />
              <Field
                as={TextField}
                name="gender"
                label="Gender"
                fullWidth
                margin="normal"
                error={!!errors.gender && touched.gender}
                helperText={touched.gender && errors.gender}
              />
              <Field
                as={TextField}
                name="address"
                label="Address"
                fullWidth
                margin="normal"
                error={!!errors.address && touched.address}
                helperText={touched.address && errors.address}
              />
              <Field
                as={TextField}
                name="referred_by_doctor"
                label="Referred By Doctor"
                fullWidth
                margin="normal"
                error={!!errors.referred_by_doctor && touched.referred_by_doctor}
                helperText={touched.referred_by_doctor && errors.referred_by_doctor}
              />
              <TextField
                name="date_of_entry"
                label="Date of Entry"
                type="date"
                fullWidth
                margin="normal"
                value={values.date_of_entry}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date_of_entry && touched.date_of_entry}
                helperText={touched.date_of_entry && errors.date_of_entry}
              />
              <FormControl fullWidth margin="normal" error={!!errors.status && touched.status}>
                <InputLabel>Status</InputLabel>
                <Select
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
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Update</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
