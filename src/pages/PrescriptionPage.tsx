import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";

type Medication = {
  name: string;
  dosage: string;
  frequency: string;
};

type Prescription = {
  id: string;
  record_id: string;
  patient_id: string;
  doctor_id: string;
  patient_name: string;
  doctor_name: string;
  date: string;
  diagnosis: string;
  medications: Medication[];
  instructions: string;
  status: "Active" | "Expired" | "Cancelled";
};

export default function PrescriptionPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selected, setSelected] = useState<Prescription | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/prescriptions", {
        withCredentials: true,
      });
      const parsed = res.data.map((p: any) => ({
        ...p,
        medications: typeof p.medications === "string"
    ? JSON.parse(p.medications)
    : p.medications, // ✅ skip parsing if already an object
      }));
      setPrescriptions(parsed);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    }
  };

  const viewDetails = (prescription: Prescription) => {
    setSelected(prescription);
    setOpen(true);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Prescriptions</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Diagnosis</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prescriptions.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.patient_name}</TableCell>
              <TableCell>{p.doctor_name}</TableCell>
              <TableCell>{p.date}</TableCell>
              <TableCell>{p.diagnosis}</TableCell>
              <TableCell>{p.status}</TableCell>
              <TableCell>
                <Button onClick={() => viewDetails(p)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Prescription Details</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <>
              <Typography><strong>Patient:</strong> {selected.patient_name}</Typography>
              <Typography><strong>Doctor:</strong> {selected.doctor_name}</Typography>
              <Typography><strong>Date:</strong> {selected.date}</Typography>
              <Typography><strong>Diagnosis:</strong> {selected.diagnosis}</Typography>
              <Typography><strong>Instructions:</strong> {selected.instructions}</Typography>
              <Typography><strong>Medications:</strong></Typography>
              <ul>
                {selected.medications.map((m, i) => (
                  <li key={i}>
                    {m.name} — {m.dosage}, {m.frequency}
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button variant="contained" color="primary">Export PDF</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
