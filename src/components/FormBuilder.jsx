import React from 'react';
import { Box, } from '@mui/material';
import { useDrop } from 'react-dnd';
import { v4 as uuid } from 'uuid';
import { FieldConfigDrawer } from './FieldConfigDrawer';
import { DraggableField } from './DraggableField';
import { SaveFormBar } from './SaveFormBar';

export const FormBuilder = ({
  formFields,
  setFormFields,
  formName,
  setFormName,
  saveForm,
}) => {
  const [selectedField, setSelectedField] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const updateField = (updatedField) => {
    setFormFields((prev) =>
      prev.map((f) => (f.id === updatedField.id ? updatedField : f))
    );
    setSelectedField(updatedField);
  };

  const deleteField = (id) => {
    setFormFields((prev) => prev.filter((f) => f.id !== id));
    setDrawerOpen(false);
  };

  const moveField = (fromIndex, toIndex) => {
    setFormFields((prevFields) => {
      const updated = [...prevFields];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FIELD',
    drop: (item) => {
      const defaultLabelMap = {
  textfield: 'Text Field',
  textarea: 'Text Area',
  number: 'Number',
  password: 'Password',
  phone: 'Phone Number',
  email: 'Email', // ✅ Add this line
  checkbox: 'Checkbox',
  select: 'Select',
  selectboxes: 'Select Boxes',
  radio: 'Radio Group',
  autocomplete: 'Tags',
  button: 'Submit',
};

setFormFields((prev) => [
  ...prev,
  {
    id: uuid(),
    type: item.type,
    label: defaultLabelMap[item.type] || 'Untitled Field',
    placeholder: '',
    inputType:
      item.type === 'password' ? 'password' :
      item.type === 'email' ? 'email' : 'text',
    options: ['select', 'radio', 'selectboxes', 'autocomplete'].includes(item.type)
      ? ['Option 1', 'Option 2']
      : [],
    validate: { required: false },
  },
]);

    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  const handleSave = () => {
    if (!formName.trim()) {
      alert('Please enter a form name');
      return;
    }
    const id = formName.trim().toLowerCase().replace(/\s+/g, '-');
    saveForm(id, { name: formName.trim(), fields: formFields });
    alert('Form saved!');
  };

  return (
    <Box>
      <SaveFormBar
        formName={formName}
        setFormName={setFormName}
        onSave={handleSave}
      />

      <Box
        ref={drop}
        sx={{
          border: '2px dashed #ccc',
          p: 2,
          minHeight: '60vh',
          backgroundColor: isOver ? '#f5f5f5' : '#fff',
        }}
      >
        {formFields.map((field, index) => (
          <DraggableField
            key={field.id}
            index={index}
            field={field}
            moveField={moveField}
          >
            <Box
              onClick={() => {
                setSelectedField(field);
                setDrawerOpen(true);
              }}
              sx={{
                border: '1px solid #ccc',
                borderRadius: 1,
                p: 2,
                mb: 1,
                backgroundColor: '#fafafa',
                cursor: 'pointer',
              }}
            >
              <strong>{field.label}</strong> ({field.type})
            </Box>
          </DraggableField>
        ))}
      </Box>

      <FieldConfigDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        field={selectedField}
        updateField={updateField}
        deleteField={deleteField}
      />
    </Box>
  );
};
