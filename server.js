const fs = require('fs');
 
fs.readFile("./files/index.txt", 'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
})


process.on("uncaughtException", err => {
    console.error(`There was an uncaught exception: ${err}`);
    process.exit(1);
})