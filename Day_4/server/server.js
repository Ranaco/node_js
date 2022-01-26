const WebSocket = require('ws');

const PORT = process.env.PORT || 3500;

const wss = new WebSocket.Server({
    port: PORT, 
}, function() {
    console.log(`WebSocket is running on port :: ${PORT}`);
})

//Creating a connection function that will respond if there is a connection established
wss.on('connection', (ws) => {
    // ws.send("Hello from server!");
    ws.on('message', function(msg){
        const buf = Buffer.from(msg);
        ws.send(buf.toString());
    })
})

wss.on('listening', (msg) => {
    console.log(msg);

})