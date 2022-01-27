const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;
const { format } = require('date-fns')
const Emitter = require('events');
const express = require('express');
const app = express();

app.use('/', express.static(path.resolve(__dirname, '../client')));

const server = app.listen(5500, () => {
    console.log(`Express server running on port :: 3500`);
})
const PORT = process.env.PORT || 3500;

const webSocket = new WebSocket.Server({server, verifyClient: (info) => {
    console.log(info);
    return false;
}}, () => console.log(`Server started at port :: ${PORT}`));


const clients = [];

webSocket.on('connection', (ws) => {
    clients.push(ws);
    ws.send('Welcome to the websocket');
    ws.on('message',async (event) => {
        const data = Buffer.from(event);
        clients
    // This thing is to check if the ready state of the particular client is open or close if it is then no message will be sent else it
    // can be sent
    //   webSocket.clients.forEach( (event) => {
    //     if(event.readyState === event.OPEN){
    //         event.send(data.toString());
    //     }
    //     })
    })
})

webSocket.on('listening', (event) => {
    console.log(event);
})