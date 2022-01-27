
const URL = `ws://localhost:3500/new_client`;

const ws = new WebSocket(URL);

const button = document.getElementById('send');
const message = document.getElementById('messages');
const input = document.getElementById('message');

button.disabled = true;

// const logEvents = (from, msg) => {

// }

const createEntry = (from, msg) => {
    const data = `${from} says :: ${msg}`;
    const newDiv = document.createElement('div');
    newDiv.innerText = data;
    message.appendChild(newDiv);
}

const sendMessage = () => {
    const msg = input.value;
    createEntry('client', msg);
    ws.send(msg);
    input.value = null;
}

button.addEventListener('click', sendMessage, false);

ws.onopen = () => {
    button.disabled = false;
}

ws.onmessage = (event) => {
    createEntry('server', event.data);
}