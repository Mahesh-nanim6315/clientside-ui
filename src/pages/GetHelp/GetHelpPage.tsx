import React, { useEffect, useState } from "react";
import { Box, Container, Toolbar, Grid, Button } from "@mui/material";
import Appbar from "../../components/Appbar";
import HelpDialog from "./HelpDialog";
import HelpTable from "./HelpTable";
import HelpFilters from "./HelpFilters";
import HelpResources from "./HelpResources";
import axios from "axios";
import { HelpTicket } from "./types";

export default function GetHelpPage() {
  const [tickets, setTickets] = useState<HelpTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<HelpTicket[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/help", {
        withCredentials: true,
      });
      setTickets(res.data);
      setFilteredTickets(res.data);
    } catch (err) {
      console.error("Error fetching help tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Get Help" />
      <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4 }}>
          <Button variant="contained" onClick={() => setOpenDialog(true)}>Submit Help Request</Button>
          <HelpDialog open={openDialog} handleClose={() => setOpenDialog(false)} refreshTickets={fetchTickets} />
          <HelpFilters tickets={tickets} setFilteredTickets={setFilteredTickets} />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <HelpTable tickets={filteredTickets} />
            <HelpResources />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
