import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Grid, TextField
} from "@mui/material";
import { MedicalRecord } from "../pages/MedicalRecords";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

type Props = {
  open: boolean;
  onClose: () => void;
  record: MedicalRecord | null;
};

function getFieldError(
  errors: any,
  touched: any,
  index: number,
  field: "name" | "dosage" | "frequency"
) {
  return Array.isArray(errors.medications) &&
    typeof errors.medications[index] === "object" &&
    errors.medications[index]?.[field] &&
    Array.isArray(touched.medications) &&
    touched.medications[index]?.[field]
    ? errors.medications[index][field]
    : "";
}

const PrescriptionSchema = Yup.object().shape({
  medications: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      dosage: Yup.string().required("Required"),
      frequency: Yup.string().required("Required"),
    })
  ),
  instructions: Yup.string().required("Instructions are required"),
});

export default function MedicalRecordModal({ open, onClose, record }: Props) {
  const navigate = useNavigate();
  if (!record) return null;

  const initialValues = {
    medications: [
      { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
    ],
    instructions: record.instructions || "Take as prescribed",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const payload = {
      ...values,
      record_id: record.id,
      patient_id: record.patient_id,
      doctor_id: record.doctor_id,
      patient_name: record.patient_name,
      doctor_name: record.doctor_name,
      date: record.date,
      diagnosis: record.diagnosis,
      status: "Active",
    };

    try {
      await axios.post("http://localhost:5000/api/prescriptions", payload, {
        withCredentials: true,
      });
      navigate("/prescriptions");
      alert("Prescription created successfully");
      onClose();
    } catch (err) {
      console.error("Error creating prescription:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Medical Record Details</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography><strong>Patient:</strong> {record.patient_name}</Typography>
            <Typography><strong>Doctor:</strong> {record.doctor_name}</Typography>
            <Typography><strong>Date:</strong> {record.date}</Typography>
            <Typography><strong>Status:</strong> {record.status}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Diagnosis:</strong> {record.diagnosis}</Typography>
            <Typography><strong>Medications:</strong> {record.medications}</Typography>
            <Typography><strong>Instructions:</strong> {record.instructions}</Typography>
          </Grid>
        </Grid>

        <Formik initialValues={initialValues} validationSchema={PrescriptionSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <FieldArray name="medications">
                {({ push, remove }) => (
                  <>
                    {values.medications.map((med, index) => (
                      <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                        <Grid item xs={4}>
                          <TextField
                            name={`medications[${index}].name`}
                            label="Medication"
                            fullWidth
                            value={med.name}
                            onChange={handleChange}
                           error={!!getFieldError(errors, touched, index, "name")}
                           helperText={getFieldError(errors, touched, index, "name")}

                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            name={`medications[${index}].dosage`}
                            label="Dosage"
                            fullWidth
                            value={med.dosage}
                            onChange={handleChange}
                           error={!!getFieldError(errors, touched, index, "dosage")}
                           helperText={getFieldError(errors, touched, index, "dosage")}

                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            name={`medications[${index}].frequency`}
                            label="Frequency"
                            fullWidth
                            value={med.frequency}
                            onChange={handleChange}
                            error={!!getFieldError(errors, touched, index, "frequency")}
                            helperText={getFieldError(errors, touched, index, "frequency")}
                          />
                        </Grid>
                      </Grid>
                    ))}
                    <Button onClick={() => push({ name: "", dosage: "", frequency: "" })}>
                      Add Medication
                    </Button>
                  </>
                )}
              </FieldArray>

            <Field
                as={TextField}
                name="instructions"
                label="Instructions"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                error={!!errors.instructions && touched.instructions}
                helperText={touched.instructions && errors.instructions}
              />


              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Generate Prescription
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
