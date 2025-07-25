import React from 'react';
import { Box, TextField, Button } from '@mui/material';

export const SaveFormBar = ({ formName, setFormName, onSave }) => {
  return (
    <Box display="flex" gap={2} mb={2}>
      <TextField
        label="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={onSave}>
        Save Form
      </Button>
    </Box>
  );
};
