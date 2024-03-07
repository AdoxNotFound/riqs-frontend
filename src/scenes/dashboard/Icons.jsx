import React from 'react';
import Paper from '@mui/material/Paper';

export const BiweekelyStatusIcon = ({ size, color }) => (
  <Paper sx={{ bgcolor: color, width: size, height: size}}></Paper>
);

export const ActiveDays = () => (
    <Paper sx={{ bgcolor: 'green', width: 15, height: 5}}></Paper>
);

export const InactiveDays = () => (
  <Paper sx={{ bgcolor: 'white', width: 15, height: 5}}></Paper>
);