import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Box } from '@mui/material';

export const DraggableField = ({ index, field, moveField, children }) => {
  const ref = React.useRef();

  const [, drop] = useDrop({
    accept: 'FORM_FIELD',
    hover(item) {
      if (item.index !== index) {
        moveField(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'FORM_FIELD',
    item: { type: 'FORM_FIELD', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isDragging ? 0.3 : 1,
        mb: 2,
        cursor: 'move',
      }}
    >
      {children}
    </Box>
  );
};
