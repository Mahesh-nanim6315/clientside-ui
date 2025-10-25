import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

type Props = {
  open: boolean;
  handleClose: () => void;
  refreshCarePlans: () => void;
};

export default function CarePlanDialog({ open, handleClose, refreshCarePlans }: Props) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:5000/api/careplans", data, {
        withCredentials: true,
      });
      refreshCarePlans(); // refetch data
      reset();
      handleClose();
    } catch (err) {
      console.error("Error creating care plan:", err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create Care Plan</DialogTitle>
        <DialogContent>
          <TextField label="Patient Name" {...register("patient_name")} fullWidth margin="dense" />
          <TextField label="Doctor Name" {...register("doctor_name")} fullWidth margin="dense" />
          <TextField label="Diagnosis" {...register("diagnosis")} fullWidth margin="dense" />
          <TextField label="Start Date" type="date" {...register("start_date")} fullWidth InputLabelProps={{ shrink: true }} margin="dense" />
          <TextField label="End Date" type="date" {...register("end_date")} fullWidth InputLabelProps={{ shrink: true }} margin="dense" />
          <TextField label="Status" {...register("status")} fullWidth margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
 