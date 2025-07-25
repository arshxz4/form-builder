import { useDrag } from 'react-dnd';
import { Box, Paper, Typography } from '@mui/material';

const FieldItem = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FIELD',
    item: { type },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <Paper
      ref={drag}
      sx={{
        p: 1,
        mb: 1,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        fontSize: '0.9rem',
      }}
    >
      {label}
    </Paper>
  );
};

export const FieldPalette = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Field Palette
      </Typography>

      <FieldItem type="textfield" label="Text Field" />
      <FieldItem type="textarea" label="Text Area" />
      <FieldItem type="number" label="Number" />
      <FieldItem type="password" label="Password" />
      <FieldItem type="phone" label="Phone Number" />
      <FieldItem type="email" label="Email" /> 
      <FieldItem type="checkbox" label="Checkbox" />
      <FieldItem type="select" label="Select Dropdown" />
      <FieldItem type="selectboxes" label="Select Boxes" />
      <FieldItem type="radio" label="Radio Group" />
      <FieldItem type="autocomplete" label="Tags (Autocomplete)" />
      <FieldItem type="button" label="Button" />
    </Box>
  );
};
