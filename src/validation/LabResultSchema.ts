import * as Yup from "yup";

export const LabResultSchema = Yup.object().shape({
  patient_name: Yup.string().required("Patient name is required"),
  test_name: Yup.string().required("Test name is required"),
  result: Yup.string().required("Result is required"),
  status: Yup.string().oneOf(["Pending", "Completed", "Abnormal"]).required("Status is required"),
  date: Yup.string().required("Date is required"),
  patient_id: Yup.string().required("Patient ID is required"),
  doctor_id: Yup.string().required("Doctor ID is required"),
});
