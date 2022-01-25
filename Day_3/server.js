const path = require('path');
const express = require('express');
const fsPromise = require('fs').promises;
const app = express();

//Finding the port here
const PORT = process.env.PORT || 5000;

app.get('^/$|/index.html|index', async (req, res) => {
    const data = await fsPromise.readFile('./views/index.html', 'utf8');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/new_page.html', async (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new_page.html'));
})

//Listening to the server when it starts
app.listen(PORT, () => console.log(`Starting server on port ${PORT}`))


