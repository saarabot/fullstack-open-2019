import React, { useState } from 'react';
import Filter from './components/Filter';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ filter, setFilter ] = useState('');

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

    const displayPersons = () => {
        if(filter.length === 0) {
            return (
                persons.map(p => {
                    return <p key={p.name}>{p.name} {p.number}</p>
                })
            )
        } else {
            let filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
            
            return (
                filtered.map(p => {
                    return <p key={p.name}>{p.name} {p.number}</p>
                })
            )
        }
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <div >
                Rajaa näytettäviä
                <input value={filter} onChange={handleFilterChange}/>
            </div>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h3>Lisää uusi</h3>
            <form onSubmit={addNewContact}>
                <div>
                    Nimi: <input value={newName} onChange={handleNameChange}/>
                    <br />
                    Numero: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit" >Lisää</button>
                </div>
            </form>
            <h2>Numerot</h2>
            <div>
                {displayPersons()}
                
            </div>
        </div>
    );
}

export default App;