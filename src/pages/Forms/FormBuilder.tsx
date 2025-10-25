import { Box, Typography, Paper } from "@mui/material";

export default function FormBuilder() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>🛠️ Form Builder (Admin Only)</Typography>
      <Paper sx={{ p: 2, minHeight: "300px", border: "1px dashed grey" }}>
        {/* Drag-and-drop zones, field palette, preview area */}
        <Typography>Drag fields here to build your form...</Typography>
      </Paper>
    </Box>
  );
}
