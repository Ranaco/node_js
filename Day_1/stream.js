const fs = require('fs');
const stream = require("stream");

const rs = fs.createReadStream("./dead.txt", {encoding: "utf8"});

const ws = fs.createWriteStream("./new_dead.txt");

rs.on('data', (data) => {
    ws.write(data);
})