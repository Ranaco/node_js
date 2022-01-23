const fs = require('fs').promises;


const fileOps = async () => {
    try{
        var data = "hello"
        data = await fs.readFile("./files/dead.txt", 'utf8',);
        console.log(data);
        await fs.appendFile("./files/dead.txt", "Hello world");
        data = await fs.readFile("./files/dead.txt", "utf-8");
        console.log(data);
    }catch(err){
        console.error(err)
    }
}


    fileOps();




    fs.appendFile("./files/dead.txt", "\n\nMy name is Rana", (err) => {
        if(err) throw err;
        console.log("done");
    })

// fs.readFile("./files/starter.txt", 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// })


// process.on("uncaughtException", err => {
//     console.error(`There was an uncaught exception: ${err}`);
//     process.exit(1);
// })

// fs.writeFile("./files/dead.txt", "My name is Rana and it's nice to meet you", (err) => {
//     if(err) throw err;
//     console.log("write done");
// })

// fs.appendFile("./files/low.txt", "Let the light show the way", (err) => {
//     if(err) throw err;
//     console.log("done");
// })