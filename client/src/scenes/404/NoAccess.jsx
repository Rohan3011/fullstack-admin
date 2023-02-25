import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { DoNotDisturbAlt } from "@mui/icons-material";

export default function NoAccess() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item alignSelf={"center"} xs={6}>
            <Typography variant="h1">Access Denied</Typography>
            <Typography mb={2} variant="h6">
              You don't have access permission for this page
            </Typography>
            <Button onClick={() => navigate("/dashboard")} variant="contained">
              Go Back
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
