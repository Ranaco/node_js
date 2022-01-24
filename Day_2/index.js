const { format } = require('date-fns');

const logEvent = require('./logEvents');
const eventEmitter = require('events');

class MyEmitter extends eventEmitter{};

const myEmitter = new MyEmitter();

myEmitter.on('log', (data) => logEvent(data));

setTimeout(() => {
    const time = `${format(new Date(), 'yyyy//mm//dd\t\thh::mm::ss')}`
    myEmitter.emit('log', `And the new time is ${time}`);
}, 2000)