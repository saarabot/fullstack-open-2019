import React, {useState, useEffect} from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';
import loginService from './services/login';

const App = () => {
    const [ notes, setNotes ] = useState([]);
    const [newNote, setNewNote] =useState('uusi muistiinpano...');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

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

    useEffect(() => {
        const logged = window.localStorage.getItem('loggedUser');
        if(logged) {
            const user = JSON.parse(logged);
            setUser(user);
            noteService.setToken(user.token);
        }
    },[]);

    const handleLogin = async (event) => {
        event.preventDefault();
        //console.log('logging with in with ', username, password);
        try {
            const user = await loginService.login({username, password});
            
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            );
            noteService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setErrorMessage('wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    }

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

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username: <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password: <input type="text" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit">login</button>
        </form>
    )

    const noteForm = () => (
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange}/>
            <button type="submit">Tallenna</button>
        </form>
    )

    const logout = () => {
        window.localStorage.clear();
        window.location.reload();
    }

    return (
        <div>
            <h1>Muistiinpanot</h1>
            <Notification message={errorMessage} />

            {user === null ? loginForm() : <div> <p>{user.name} logged in </p><button onClick={logout}>logout</button><br/> {noteForm()} </div>}

            <div>
                <button onClick={() => setShowAll(!showAll)}>näytä {showAll ? 'vain tärkeät' : 'kaikki'}</button>
            </div>
            <ul>{rows()}</ul>
            
            <Footer />
        </div>
    )
}
export default App;