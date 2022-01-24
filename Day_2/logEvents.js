
const {format} = require('date-fns');
const { v4: uuid} = require('uuid');//Here uuid can be imported as just <---- const uuid = require('uuid'); and then
//could be later used as uuid.v4();

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, 'log'))){
            await fsPromises.mkdir(path.join(__dirname, 'log'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'log', 'log.txt'), logItem);
    }catch(err){
        console.log(err);
    }
}

module.exports = logEvents;
