const fs = require('fs');
 
fs.readFile("./files/starter.txt", 'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
})


process.on("uncaughtException", err => {
    console.error(`There was an uncaught exception: ${err}`);
    process.exit(1);
})

fs.writeFile("./files/dead.txt", "My name is Rana and it's nice to meet you", (err) => {
    if(err) throw err;
    console.log("write done");
})