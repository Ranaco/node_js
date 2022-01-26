const url = 'ws://localhost:3500/to_a_new_tab'

const ws = new WebSocket(url);

 const message = document.getElementById('messages');
 const input = document.getElementById('message');
 const button = document.getElementById("send");

button.disabled = true;

const sendEntry = (sender, not) => {
    const data = document.createElement('div');
    data.innerText = `${sender} says : ${not}`;
    message.appendChild(data);
}

const sendMessage = () => {
    const text = input.value;
    sendEntry('client', text);
    ws.send(text);
}

button.addEventListener('click', sendMessage, false)

ws.onmessage = (event) => {
    const { data } = event;
    sendEntry('server', data)
}



//This makes sure that the server is live and running
ws.onopen = () => {
    button.disabled = false;
    ws.send('hello server from a local host');
}