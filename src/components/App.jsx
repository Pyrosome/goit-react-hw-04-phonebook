import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import PropTypes from 'prop-types';
import { nanoid } from "nanoid";

export const App = () => {

  const LocalKey = 'contactsList';
  const defaultContacts = [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]

  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contactList')) ?? defaultContacts
  );
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter]  = useState('');

  const handleChangeName = e => {
    const { value } = e.target;
    setName(value);
  };
  const handleChangeNumber = e => {
    const { value } = e.target;
    setNumber(value);
  };

  const handleChangeFilter = evt => {
    const { value } = evt.target; 
    setFilter(value.toLocaleLowerCase())
  }

  const handleSubmitContact = evt => {
    evt.preventDefault();
    const newContact = {
      id: nanoid(),
      name: name,
      number: number
    }

    const exists = contacts.find(contact => contact.name === name);

    if (exists) {
      alert("This contact already exists.");
    }
    else {
      setContacts(prevState => [...prevState, newContact]
      )
    }

    reset();
  }


  useEffect(() => {
    window.localStorage.setItem(LocalKey, JSON.stringify(contacts));
  }, [contacts]);
  
  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter)
    )
  }
    
  const handleDelete = id => {
    setContacts(prevState => {
      let contacts = prevState.filter(contact => contact.id !== id);
      return [...contacts];
    })
  }

  const reset = () => {
    setName('');
    setNumber('')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '70px',
        fontSize: 20,
        color: '#010101'
      }}
    >

      <h1>Phonebook</h1>
      <ContactForm name={name} number={number} onChangeName={handleChangeName} onChangeNumber={handleChangeNumber} onSubmit={handleSubmitContact} />
      <h2 style={{ margin: '0px', marginTop: '50px' }}>Contacts</h2>
      <Filter filter={handleChangeFilter} />
      <ContactList contacts={getFilteredContacts} onDelete={handleDelete} />
        
    </div>
  );
}


App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
}