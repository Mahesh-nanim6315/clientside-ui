import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

type Props = {
  open: boolean;
  handleClose: () => void;
  refreshTickets: () => void;
};

export default function HelpDialog({ open, handleClose, refreshTickets }: Props) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:5000/api/help", data, {
        withCredentials: true,
      });
      refreshTickets();
      reset();
      handleClose();
    } catch (err) {
      console.error("Error submitting help ticket:", err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Submit Help Request</DialogTitle>
        <DialogContent>
          <TextField label="Subject" {...register("subject")} fullWidth margin="dense" />
          <TextField label="Description" {...register("description")} fullWidth multiline rows={4} margin="dense" />
          <TextField label="Submitted By" {...register("submitted_by")} fullWidth margin="dense" />
          <TextField label="Priority" select {...register("priority")} fullWidth margin="dense">
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <TextField label="Status" select {...register("status")} fullWidth margin="dense">
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
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
