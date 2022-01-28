const express = require('express');
const WebSocket = require('ws');
const app = express();
const http = require('http');

const server = http.createServer((req, res) => {

})

const PORT = process.env.PORT || 3500;

const wss = new WebSocket.Server({ server }, () => {

});

wss.on('connection', function connection(ws){
    ws.on('message', function incoming(data) {
        const decode = Buffer.from(data);
        wss.clients.forEach(function each(client) {
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(data);
            }
        })
    })
})

server.listen(PORT, () => {
    console.log(`Server started at port :: ${PORT}`);
})