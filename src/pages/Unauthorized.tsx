import { Box, Typography } from "@mui/material";

export default function Unauthorized() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" color="error">🚫 Access Denied</Typography>
      <Typography>You do not have permission to view this page.</Typography>
    </Box>
  );
}
