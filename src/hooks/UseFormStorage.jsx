import { useState, useEffect } from 'react';

export const useFormStorage = () => {
  const [forms, setForms] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('savedForms');
    if (saved) setForms(JSON.parse(saved));
  }, []);

  const saveForm = (id, form) => {
    const updated = { ...forms, [id]: form };
    setForms(updated);
    localStorage.setItem('savedForms', JSON.stringify(updated));
  };

  const deleteForm = (id) => {
    const updated = { ...forms };
    delete updated[id];
    setForms(updated);
    localStorage.setItem('savedForms', JSON.stringify(updated));
  };

  return { forms, saveForm, deleteForm };
};
