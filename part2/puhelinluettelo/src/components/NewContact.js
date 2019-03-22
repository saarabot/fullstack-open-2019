import React from 'react';

const NewContact = ({addNewContact, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
        <>
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
        </>
    );
}

export default NewContact;