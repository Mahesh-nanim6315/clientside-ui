export type CarePlan = {
  id: number;
  patient_name: string;
  doctor_name: string;
  diagnosis: string;
  start_date: string; // ISO format
  end_date: string;   // ISO format
  status: "active" | "completed" | "cancelled";
};
