import React, {useState, useEffect} from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';

const App = () => {
    const [ notes, setNotes ] = useState([]);
    const [newNote, setNewNote] =useState('uusi muistiinpano...');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('virhe--');

    useEffect(() => {
        noteService.getAll()
                    .then(initialNotes => {
                        console.log(initialNotes);
                        setNotes(initialNotes);
                    })
                    .catch(e => {
                        console.log('error in getAll');
                        console.log(e);
                    })
    }, []);

    let notesToShow = showAll ? notes : notes.filter(note => note.important);
    //console.log(notesToShow);
    notesToShow  = notesToShow === undefined ? [] : notesToShow;
    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id);
        const changedNote = { ...note, important: !note.important };
        noteService.update(id, changedNote)
                    .then(response => {
                        setNotes(notes.map(note => note.id !== id ? note : response));
                    })
                    .catch(e => {
                        console.log(e);
                        setErrorMessage(`muistiinpano '${note.content}' poistettu palvelimelta`);
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    });
    }

    const rows = () => notesToShow.map(note =>
        <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
        />
    );

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length +1,
        };

        noteService.create(noteObject)
                    .then(response => {
                        setNotes(notes.concat(response));
                        setNewNote('');
                    })
                    .catch(e => {
                        console.log(e);
                    });

    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    }

    const Footer = () => {
        const footerStyle = {
            color: 'green',
            fontStyle: 'italic',
            fontSize: 16
        };

        return (
            <div style={footerStyle}>
                <br/>
                <em>Note app</em>
            </div>
        )
    }

    return (
        <div>
            <h1>Muistiinpanot</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>näytä {showAll ? 'vain tärkeät' : 'kaikki'}</button>
            </div>
            <ul>{rows()}</ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">Tallenna</button>
            </form>
            <Footer />
        </div>
    )
}
export default App;