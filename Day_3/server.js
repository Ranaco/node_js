const path = require('path');
const express = require('express');
const fsPromise = require('fs').promises;
const app = express();

//Finding the port here
const PORT = process.env.PORT || 5000;


//Since the whole get function flows as a stream in express this means the error
//function specified in the last of the chain will be executed if none of the 
//get responses were matched;

app.get('^/$|/index(.html)?', async (req, res) => {//^ => for starts with && $ => for ends with 
    const data = await fsPromise.readFile('./views/index.html', 'utf8');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})



app.get('/new_page(.html)?', async (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new_page.html'));
})

app.get('/old(.html)?', async (req, res) => {
    res.redirect(301, '/new_page.html');//This redirects the page to a predefined route 
    //&& The number at the start means the custom status code 
    //since express gives a status code of 302 for redirection by default
})

//Creating change route handlers

const one = (req, res, next) => {
    console.log("first");
    next();
}

const two = (req, res, next) => {
    console.log("second");
    next();
}

const three = (req, res, next) => {
    res.send("finished");
} 

app.get('/chain(.html)?', [one, two, three]);

//Router handlers
app.get('/hello(.html)?', (req, res, next) => {//Here we are passing another parameter which is a function which just acitvates
    //when it is called and when it is it sends the control the the next function
    console.log('Hello world was attempted');
    next();
}, (req, res, next) => {
    console.log("Hello World");
    next();
}, (req, res) => {
  res.send("hello world")
})



//Sendig a custom 404 error
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'error', '404.html'));//Here we are setting the status 
    //code ourselves since we want to redirect the same satus code as that of the error else express will use the
    //status code of 200 since it could find the file in the directories;
})

//Listening to the server when it starts
app.listen(PORT, () => console.log(`Starting server on port ${PORT}`))


