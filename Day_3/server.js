const path = require('path');
const express = require('express');
const fsPromise = require('fs').promises;
const app = express();

//Finding the port here
const PORT = process.env.PORT || 3500;

app.get('/', async (req, res) => {
    const data = await fsPromise.readFile('./views/index.html', 'utf8');
    res.sendFile('./views/index.html', {root: __dirname});
})

//Listening to the server when it starts
app.listen(PORT, () => console.log(`Starting server on port ${PORT}`))


