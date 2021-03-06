const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const { v4: uuid} = require('uuid');
const { format } = require('date-fns');

const logEvents = async (message = 'no message') => {
    const dateTime = `${format(new Date(), 'yy/MM/dd\thh::mm::ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, 'log'))){
            await fsPromise.mkdir(path.join(__dirname, 'log'));
        }
        await fsPromise.appendFile(path.join(__dirname, 'log', 'log.txt'), logItem);
    }catch(err){
        throw err;
    }
}

module.exports = logEvents;

