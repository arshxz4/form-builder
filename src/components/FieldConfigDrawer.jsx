import React from 'react';
import {
  Drawer,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  IconButton,
  Button,
  Stack,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

export const FieldConfigDrawer = ({
  open,
  onClose,
  field,
  updateField,
  deleteField,
}) => {
  if (!field) return null;

  // Update a root-level key like 'label' or 'placeholder'
  const handleChange = (key, value) => {
    updateField({ ...field, [key]: value });
  };

  // Update nested validate object
  const handleValidationChange = (key, value) => {
    updateField({
      ...field,
      validate: {
        ...field.validate,
        [key]: value,
      },
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...(field.options || [])];
    newOptions[index] = value;
    handleChange('options', newOptions);
  };

  const addOption = () => {
    const newOptions = [...(field.options || []), ''];
    handleChange('options', newOptions);
  };

  const removeOption = (index) => {
    const newOptions = [...(field.options || [])];
    newOptions.splice(index, 1);
    handleChange('options', newOptions);
  };

  const isOptionField = ['select', 'selectboxes', 'radio', 'autocomplete'].includes(field.type);
  const isTextLikeField = ['textfield', 'textarea', 'password', 'phone'].includes(field.type);
  const isNumberField = field.type === 'number';

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Edit Field</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Label */}
        <TextField
          label="Label"
          fullWidth
          value={field.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Placeholder */}
        {['textfield', 'textarea', 'autocomplete', 'phone'].includes(field.type) && (
          <TextField
            label="Placeholder"
            fullWidth
            value={field.placeholder || ''}
            onChange={(e) => handleChange('placeholder', e.target.value)}
            sx={{ mb: 2 }}
          />
        )}

        {/* Input type for textfield */}
        {field.type === 'textfield' && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Input Type</InputLabel>
            <Select
              value={field.inputType || 'text'}
              label="Input Type"
              onChange={(e) => handleChange('inputType', e.target.value)}
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="password">Password</MenuItem>
              <MenuItem value="tel">Phone</MenuItem>
            </Select>
          </FormControl>
        )}

        {/* Rows for textarea */}
        {field.type === 'textarea' && (
          <TextField
            label="Rows"
            type="number"
            fullWidth
            value={field.rows || 4}
            onChange={(e) => handleChange('rows', parseInt(e.target.value))}
            sx={{ mb: 2 }}
          />
        )}

        {/* Button text */}
        {field.type === 'button' && (
          <TextField
            label="Button Text"
            fullWidth
            value={field.label || ''}
            onChange={(e) => handleChange('label', e.target.value)}
            sx={{ mb: 2 }}
          />
        )}

        {/* Required */}
        <FormControlLabel
          control={
            <Checkbox
              checked={field.validate?.required || false}
              onChange={(e) => handleValidationChange('required', e.target.checked)}
            />
          }
          label="Required"
          sx={{ mb: 2 }}
        />

        {/* Validation */}
        {(isTextLikeField || isNumberField) && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Validation
            </Typography>

            {isTextLikeField && (
              <>
                <TextField
                  label="Min Length"
                  type="number"
                  fullWidth
                  value={field.validate?.minLength || ''}
                  onChange={(e) => handleValidationChange('minLength', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Max Length"
                  type="number"
                  fullWidth
                  value={field.validate?.maxLength || ''}
                  onChange={(e) => handleValidationChange('maxLength', e.target.value)}
                  sx={{ mb: 2 }}
                />
              </>
            )}

            {isNumberField && (
              <>
                <TextField
                  label="Min Value"
                  type="number"
                  fullWidth
                  value={field.validate?.min || ''}
                  onChange={(e) => handleValidationChange('min', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Max Value"
                  type="number"
                  fullWidth
                  value={field.validate?.max || ''}
                  onChange={(e) => handleValidationChange('max', e.target.value)}
                  sx={{ mb: 2 }}
                />
              </>
            )}

            <TextField
              label="Pattern (Regex)"
              fullWidth
              value={field.validate?.pattern || ''}
              onChange={(e) => handleValidationChange('pattern', e.target.value)}
              sx={{ mb: 2 }}
            />
          </>
        )}

        {/* Options (for select, radio, etc.) */}
        {isOptionField && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Options
            </Typography>
            <Stack spacing={1}>
              {(field.options || []).map((option, index) => (
                <Box key={index} display="flex" gap={1}>
                  <TextField
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <IconButton onClick={() => removeOption(index)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Button onClick={addOption} size="small" variant="outlined">
                + Add Option
              </Button>
            </Stack>
          </>
        )}

        {/* Delete Field */}
        <Box mt={4}>
          <Button
            onClick={() => {
              deleteField(field.id);
              onClose();
            }}
            color="error"
            variant="contained"
            fullWidth
            startIcon={<DeleteIcon />}
          >
            Delete Field
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
