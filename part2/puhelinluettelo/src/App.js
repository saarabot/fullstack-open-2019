import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import NewContact from './components/NewContact';
import Contacts from './components/Contacts';
import axios from 'axios';

const App = () => {

    const [ persons, setPersons ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ filter, setFilter ] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then(response => {
            setPersons(response.data);
        })
    }, []);

    const addNewContact = (event) => {
        event.preventDefault();
        let found = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase());

        if(found.length === 0) {
            const newContact = {
                name: newName,
                number: newNumber
            };
            setPersons(persons.concat(newContact));
            setNewName('');
            setNewNumber('');
        } else {
            alert(`${newName} on jo luettelossa`);
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>

            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <NewContact 
                addNewContact={addNewContact}
                newName={newName} handleNameChange={handleNameChange}
                newNumber={newNumber} handleNumberChange={handleNumberChange}
            />
            <Contacts filter={filter} contacts={persons} />
        </div>
    );
}

export default App;