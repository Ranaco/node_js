const {format} = require('date-fns');

const logEvents = require('./logEvents');
const eventEmitter = require('events');

//Creating emitter class;
class MyEmitter extends eventEmitter{};


//Creating an object of the emitter class;
const myEmitter = new MyEmitter();


//Adding a listener to log event;
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    const time = `${format(new Date(), 'HH::mm::ss')}`;
    myEmitter.emit('log', `The time now is ${time}`);
}, 2000);


