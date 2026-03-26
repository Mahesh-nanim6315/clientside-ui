import React from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  DialogActions,
} from "@mui/material";
import { Formik, Field } from "formik";
import { LabResultSchema } from "../validation/LabResultSchema";
import axios from "axios";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddLabResultForm({ onClose, onSuccess }: Props) {
  const initialValues = {
    patient_name: "",
    test_name: "",
    result: "",
    status: "Pending",
    date: new Date().toISOString().slice(0, 10),
    patient_id: "",
    doctor_id: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await axios.post("http://localhost:5000/api/lab-results", values, {
        withCredentials: true,
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding lab result:", err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LabResultSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {/* Patient Name */}
          <Field
            as={TextField}
            name="patient_name"
            label="Patient Name"
            fullWidth
            margin="dense"
            error={!!errors.patient_name && touched.patient_name}
            helperText={touched.patient_name && errors.patient_name}
          />

          {/* Test Name */}
          <Field
            as={TextField}
            name="test_name"
            label="Test Name"
            fullWidth
            margin="dense"
            error={!!errors.test_name && touched.test_name}
            helperText={touched.test_name && errors.test_name}
          />

          {/* Result */}
          <Field
            as={TextField}
            name="result"
            label="Result"
            fullWidth
            margin="dense"
            error={!!errors.result && touched.result}
            helperText={touched.result && errors.result}
          />

          {/* Status */}
          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.status && touched.status}
          >
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={values.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Abnormal">Abnormal</MenuItem>
            </Select>
          </FormControl>

          {/* Date */}
          <TextField
            name="date"
            type="date"
            label="Date"
            fullWidth
            margin="dense"
            value={values.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.date && touched.date}
            helperText={touched.date && errors.date}
          />

          {/* Patient ID */}
          <Field
            as={TextField}
            name="patient_id"
            label="Patient ID"
            fullWidth
            margin="dense"
            error={!!errors.patient_id && touched.patient_id}
            helperText={touched.patient_id && errors.patient_id}
          />

          {/* Doctor ID */}
          <Field
            as={TextField}
            name="doctor_id"
            label="Doctor ID"
            fullWidth
            margin="dense"
            error={!!errors.doctor_id && touched.doctor_id}
            helperText={touched.doctor_id && errors.doctor_id}
          />

          {/* Actions */}
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
}