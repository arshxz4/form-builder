import React from 'react';
import { Box } from '@mui/material';
import { FormPreview } from './FormPreview';
import { FormCodeOutput } from './FormCodeOutput';

export const FormPreviewWrapper = ({ fields }) => {
  return (
    <Box>
      <FormPreview fields={fields} />
      {/* <Typography variant="h6" sx={{ mt: 3 }}>
        JSX Output
      </Typography> */}
      <FormCodeOutput fields={fields} />
    </Box>
  );
};
