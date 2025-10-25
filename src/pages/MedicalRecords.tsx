import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableRow, TableCell, TableHead, TableBody,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography
} from "@mui/material";
import { useForm } from "react-hook-form";
import MedicalRecordModal from "../components/MedicalRecordModal";


export type MedicalRecord = {
  id: string;
  patient_id: string;
  doctor_id: string;
  patient_name: string;
  doctor_name: string;
  date: string;
  diagnosis: string;
  medications: string;
  instructions: string;
  status: "Active" | "Expired" | "Cancelled";
};

export default function MedicalRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);




  const { register, handleSubmit, reset } = useForm<MedicalRecord>();

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/medical-records", {
        withCredentials: true,
      });
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

    const viewDetails = (id: string) => {
      const record = records.find((r) => r.id === id);
      if (record) {
        setSelectedRecord(record);
        setOpenViewModal(true);
      }
    };


  const onSubmit = async (data: MedicalRecord) => {
    try {
      await axios.post("http://localhost:5000/api/medical-records", data, {
        withCredentials: true,
      });
      fetchRecords();
      reset();
      setOpenAddModal(false);
    } catch (err) {
      console.error("Error creating record:", err);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Medical Records</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)}>
        Add Medical Record
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Diagnosis</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Medications</TableCell>
            <TableCell>Instructions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((rec) => (
            <TableRow key={rec.id}>
              <TableCell>{rec.patient_name}</TableCell>
              <TableCell>{rec.doctor_name}</TableCell>
              <TableCell>{rec.date}</TableCell>
              <TableCell>{rec.diagnosis}</TableCell>
              <TableCell>{rec.status}</TableCell>
              <TableCell>{rec.medications}</TableCell>
              <TableCell>{rec.instructions}</TableCell>
              <TableCell>
                <Button onClick={() => viewDetails(rec.id)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Modal */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Medical Record</DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Patient ID" fullWidth {...register("patient_id")} margin="normal" />
            <TextField label="Doctor ID" fullWidth {...register("doctor_id")} margin="normal" />
            <TextField label="Patient Name" fullWidth {...register("patient_name")} margin="normal" />
            <TextField label="Doctor Name" fullWidth {...register("doctor_name")} margin="normal" />
            <TextField label="Date" type="date" fullWidth {...register("date")} margin="normal" />
            <TextField label="Diagnosis" fullWidth multiline {...register("diagnosis")} margin="normal" />
            <TextField label="Medications" fullWidth multiline {...register("medications")} margin="normal" />
            <TextField label="Instructions" fullWidth multiline {...register("instructions")} margin="normal" />
            <TextField
                    label="Status"
                    select
                    fullWidth
                    margin="normal"
                    defaultValue="Active"
                    {...register("status")}
                    SelectProps={{ native: true }}
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Cancelled">Cancelled</option>
             </TextField>

            <DialogActions>
              <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

         <MedicalRecordModal
            open={openViewModal}
            onClose={() => setOpenViewModal(false)}
            record={selectedRecord}
          />


    </div>
  );
}
