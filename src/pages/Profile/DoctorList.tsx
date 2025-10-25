import * as React from "react";
import {
  Box,
  Container,
  Toolbar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button,
} from "@mui/material";
import Appbar from "../../components/Appbar";
import AddDoctorDialog from "./AddDoctorDialog";
import EditDoctorDialog from "../../components/EditDoctorDialog";
import axios from "axios";
import { Doctor } from "../../types/Doctor";



export default function DoctorList() {
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selectedDoctor, setSelectedDoctor] = React.useState<Doctor | null>(null);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Error deleting doctor:", err);
    }
  };

  const handleUpdate = async (updated: Doctor) => {
    const payload = {
      full_name: updated.full_name,
      gender: updated.gender,
      phone: updated.phone,
      email: updated.email,
      education: updated.education,
      specialist: updated.specialist,
    };

    try {
      await axios.put(`http://localhost:5000/api/doctors/${updated.id}`, payload);
      await fetchDoctors();
    } catch (err) {
      console.error("Error updating doctor:", err);
    }
  };

  const openEditDialog = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setEditOpen(true);
  };

  React.useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Doctor List" />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4 }}>
          <AddDoctorDialog doctors={doctors} setDoctors={setDoctors} />
          <Grid container spacing={2} sx={{ marginLeft: "10px", marginTop: "40px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="doctor table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>DOCTOR NAME</TableCell>
                    <TableCell>SPECIALIST</TableCell>
                    <TableCell>SEX</TableCell>
                    <TableCell>PHONE NO</TableCell>
                    <TableCell>EDUCATION</TableCell>
                    <TableCell>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell align="right">
                        <Avatar src={"https://i.pravatar.cc/300"} sx={{ height: "25%" }} />
                      </TableCell>
                      <TableCell>{doctor.full_name}</TableCell>
                      <TableCell>{doctor.specialist}</TableCell>
                      <TableCell>{doctor.gender}</TableCell>
                      <TableCell>{doctor.phone}</TableCell>
                      <TableCell>{doctor.education}</TableCell>
                      <TableCell>
                        <Button onClick={() => openEditDialog(doctor)}>Edit</Button>
                        <Button color="error" onClick={() => handleDelete(doctor.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Container>
      </Box>
      <EditDoctorDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        doctor={selectedDoctor}
        onUpdate={handleUpdate}
      />
    </Box>
  );
}
