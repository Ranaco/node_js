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

//Assigning the port
const PORT = process.env.PORT || 3500;


//Creating all the uses for the middleware

app.use(express.urlencoded({'extended': false}));

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

//Route for the home page or the root route
app.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

//Route for the new page
app.get('/new_page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new_page.html'));
})

app.get ('/claw(.png)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'claw.png'));
})

//Redirecting route to new page
app.get('/old(.html)?', (req, res) => {
    res.redirect(301, '/new_page.html');
})

//Creating chain from a single application
app.get('/start(.html)', (req, res) => {

})

//Listening to server
app.listen(PORT, () => {
    console.log(`Server started at port :: ${PORT}`);
})