require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Contact = require('./models/contact');

/*const requestLogger = (req, res, next) => {
    console.log('Method: ', req.method);
    console.log('Path: ', req.path);
    console.log('Body: ',req.body);
    console.log('-----');
    next();
}*/

app.use(bodyParser.json());
//app.use(requestLogger);
app.use(cors());
app.use(express.static('build'));

morgan.token('body', function(req) { return JSON.stringify(req.body) });
app.use(morgan('tiny'));
app.use(morgan(':body'));

app.get('/info', (req, res) => {
    const date = new Date();
    Contact.find({}).then(c => {
        res.send(
            `<p>Puhelinluettelossa on ${c.length} henkilön tiedot</p><p>${date}</p>`
        )
    })
    
});

app.get('/api/persons', (req, res) => {
    Contact.find({}).then(contacts => {
        res.json(contacts);
    });
});

app.get('/api/persons/:id', (req, res, next) => {
    Contact.findById(req.params.id).then(c => {
        if(c) {
            res.json(c);
        } else {
            res.status(404).end();
        }
    }).catch(e => {
        next(e);
    })

})

app.delete('/api/persons/:id', (req, res, next) => {
    Contact.findOneAndRemove(req.params.id).then(response => {
        if(response) {
            //console.log(response);
            console.log('success, reload data');
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    }).catch(err => {
        next(err);
    });
});


app.post('/api/persons', (req, res, next) => {
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
    Contact.find({name: body.name}).then(found => {
        console.log(found);
        if(found.length > 0) {
            res.status(400).send({ error: 'name exists'});
        } else {
            const newContact = new Contact({
                name: body.name,
                number: body.number
            });
        
            newContact
                .save()
                .then(saved => {
                    console.log('saved');
                    res.json(saved)
                })
                .catch(err => next(err));
            
        }
    }).catch(er => {
        next(er);
    });

    
})

app.put('/api/persons/:id', (req, res, next) => {
    //TODO: params are undefined, fix!
    const contact = {
        name: req.body.name,
        number: req.body.number,
    }
    console.log(contact);
    Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
        .then(updated => {
            res.json(updated.toJSON());
        }).catch(err => {
            next(err);
        })
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.log(error);
    if(error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'bad id'});
    } else if(error.name === 'ValidationError') {
        return response.status(400).send({ error: 'input error'});
    }
    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

