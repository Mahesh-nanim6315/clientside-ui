import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from "@mui/material";

export default function CarePlanTable({ carePlans }: any) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Patient</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Diagnosis</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carePlans.map((plan: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{plan.id}</TableCell>
              <TableCell>{plan.patient_name}</TableCell>
              <TableCell>{plan.doctor_name}</TableCell>
              <TableCell>{plan.diagnosis}</TableCell>
              <TableCell>{plan.start_date}</TableCell>
              <TableCell>{plan.end_date}</TableCell>
              <TableCell>
                <Chip
                  label={plan.status}
                  color={plan.status === "active" ? "success" : "default"}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
