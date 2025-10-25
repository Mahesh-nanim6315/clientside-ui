import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from "@mui/material";
import { HelpTicket } from "./types";

export default function HelpTable({ tickets }: { tickets: HelpTicket[] }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Submitted By</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Submitted At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow key={ticket.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>{ticket.submitted_by}</TableCell>
              <TableCell>{ticket.priority}</TableCell>
              <TableCell>
                <Chip
                  label={ticket.status}
                  color={
                    ticket.status === "resolved"
                      ? "success"
                      : ticket.status === "in_progress"
                      ? "warning"
                      : "default"
                  }
                />
              </TableCell>
              <TableCell>{ticket.submitted_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
