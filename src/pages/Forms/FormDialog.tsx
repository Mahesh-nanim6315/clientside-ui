import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

type Props = {
  open: boolean;
  handleClose: () => void;
  refreshForms: () => void;
};

export default function FormDialog({ open, handleClose, refreshForms }: Props) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:5000/api/forms", data, {
        withCredentials: true,
      });
      refreshForms();
      reset();
      handleClose();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create Form</DialogTitle>
        <DialogContent>
          <TextField label="Form Type" {...register("form_type")} fullWidth margin="dense" />
          <TextField label="Submitted By" {...register("submitted_by")} fullWidth margin="dense" />
          <TextField label="Field A" {...register("data.fieldA")} fullWidth margin="dense" />
          <TextField label="Field B" {...register("data.fieldB")} fullWidth margin="dense" />
          <TextField label="Status" select {...register("status")} fullWidth margin="dense">
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
