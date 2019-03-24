import React from 'react';
import Contact from './Contact';

const Contacts = ({filter, contacts, confirmDelete}) => {
    if(filter.length === 0) {
        return (
            <>
            <h3>Numerot</h3>
            {contacts.map(c => {
                return( 
                    <div key={c.id}>
                        <Contact key={c.id} name={c.name} number={c.number} />
                        <button onClick={() => confirmDelete(c.id, c.name)}>Poista</button>
                    </div>
                )
            })}
            </>
        )
    } else {
        let filtered = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
        
        return (
            <>
            <h3>Numerot</h3>
            {filtered.map(c => {
                return <Contact key={c.name} name={c.name} number={c.number} />
            })}
            </>
        )
    }

}

export default Contacts; 