const mongoose = require('mongoose');

if(process.argv.length<3) {
    console.log('not enough parameters');
    process.exit(1);
}

let type = 1;
let name = '';
let number = ''
if(process.argv.length === 5 ) {
    type = 2; 
    name = process.argv[3];
    number = process.argv[4];
} 
const password = process.argv[2];


const url = `mongodb+srv://saarabot:${password}@cluster0-fjni0.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true});

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

if(type === 1) {
    console.log('Phonebook:');
    Contact.find({}).then(result => {
        result.forEach(note => {
            //console.log(note);
            console.log(note.name +" "+ note.number);
        });
        mongoose.connection.close();
    })    
} else {
    const contact = new Contact({
        name: name,
        number: number
    });
    contact.save().then(() => {
        console.log(`Added  ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
}
