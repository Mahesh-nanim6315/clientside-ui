import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from "@mui/material";
import { FormEntry } from "./types";

export default function FormTable({ forms }: { forms: FormEntry[] }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Form Type</TableCell>
            <TableCell>Submitted By</TableCell>
            <TableCell>Submitted At</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forms.map((form, index) => (
            <TableRow key={form.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{form.form_type}</TableCell>
              <TableCell>{form.submitted_by}</TableCell>
              <TableCell>{form.submitted_at}</TableCell>
              <TableCell>
                <Chip
                  label={form.status}
                  color={
                    form.status === "approved"
                      ? "success"
                      : form.status === "rejected"
                      ? "error"
                      : "warning"
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
