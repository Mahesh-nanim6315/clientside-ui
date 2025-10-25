import { Grid, TextField, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { FormEntry } from "./types";

type Props = {
  forms: FormEntry[];
  setFilteredForms: (forms: FormEntry[]) => void;
};

export default function FormFilters({ forms, setFilteredForms }: Props) {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    let filtered = [...forms];
    if (type) filtered = filtered.filter(f => f.form_type === type);
    if (status) filtered = filtered.filter(f => f.status === status);
    if (startDate) filtered = filtered.filter(f => dayjs(f.submitted_at).isAfter(dayjs(startDate).subtract(1, "day")));
    if (endDate) filtered = filtered.filter(f => dayjs(f.submitted_at).isBefore(dayjs(endDate).add(1, "day")));
    setFilteredForms(filtered);
  };

  const handleReset = () => {
    setType("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    setFilteredForms(forms);
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={3}>
        <TextField label="Form Type" value={type} onChange={(e) => setType(e.target.value)} fullWidth />
      </Grid>
      <Grid item xs={3}>
        <TextField label="Status" select value={status} onChange={(e) => setStatus(e.target.value)} fullWidth>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={3}>
        <TextField label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button onClick={handleReset}>Reset</Button>
        <Button variant="contained" onClick={handleFilter}>Apply Filters</Button>
      </Grid>
    </Grid>
  );
}
