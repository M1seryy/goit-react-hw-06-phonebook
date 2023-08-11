import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { nanoid } from '@reduxjs/toolkit';

import { addContact } from 'redux/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector } from 'redux/selectors';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelector);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onCheckDublicate = obj => {
    contacts.map(item => {
      if (item.name === obj.name && item.number === obj.number) {
        alert(`${obj.name} is already in contact list`);
        dispatch(contacts.filter(contact => contact.name !== obj.name));
      }
      return item.name;
    });
  };

  const onAddContacts = newContact => {
    if (newContact.name !== '' && newContact.number !== '') {
      onCheckDublicate(newContact);
      dispatch(addContact(newContact));
    }
  };

  const onFormHandler = e => {
    e.preventDefault();

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    onAddContacts(contact);
    setName('');
    setNumber('');
  };

  const onHandleChange = e => {
    if (e.currentTarget.name === 'name') {
      setName(e.currentTarget.value);
    }
    if (e.currentTarget.name === 'number') {
      setNumber(e.currentTarget.value);
    }
  };

  return (
    <form onSubmit={onFormHandler}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onHandleChange}
          value={name}
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Phone number"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          multiline
          maxRows={4}
          onChange={onHandleChange}
          type="tel"
          value={number}
        />
      </Box>
      <input type="submit" value={'Send'} />
    </form>
  );
};

export default ContactForm;
