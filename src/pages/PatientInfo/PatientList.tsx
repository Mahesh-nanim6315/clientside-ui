import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  Button,
  TablePagination
} from "@mui/material";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Appbar from "../../components/Appbar";
import AddPatientDialog from "./AddPatientDialog";
import { mockPatientData } from "../../mockData";
import axios from "axios";
import EditPatientDialog from "../../components/EditPatientDialog";
import { Patient } from "../../types/Patient";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";


function PatientList({ data }: any) {
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [searchedPatients, setSearchedPatients] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editOpen, setEditOpen] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(null);
  const [infoOpen, setInfoOpen] = React.useState(false);

  const navigate = useNavigate();



  const fetchPatients = () => {
  axios.get("http://localhost:5000/api/patients", { withCredentials: true })
    .then(res => setPatients(res.data))
    .catch(err => console.error("Error fetching patients:", err));
};

React.useEffect(() => {
  fetchPatients();
}, []);

const openPatientInfo = (patient: Patient) => {
  setSelectedPatient(patient);
  setInfoOpen(true);
};

  const handleChange = (e: any) => {
   const data: any = patients.filter((item: any) =>
  item.full_name?.toLowerCase().includes(e.target.value.toLowerCase())
);
    setSearchedPatients(data);
    setPage(0); // Reset page to the first page when searching
  };

  const patientList = searchedPatients.length > 0 ? searchedPatients : patients;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };


  const handleDelete = async (id: number) => {
  await axios.delete(`http://localhost:5000/api/patients/${id}`);
  setPatients(prev => prev.filter(p => p.id !== id));
};

const openEditDialog = (patient: any) => {
  setSelectedPatient(patient);
  setEditOpen(true);
};

const handleUpdate = async (updated: any) => {
  await axios.put(`http://localhost:5000/api/patients/${updated.id}`, updated);
  fetchPatients(); // refresh
};


  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to the first page when changing rows per page
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, patientList.length - page * rowsPerPage);

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Patient List" />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        }}
      >
        <Toolbar />

        <Container sx={{ mt: 4, mb: 4 }}>
          <AddPatientDialog
            patients={patients}
            setPatients={setPatients}
            handleChange={handleChange}
          />

          <Grid container spacing={2} sx={{ marginLeft: "10px", marginTop: "40px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="patient table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">#</TableCell>
                    <TableCell>FULL NAME</TableCell>
                    <TableCell>AGE</TableCell>
                    <TableCell>GENDER</TableCell>
                    <TableCell>ADDRESS</TableCell>
                    <TableCell>REFERRED BY DR.</TableCell>
                    <TableCell>ENTRY DATE</TableCell>
                    <TableCell>STATUS</TableCell>
                    <TableCell>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? patientList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : patientList as Patient[]
                  ).map((patient,index) => (
                    <TableRow  key={patient.id ?? index}
                        hover
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/patient-info/${patient.id}`)}>

                       <TableCell align="center">{patient.id}</TableCell>
                        <TableCell>
                          <Link to={`/patient-info/${patient.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            {patient.full_name}
                          </Link>
                        </TableCell>
                      <TableCell>{patient.age ?? "N/A"}</TableCell>
                      <TableCell>{patient.gender ?? "N/A"}</TableCell>
                      <TableCell>{patient.address ?? "N/A"}</TableCell>
                      <TableCell>{patient.referred_by_doctor ?? "N/A"}</TableCell>
                    {/* <TableCell>
                       {patient.date_of_entry ? dayjs(patient.date_of_entry).format("YYYY-MM-DD") : "N/A"}
                   </TableCell> */}
                   <TableCell>
                      {patient.date_of_entry
                        ? dayjs(patient.date_of_entry).isValid()
                          ? dayjs(patient.date_of_entry).format("YYYY-MM-DD")
                          : "Invalid Date"
                        : "N/A"}
                    </TableCell>


                      <TableCell>
                        <Chip
                          label={patient.status}
                          color={
                            patient.status === "In Treatment"
                              ? "success"
                              : "error"
                          }
                          sx={{ textTransform: "uppercase" }}
                        />
                      </TableCell>

                        <TableCell>
                          <Button onClick={(e) => { e.stopPropagation(); openEditDialog(patient); }}>
                            Edit
                          </Button>
                          <Button color="error" onClick={(e) => { e.stopPropagation(); handleDelete(patient.id); }}>
                            Delete
                          </Button>
                       </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={8} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={patientList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Container>

           <EditPatientDialog
          open={editOpen}
          onClose={() => setEditOpen(false)}
          patient={selectedPatient}
          onUpdate={handleUpdate}
        />
      </Box>

   

    </Box>
    
  );
}

export default PatientList;
