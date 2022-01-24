const { format } = require("date-fns");
const path = require('path');

const fs = require('fs');
const { v4: uuid} = require("uuid");
const fsPromise = require('fs').promises;

const logEvent = async (message) => {
    const dateTime = `${format(new Date(), 'yyyy/mm/dd\thh::mm::ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${dateTime}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, 'log'))){
            await fsPromise.mkdir(path.join(__dirname, 'log'));
        }
        await fsPromise.appendFile(path.join(__dirname, 'log', 'log.txt'), logItem);
        console.log("done");
    }catch(err){
        throw err;
    }

}

module.exports = logEvent;