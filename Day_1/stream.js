const fs = require('fs');

const ra = fs.createReadStream("./files/dead.txt", "utf8");
const wa = fs.createWriteStream(`./files/new_dead.txt`);

ra.pipe(wa);
//The above code is same as 
// ra.on('data', (datChunk) => {
//     wa.write(datChunk);
// })