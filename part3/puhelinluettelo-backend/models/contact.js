const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false })
    .then(res => {
        console.log('connected to Mongo');
    })
    .catch(err => {
        console.log('error: ', err.message);
    });

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        minlength: 8
    }
});


contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Contact', contactSchema);
