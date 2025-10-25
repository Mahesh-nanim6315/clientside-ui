import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, CircularProgress, TablePagination, TextField,
  Select, MenuItem, Dialog, DialogTitle, DialogContent, Button
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {useState, useEffect} from "react";

import AddLabResultForm from "../components/AddLabResultForm";
import { data } from "jquery";


type LabResult = {
  id: string;
  patient_name: string;
  test_name: string;
  result: string;
  status: "Pending" | "Completed" | "Abnormal";
  date: string;
  patient_id: string;
  doctor_id: string;
};


export default function LabResult() {
  const user = useSelector((state: RootState) => state.user.user);
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<LabResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedResult, setSelectedResult] = useState<LabResult | null>(null);

  const [openAddModal, setOpenAddModal] = useState(false);


  useEffect(() => {
  fetchLabResults();
}, []);


 const fetchLabResults =  async () => {
   setLoading(true);
   try{
   const res = await axios.get("http://localhost:5000/api/lab-results", { withCredentials: true })
        setLabResults(res.data);
        setFilteredResults(res.data);
        setLoading(res.data)
     } catch (err) {
        console.error(err);
     } finally {
        setLoading(false);
    }
  };

  const handleFilter = () => {
    let results = [...labResults];
    if (statusFilter) results = results.filter(r => r.status === statusFilter);
    if (dateFilter) results = results.filter(r => r.date.startsWith(dateFilter));
    setFilteredResults(results);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Patient", "Test", "Result", "Status", "Date"]],
      body: filteredResults.map(r => [r.patient_name, r.test_name, r.result, r.status, r.date])
    });
    doc.save("lab_results.pdf");
  };

  const markReviewed = (id: string) => {
    axios.put(`http://localhost:5000/api/lab-results/${id}/viewed`, {}, { withCredentials: true })
      .then(() => alert("Marked as reviewed"));
  };
  console.log("markreviewed",markReviewed)

  return (

    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Lab Results</Typography>
       
       <Button variant="contained" onClick={() => setOpenAddModal(true)}>
          Add Lab Result
       </Button>

       <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)} maxWidth="sm" fullWidth>
             <DialogTitle>Add Lab Result</DialogTitle>
        <DialogContent>
            <AddLabResultForm onClose={() => setOpenAddModal(false)} onSuccess={fetchLabResults} />
        </DialogContent>
        </Dialog>


      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField label="Filter by Date" type="date" onChange={e => setDateFilter(e.target.value)} />
        <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} displayEmpty>
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Abnormal">Abnormal</MenuItem>
        </Select>
        <Button variant="contained" onClick={handleFilter}>Apply Filters</Button>
        <CSVLink data={filteredResults} filename="lab_results.csv">
          <Button variant="outlined">Export CSV</Button>
        </CSVLink>
        <Button variant="outlined" onClick={exportPDF}>Export PDF</Button>
      </Box>

      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(result => (
                <TableRow key={result.id}>
                  <TableCell>{result.patient_name}</TableCell>
                  <TableCell>{result.test_name}</TableCell>
                  <TableCell>{result.result}</TableCell>
                  <TableCell>
                    <Chip label={result.status} color={
                      result.status === "Completed" ? "success" :
                      result.status === "Pending" ? "warning" : "error"
                    } />
                  </TableCell>
                  <TableCell>{result.date}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => setSelectedResult(result)}>View</Button>
                    {(user?.role === "Doctor" || user?.role === "Admin") && (
                      <Button size="small" onClick={() => markReviewed(result.id)}>Mark Reviewed</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredResults.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={e => setRowsPerPage(parseInt(e.target.value, 10))}
          />
        </TableContainer>
      )}

      <Dialog open={!!selectedResult} onClose={() => setSelectedResult(null)}>
        <DialogTitle>Lab Result Details</DialogTitle>
        <DialogContent>
          {selectedResult && (
            <>
              <Typography>Patient: {selectedResult.patient_name}</Typography>
              <Typography>Test: {selectedResult.test_name}</Typography>
              <Typography>Result: {selectedResult.result}</Typography>
              <Typography>Status: {selectedResult.status}</Typography>
              <Typography>Date: {selectedResult.date}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
