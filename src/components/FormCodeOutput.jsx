import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Snackbar
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const FormCodeOutput = ({ fields }) => {
  const [copied, setCopied] = React.useState(false);

  const generateCode = (field) => {
    const { label, placeholder, inputType, options = [], validate = {}, rows } = field;

    if (field.type === 'textfield') {
      return `
<TextField
  label="${label}"
  placeholder="${placeholder || ''}"
  required={${!!validate.required}}
  type="${inputType || 'text'}"
  fullWidth
  inputProps={{
    minLength: ${validate.minLength || 0},
    maxLength: ${validate.maxLength || 100},
    pattern: "${validate.pattern || ''}",
  }}
  sx={{ mb: 2 }}
/>`;
    }

    if (field.type === 'textarea') {
      return `
<TextField
  label="${label}"
  placeholder="${placeholder || ''}"
  required={${!!validate.required}}
  multiline
  rows={${rows || 4}}
  fullWidth
  inputProps={{
    minLength: ${validate.minLength || 0},
    maxLength: ${validate.maxLength || 500},
    pattern: "${validate.pattern || ''}",
  }}
  sx={{ mb: 2 }}
/>`;
    }

    if (field.type === 'number') {
      return `
<TextField
  label="${label}"
  type="number"
  required={${!!validate.required}}
  fullWidth
  inputProps={{
    min: ${validate.min || 0},
    max: ${validate.max || 100},
    pattern: "${validate.pattern || ''}",
  }}
  sx={{ mb: 2 }}
/>`;
    }

    if (field.type === 'password') {
      return `
<TextField
  label="${label}"
  type="password"
  required={${!!validate.required}}
  fullWidth
  inputProps={{
    minLength: ${validate.minLength || 6},
    maxLength: ${validate.maxLength || 20},
  }}
  sx={{ mb: 2 }}
/>`;
    }

    if (field.type === 'phone') {
      return `
<TextField
  label="${label}"
  placeholder="${placeholder || ''}"
  required={${!!validate.required}}
  type="tel"
  fullWidth
  inputProps={{
    inputMode: "numeric",
    pattern: "${validate.pattern || '[0-9]{10}'}",
    minLength: ${validate.minLength || 10},
    maxLength: ${validate.maxLength || 10},
  }}
  sx={{ mb: 2 }}
/>`;
    }

    if (field.type === 'email') {
      return `
<TextField
  label="${label}"
  placeholder="${placeholder || ''}"
  required={${!!validate.required}}
  type="email"
  fullWidth
  inputProps={{
    inputMode: "email",
    pattern: "${validate.pattern || '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'}",
    minLength: ${validate.minLength || 5},
    maxLength: ${validate.maxLength || 100},
  }}
  sx={{ mb: 2 }}
/>`;
    }

    if (field.type === 'checkbox') {
      return `
<FormControlLabel
  control={<Checkbox required={${!!validate.required}} />}
  label="${label}"
  sx={{ mb: 2 }}
/>`;
    }

    if (field.type === 'select') {
      return `
<FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel>${label}</InputLabel>
  <Select required={${!!validate.required}} label="${label}">
    ${options.map((opt) => `<MenuItem value="${opt}">${opt}</MenuItem>`).join('\n    ')}
  </Select>
</FormControl>`;
    }

    if (field.type === 'selectboxes') {
      return `
<FormGroup sx={{ mb: 2 }}>
  <FormLabel>${label}</FormLabel>
  ${options.map((opt) => `<FormControlLabel control={<Checkbox />} label="${opt}" />`).join('\n  ')}
</FormGroup>`;
    }

    if (field.type === 'radio') {
      return `
<FormControl component="fieldset" sx={{ mb: 2 }}>
  <FormLabel>${label}</FormLabel>
  <RadioGroup>
    ${options.map((opt) => `<FormControlLabel value="${opt}" control={<Radio />} label="${opt}" />`).join('\n    ')}
  </RadioGroup>
</FormControl>`;
    }

    if (field.type === 'autocomplete') {
      return `
<Autocomplete
  multiple
  options={[${options.map((opt) => `"${opt}"`).join(', ')}]}
  freeSolo
  renderInput={(params) => (
    <TextField {...params} label="${label}" placeholder="${placeholder || ''}" required={${!!validate.required}} />
  )}
  sx={{ mb: 2 }}
/>`;
    }

    if (field.type === 'button') {
      return `
<Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
  ${label || 'Submit'}
</Button>`;
    }

    return '';
  };

  const jsxCode = fields.map((field) => generateCode(field)).join('\n\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsxCode);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Box mt={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6" fontWeight="bold">JSX Output</Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={handleCopy}
          startIcon={<ContentCopyIcon />}
        >
          Copy
        </Button>
      </Box>

      <Paper
        sx={{
          p: 2,
          backgroundColor: '#1e1e1e',
          color: '#dcdcdc',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          whiteSpace: 'pre-wrap',
        }}
      >
        {jsxCode}
      </Paper>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Copied to clipboard!"
      />
    </Box>
  );
};
