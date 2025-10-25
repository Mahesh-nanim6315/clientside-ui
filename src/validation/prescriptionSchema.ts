import * as Yup from "yup";

export const PrescriptionSchema = Yup.object().shape({
  medications: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Medication name is required"),
      dosage: Yup.string().required("Dosage is required"),
      frequency: Yup.string().required("Frequency is required"),
    })
  ),
  instructions: Yup.string().required("Instructions are required"),
});
