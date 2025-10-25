import React, { useEffect, useState } from "react";
import { Box, Container, Toolbar, Grid, Button } from "@mui/material";
import Appbar from "../../components/Appbar";
import FormDialog from "./FormDialog";
import FormTable from "./FormTable";
import FormFilters from "./FormFilters";
import axios from "axios";
import { FormEntry } from "./types";

export default function FormPage() {
  const [forms, setForms] = useState<FormEntry[]>([]);
  const [filteredForms, setFilteredForms] = useState<FormEntry[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchForms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/forms", {
        withCredentials: true,
      });
      setForms(res.data);
      setFilteredForms(res.data);
    } catch (err) {
      console.error("Error fetching forms:", err);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Forms" />
      <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4 }}>
          <Button variant="contained" onClick={() => setOpenDialog(true)}>Create Form</Button>
          <FormDialog open={openDialog} handleClose={() => setOpenDialog(false)} refreshForms={fetchForms} />
          <FormFilters forms={forms} setFilteredForms={setFilteredForms} />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <FormTable forms={filteredForms} />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
