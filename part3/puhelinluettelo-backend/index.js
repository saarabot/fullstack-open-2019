const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let persons = [
    {
        "name": "Arto Hellas",
        "number": "050 123123",
        "id": 1
    }
]

app.use(bodyParser.json());

