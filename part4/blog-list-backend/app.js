const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const mongoose = require('mongoose');

console.log('connecting: ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true }).then(() => {
    console.log('connected.');
}).catch(err => {
    console.log('error: ',err.message);
});

app.use(cors());
//app.use(express.static('build'));
app.use(bodyParser.json());

app.use('/api/blogs', blogRouter);


module.exports = app;