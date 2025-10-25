import { Grid, TextField, MenuItem, FormControl, InputLabel, Select, Button } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";

type Props = {
  carePlans: any[];
  setFilteredPlans: (plans: any[]) => void;
};

export default function CarePlanFilters({ carePlans, setFilteredPlans }: Props) {
  const [status, setStatus] = useState("");
  const [doctor, setDoctor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    let filtered = [...carePlans];

    if (status) {
      filtered = filtered.filter(plan => plan.status === status);
    }
    if (doctor) {
      filtered = filtered.filter(plan => plan.doctor_name.toLowerCase().includes(doctor.toLowerCase()));
    }
    if (startDate) {
      filtered = filtered.filter(plan => dayjs(plan.start_date).isAfter(dayjs(startDate).subtract(1, "day")));
    }
    if (endDate) {
      filtered = filtered.filter(plan => dayjs(plan.end_date).isBefore(dayjs(endDate).add(1, "day")));
    }

    setFilteredPlans(filtered);
  };

  const handleReset = () => {
    setStatus("");
    setDoctor("");
    setStartDate("");
    setEndDate("");
    setFilteredPlans(carePlans);
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Doctor Name"
          fullWidth
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Start Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="End Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" onClick={handleReset}>Reset</Button>
        <Button variant="contained" onClick={handleFilter}>Apply Filters</Button>
      </Grid>
    </Grid>
  );
}
