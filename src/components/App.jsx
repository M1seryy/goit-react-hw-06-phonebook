import React, { useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { contactsSelector, filterSelector } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from 'redux/contactSlice';
import { setFilterReducer } from 'redux/filterSlice';

function App() {
  const cont = useSelector(contactsSelector);
  const filter = useSelector(filterSelector);
  const dispatch = useDispatch();
  // const [contacts, setContacts] = useState(() => {
  //   return (
  //     JSON.parse(localStorage.getItem('items')) ?? [
  //       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //     ]
  //   );
  // });
  const onFilterHandler = e => {
    const newArr = cont.filter(item => {
      if (e.target.value === '') {
        return e.target.value;
      } else {
        return item.name.toLowerCase().includes(e.target.value);
      }
    });
    dispatch(setFilterReducer(newArr));
    // setFilter(newArr);
  };

  const onCheckDublicate = obj => {
    cont.map(item => {
      if (item.name === obj.name) {
        alert(`${obj.name} is already in contact list`);
        dispatch(cont.filter(contact => contact.name !== obj.name));
      }
      return item.name;
    });
  };

  const onDeleteItem = id => {
    dispatch(deleteContact(id));
  };

  const onAddContacts = newContact => {
    if (newContact.name !== '' && newContact.number !== '') {
      onCheckDublicate(newContact);
      dispatch(addContact(newContact));
    }
  };

  // useEffect(() => {
  //   window.localStorage.setItem('items', JSON.stringify(cont));
  // }, [cont]);
// localStorage.clear()
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('items'));
    console.log('data: ', data);
    if (data) {
      // dispatch(getFromStorage(data));
    }
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <ContactForm onAdd={onAddContacts} />
      <h1>Contacts</h1>
      <Filter onFilter={onFilterHandler} />

      <ContactList filter={filter} contacts={cont} onFilter={onDeleteItem} />
    </div>
  );
}

export default App;
