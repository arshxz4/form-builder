import React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormLabel,
  FormGroup,
  RadioGroup,
  Radio,
  Autocomplete,
  Button,
} from '@mui/material';

export const FormPreview = ({ fields }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#fafafa' }}>
      <Typography variant="h6" gutterBottom>
        Form Preview
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        {fields.map((field) => {
          const {
            id,
            type,
            label,
            placeholder,
            inputType,
            options = [],
            validate = {},
            rows = 4,
          } = field;

          const inputProps = {
            minLength: validate.minLength || undefined,
            maxLength: validate.maxLength || undefined,
            min: validate.min || undefined,
            max: validate.max || undefined,
            pattern: validate.pattern || undefined,
            inputMode:
              type === 'number' || type === 'phone' ? 'numeric' :
              type === 'email' ? 'email' : undefined,
          };

          switch (type) {
            case 'textfield':
            case 'password':
              return (
                <TextField
                  key={id}
                  label={label}
                  placeholder={placeholder || ''}
                  required={validate.required}
                  type={inputType || type}
                  fullWidth
                  inputProps={inputProps}
                  sx={{ mb: 3 }}
                />
              );

            case 'email':
              return (
                <TextField
                  key={id}
                  label={label}
                  placeholder={placeholder || ''}
                  required={validate.required}
                  type="email"
                  fullWidth
                  inputProps={inputProps}
                  sx={{ mb: 3 }}
                />
              );

            case 'textarea':
              return (
                <TextField
                  key={id}
                  label={label}
                  placeholder={placeholder || ''}
                  required={validate.required}
                  multiline
                  rows={rows}
                  fullWidth
                  inputProps={inputProps}
                  sx={{ mb: 3 }}
                />
              );

            case 'number':
              return (
                <TextField
                  key={id}
                  label={label}
                  type="number"
                  required={validate.required}
                  fullWidth
                  inputProps={inputProps}
                  sx={{ mb: 3 }}
                />
              );

            case 'phone':
              return (
                <TextField
                  key={id}
                  label={label}
                  placeholder={placeholder || ''}
                  required={validate.required}
                  type="tel"
                  fullWidth
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: validate.pattern || '[0-9]{10}',
                    maxLength: validate.maxLength || 10,
                    minLength: validate.minLength || 10,
                  }}
                  sx={{ mb: 3 }}
                />
              );

            case 'checkbox':
              return (
                <FormControlLabel
                  key={id}
                  control={<Checkbox required={validate.required} />}
                  label={label}
                  sx={{ mb: 2 }}
                />
              );

            case 'select':
              return (
                <FormControl key={id} fullWidth sx={{ mb: 3 }}>
                  <InputLabel>{label}</InputLabel>
                  <Select defaultValue="" required={validate.required} label={label}>
                    {options.map((opt, index) => (
                      <MenuItem key={index} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );

            case 'selectboxes':
              return (
                <FormGroup key={id} sx={{ mb: 3 }}>
                  <FormLabel>{label}</FormLabel>
                  {options.map((opt, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox />}
                      label={opt}
                    />
                  ))}
                </FormGroup>
              );

            case 'radio':
              return (
                <FormControl key={id} component="fieldset" sx={{ mb: 3 }}>
                  <FormLabel>{label}</FormLabel>
                  <RadioGroup>
                    {options.map((opt, index) => (
                      <FormControlLabel
                        key={index}
                        value={opt}
                        control={<Radio />}
                        label={opt}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              );

            case 'autocomplete':
              return (
                <Autocomplete
                  key={id}
                  multiple
                  options={options}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={label}
                      placeholder={placeholder || ''}
                      required={validate.required}
                    />
                  )}
                  sx={{ mb: 3 }}
                />
              );

            case 'button':
              return (
                <Button
                  key={id}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mb: 3 }}
                >
                  {label || 'Submit'}
                </Button>
              );

            default:
              return null;
          }
        })}
      </Box>
    </Paper>
  );
};
