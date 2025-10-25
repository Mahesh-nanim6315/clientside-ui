import { Grid, TextField, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { HelpTicket } from "./types";

type Props = {
  tickets: HelpTicket[];
  setFilteredTickets: (tickets: HelpTicket[]) => void;
};

export default function HelpFilters({ tickets, setFilteredTickets }: Props) {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    let filtered = [...tickets];
    if (status) filtered = filtered.filter(t => t.status === status);
    if (priority) filtered = filtered.filter(t => t.priority === priority);
    if (startDate) filtered = filtered.filter(t =>
      dayjs(t.submitted_at).isAfter(dayjs(startDate).subtract(1, "day"))
    );
    if (endDate) filtered = filtered.filter(t =>
      dayjs(t.submitted_at).isBefore(dayjs(endDate).add(1, "day"))
    );
    setFilteredTickets(filtered);
  };

  const handleReset = () => {
    setStatus("");
    setPriority("");
    setStartDate("");
    setEndDate("");
    setFilteredTickets(tickets);
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={3}>
        <TextField
          label="Status"
          select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Priority"
          select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" onClick={handleReset}>Reset</Button>
        <Button variant="contained" onClick={handleFilter}>Apply Filters</Button>
      </Grid>
    </Grid>
  );
}
