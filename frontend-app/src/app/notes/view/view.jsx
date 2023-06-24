import * as React from 'react';
import { Style } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export const NoteView = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={6} md={8}></Grid>
        <Grid xs={6} md={8}></Grid>

        <Grid xs={6} md={8}></Grid>
        <Grid xs={6} md={8}></Grid>
      </Grid>
    </Box>
  );
};


