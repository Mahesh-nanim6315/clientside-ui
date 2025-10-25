export type Patient = {
  id: number;
  full_name: string;
  age: number;
  gender: string;
  address: string;
  referred_by_doctor: string;
  date_of_entry: string;
  status: "In Treatment" | "Discharged";
};
