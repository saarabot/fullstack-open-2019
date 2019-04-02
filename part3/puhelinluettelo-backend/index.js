const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

let persons = [
    {
        "name": "Arto Hellas",
        "number": "050 123123",
        "id": 1
    },
    {
        "name": "Aro Järvinen",
        "number": "050 234235123",
        "id": 2
    },
    {
        "name": "Hella Joki",
        "number": "050 1321423",
        "id": 3
    }
]

const requestLogger = (req, res, next) => {
    console.log('Method: ', req.method);
    console.log('Path: ', req.path);
    console.log('Body: ',req.body);
    console.log('-----');
    next();
}

app.use(bodyParser.json());
//app.use(requestLogger);
morgan.token('body', function(req, res) { return JSON.stringify(req.body) });
app.use(morgan('tiny'));
app.use(morgan(':body'));

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(
        `<p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p><p>${date}</p>`
    )
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const p = persons.find(p => p.id === id);
    if(p) {
        res.json(p);
    } else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);
    res.status(204).end();
})

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
    return maxId + 1;
}

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if(!body.name) {
        return res.status(400).json({
            error: 'Name missing'
        })
    }
    if(!body.number) {
        return res.status(400).json({
            error: 'Number missing'
        })
    }
    persons.map((p) => {
        if(p.name.toLowerCase() === body.name.toLowerCase()) {
            return res.status(400).json({
                error: 'Person already exists'
            })  
        }
    })

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    };

    persons = persons.concat(person);
    res.json(person);

})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

