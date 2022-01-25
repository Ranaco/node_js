const path = require('path');
const express = require('express');
const { urlencoded } = require('express');
const fsPromise = require('fs').promises;
const app = express();

/////TODO:
//create port
//create all the use 
//create the routes
//create the chain route in two ways
//create the error page
//start the server

const PORT = process.env.PORT || 3500;

//Creating all the uses
app.use(express.urlencoded({'extended': false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/new_page(.html)', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new_page.html'))
})

const first = (req, res, next) => {
    console.log('first');
    next();
}

const second = (req, res, next) => {
    console.log('second');
    next();
}

const third = (req, res, next) => {
    console.log('thrid');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
}

app.get('/first(.html)?', [first, second, third]);

app.get('/new(.html)?', (req, res, next) => {
    console.log('first');
    next();
}, (req, res) => {
    console.log('second');
    res.send('hello');
})

app.get('old(.html)?', (req, res) => {
    res.redirect(301, 'new_page');
})

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'error', '404.html'));
})



app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})