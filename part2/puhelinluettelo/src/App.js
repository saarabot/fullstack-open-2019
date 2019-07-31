import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import NewContact from './components/NewContact';
import Contacts from './components/Contacts';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {

    const [ persons, setPersons ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ filter, setFilter ] = useState('');
    const [ message, setMessage ] = useState(null);
    const [ notificationType, setNotificationType ] = useState(null); 
    

    useEffect(() => {
        personService.getAll().then(initialPersons => {
            setPersons(initialPersons);
        }).catch(e => {
            console.log(e);
            setMessage('Tapahtui virhe');
            setNotificationType(2);
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        });
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
                setNotificationType(1);
                setMessage(`Lisättiin ${response.name}`);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            }).catch(e => {
                setMessage(e.response.data.error);
                setNotificationType(2);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            });
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
                    setMessage(`Päivitettiin ${newName}`);
                    setNotificationType(1);
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);
                    setPersons(persons.map(p => p.id !== response.id ? p : response ));
                    setNewName('');
                    setNewNumber('');
                }).catch(e => {
                    setMessage('Tapahtui virhe');
                    setNotificationType(2);
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);
                });;
            }
        }
    }

    const confirmDelete = (id, name) => {
        if(window.confirm(`Poistetaanko ${name}?`)) {
            personService.del(id).then(() => {
                setMessage(`Poistettiin ${name}`);
                setNotificationType(1);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
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
            <Notification message={message} notificationType={notificationType}/>
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