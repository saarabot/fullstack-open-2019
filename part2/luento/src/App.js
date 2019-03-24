import React, {useState, useEffect} from 'react';
import Note from './components/Note';
import noteService from './services/notes';

const App = () => {
    const [ notes, setNotes ] = useState([]);
    const [newNote, setNewNote] =useState('uusi muistiinpano...');
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        noteService.getAll()
                    .then(initialNotes => {
                        setNotes(initialNotes);
                    })
                    .catch(e => {
                        console.log(e);
                    })
    }, []);

    const notesToShow = showAll ? notes : notes.filter(note => note.important);

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id);
        const changedNote = { ...note, important: !note.important };
        noteService.update(id, changedNote)
                    .then(response => {
                        setNotes(notes.map(note => note.id !== id ? note : response));
                    })
                    .catch(e => {
                        console.log(e);
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

    return (
        <div>
            <h1>Muistiinpanot</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>näytä {showAll ? 'vain tärkeät' : 'kaikki'}</button>
            </div>
            <ul>{rows()}</ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">Tallenna</button>
            </form>
        </div>
    )
}
export default App;