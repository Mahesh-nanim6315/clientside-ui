import React, { useEffect, useState } from "react";
import { Box, Container, Toolbar, Grid, Button } from "@mui/material";
import Appbar from "../../components/Appbar";
import CarePlanDialog from "./CarePlanDialog";
import CarePlanTable from "./CarePlanTable";
import CarePlanFilters from "./CarePlanFilters";
import axios from "axios";
import { CarePlan } from "./types";

export default function CarePlans() {
  const [carePlans, setCarePlans] = useState<CarePlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<CarePlan[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchCarePlans = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/careplans", {
        withCredentials: true,
      });
      setCarePlans(res.data);
      setFilteredPlans(res.data);
    } catch (err) {
      console.error("Error fetching care plans:", err);
    }
  };

  useEffect(() => {
    fetchCarePlans();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Care Plans" />
      <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4 }}>
          <Button variant="contained" onClick={() => setOpenDialog(true)}>Add Care Plan</Button>
          <CarePlanDialog
            open={openDialog}
            handleClose={() => setOpenDialog(false)}
            refreshCarePlans={fetchCarePlans}
          />
          <CarePlanFilters carePlans={carePlans} setFilteredPlans={setFilteredPlans} />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <CarePlanTable carePlans={filteredPlans} />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
