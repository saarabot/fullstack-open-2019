import React from 'react';
import Contact from './Contact';

const Contacts = ({filter, contacts}) => {
    if(filter.length === 0) {
        return (
            <>
            <h3>Numerot</h3>
            {contacts.map(c => {
                return <Contact key={c.name} name={c.name} number={c.number} />
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