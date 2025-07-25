import React, { useEffect, useState } from 'react';
import {
  Box, CssBaseline, Drawer, Toolbar, Typography,
  IconButton, Divider, Button, Grid
} from '@mui/material';
import { FieldPalette } from './components/FieldPalette';
import { FormBuilder } from './components/FormBuilder';
import { FormPreviewWrapper } from './components/FormPreviewWrapper';
import { useFormStorage } from './hooks/UseFormStorage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const expandedWidth = 200;
const collapsedWidth = 60;

const App = () => {
  const [formFields, setFormFields] = useState([]);
  const [formName, setFormName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const drawerWidth = sidebarOpen ? expandedWidth : collapsedWidth;

  const { forms, deleteForm, saveForm } = useFormStorage();

  useEffect(() => {
    if (selectedFormId && forms[selectedFormId]) {
      setFormFields(forms[selectedFormId].fields || []);
      setFormName(forms[selectedFormId].name || '');
    } else {
      setFormFields([]);
      setFormName('');
    }
  }, [selectedFormId, forms]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#e0c87a',
              p: 1,
              alignItems: 'center',
            },
          }}
        >
          <Toolbar sx={{ width: '100%', justifyContent: 'center' }}>
            <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>

          <Divider sx={{ width: '100%', mb: 2 }} />

          {sidebarOpen && (
            <Box sx={{ width: '100%', px: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" textAlign="center" mb={1}>
                Saved Forms
              </Typography>

              <Button
                fullWidth
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => setSelectedFormId(null)}
                sx={{ mb: 2 }}
              >
                  New Form
              </Button>

              {Object.entries(forms).map(([id, form]) => (
                <Box key={id} display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Button
                    variant={id === selectedFormId ? 'contained' : 'outlined'}
                    onClick={() => setSelectedFormId(id)}
                    size="small"
                    sx={{ flexGrow: 1, mr: 1 }}
                  >
                    {form.name}
                  </Button>
                  <IconButton
                    size="small"
                    onClick={() => {
                      if (window.confirm(`Delete "${form.name}"?`)) {
                        deleteForm(id);
                        if (id === selectedFormId) setSelectedFormId(null);
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Drawer>

        {/* 🧱 Main layout */}
        <Box component="main" sx={{ flexGrow: 1, p: 2, ml: `${sidebarOpen ? 60 : 0}px` }}>

          <Toolbar />
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Form Builder
          </Typography>

          <Grid container spacing={2}>
  <Grid item xs={2.5}>
    {/* <Typography variant="h6">Field Palette</Typography> */}
    <FieldPalette />
  </Grid>

  <Grid item xs={4.5}>
    <FormBuilder
      formFields={formFields}
      setFormFields={setFormFields}
      formName={formName}
      setFormName={setFormName}
      saveForm={saveForm}
    />
  </Grid>

  <Grid item xs={5}>
    {/* <Typography variant="h6">Live Preview</Typography> */}
    <FormPreviewWrapper fields={formFields} />
  </Grid>
</Grid>

        </Box>
      </Box>
    </DndProvider>
  );
};

export default App;
