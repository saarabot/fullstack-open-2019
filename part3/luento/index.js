const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let notes = [
    {
      id: 1,
      content: 'HTML on helppoa',
      date: '2017-12-10T17:30:31.098Z',
      important: true,
    },
    {
      id: 2,
      content: 'Selain pystyy suorittamaan vain javascriptiä',
      date: '2017-12-10T18:39:34.091Z',
      important: false,
    },
    {
      id: 3,
      content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
      date: '2017-12-10T19:20:14.298Z',
      important: true,
    },
];

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
});

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.get('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(note => note.id === id);
    if(note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
});

app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    console.log('del');
    notes = notes.filter(note => note.id !== id);

    res.status(204).end();
});

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    return maxId +1;
}

app.post('/notes', (req, res) => {
    console.log(req);
    if(!req.body.content) {
        return res.status(400).json({
            error: 'content missing'
        });
    }
    const note = {
        content: req.body.content,
        importand: req.body.important || false,
        date: new Date(),
        id: generateId()
    }
    notes = notes.concat(note);
    res.json(note);
})

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);