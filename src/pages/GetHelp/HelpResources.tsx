import { Box, Typography, Paper } from "@mui/material";

export default function HelpResources() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>📚 Help Resources</Typography>
      <Paper sx={{ p: 2 }}>
        <Typography>Here are some common support topics:</Typography>
        <ul>
          <li>How to reset your password</li>
          <li>How to update your profile</li>
          <li>How to contact support</li>
        </ul>
      </Paper>
    </Box>
  );
}
