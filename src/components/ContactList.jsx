import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector, filterSelector } from 'redux/selectors';
import { deleteContact } from 'redux/contactSlice';

const ContactList = () => {
  const filter = useSelector(filterSelector);
  
  const contacts = useSelector(contactsSelector);
  const dispatch = useDispatch();

  const onDeleteItem = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {filter.length === 0
        ? contacts.map(item => {
            return (
              <li key={nanoid()}>
                {item.name}:{item.number}
                <Button
                  onClick={() => onDeleteItem(item.id)}
                  variant="contained"
                >
                  Delete
                </Button>
              </li>
            );
          })
        : filter.map(item => {
            return (
              <List key={nanoid()}>
                <ListItem>
                  {item.name}:{item.number}
                  <Button
                    onClick={() => onDeleteItem(item.id)}
                    variant="contained"
                  >
                    Contained
                  </Button>
                </ListItem>
              </List>
            );
          })}
    </ul>
  );
};

export default ContactList;
