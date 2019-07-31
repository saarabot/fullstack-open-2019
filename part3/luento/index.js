require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const Note = require('./models/note');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));

app.get('/api/notes', (req, res) => {
    console.log('get notes');
    let notes = [];
    Note.find({}).then(response => {
        console.log(response[0].toJSON());
        response.forEach(element => {
            notes.push(element);
        });
        res.json(notes);
        //response.json(note.toJSON());
    });
});

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => {
        //console.log(response);
        if(note) {
            res.json(note.toJSON());
        } else {
            res.status(404).end();
        }
    }).catch(er => next(er));
});

app.delete('/api/notes/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id).then(response => {
        //console.log(response);
        res.status(204).end();
    }).catch(err => next(err));
});

app.post('/api/notes', (request, response) => {
    const body = request.body;
    if(body.content === undefined) {
        return response.status(400).json({ error: 'content missing' });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        response.json(savedNote.toJSON());
    })
});

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    return maxId +1;
}

app.post('/api/notes', (req, res) => {
    if(!req.body.content) {
        return res.status(400).json({
            error: 'content missing'
        });
    }
    const note = {
        content: req.body.content,
        important: req.body.important || false,
        date: new Date(),
        id: generateId()
    }
    notes = notes.concat(note);
    res.json(note);
})

app.put('/api/notes/:id', (req, res) => {
    const body = req.params.body;

    const note = {
        content: body.content,
        important: body.important,
    };

    Note.findByIdAndUpdate(req.params.id, note, { new: true }).then( updated => {
        res.json(updated.toJSON());
    }).catch(error => next(error));

    /*
    Note.findOne({_id: req.params.id}).then(note => {
        note.important = !note.important;
        note.save().then( updatedNote => {
            res.json(updatedNote.toJSON());
        })
    })*/

})

const errorHandler = (error, request, response, next) => {
    console.log(error.message);
    if(error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    }

    next(error);
};

app.use(errorHandler);

const unknownEndPoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndPoint);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Success! Server running on port ${PORT}`);