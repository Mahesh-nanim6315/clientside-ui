import {useState, useEffect} from "react";
import { Grid, Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Appbar from "../../components/Appbar";
import AppointmentDialog from "./AppointmentDialog";
import AppointmentTableData from "./AppointmentTableData";
import axios from "axios";

function Appointments() {

  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/appointments", {
          withCredentials: true,
        });
        setAppointments(res.data);
      } catch (err) {
        console.error("❌ Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);


  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Appointment" />
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
          <AppointmentDialog
            appointments={appointments}
            setAppointments={setAppointments}
          />
          <Grid
            container
            spacing={2}
            sx={{ marginleft: "10px", marginTop: "40px" }}
          >
            <AppointmentTableData appointments={appointments} />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Appointments;
