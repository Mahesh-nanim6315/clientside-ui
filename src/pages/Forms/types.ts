export type FormEntry = {
  id: number;
  form_type: string;
  submitted_by: string;
  submitted_at: string;
  status: "pending" | "approved" | "rejected";
  data: Record<string, any>; // dynamic form fields
};
