import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import NewContact from './components/NewContact';
import Contacts from './components/Contacts';
import personService from './services/persons';

const App = () => {

    const [ persons, setPersons ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ filter, setFilter ] = useState('');

    useEffect(() => {
        personService.getAll().then(initialPersons => {
            setPersons(initialPersons);
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
            personService.create(newContact).then(response => {
                setPersons(persons.concat(response));
            })
            setNewName('');
            setNewNumber('');
        } else {
            if(window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)){
                const newData = {
                    ...found[0],
                    name: newName,
                    number: newNumber
                };
                personService.update(found[0].id, newData).then(response => {
                    setPersons(persons.map(p => p.id !== response.id ? p : response ));
                    setNewName('');
                    setNewNumber('');
                });
            }
        }
    }

    const confirmDelete = (id, name) => {
        if(window.confirm(`Poistetaanko ${name}?`)) {
            personService.del(id).then(() => {
                personService.getAll().then(response => {
                    setPersons(response);
                })
            })
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
            <Contacts filter={filter} contacts={persons} confirmDelete={confirmDelete}/>
        </div>
    );
}

export default App;