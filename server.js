const fs = require('fs').promises;

const appendData = async(need) => {
    try{
        fs.appendFile("./files/new_dead.txt", need, );
    }catch(err){
        throw err;
    }
}

const fileOps = async () => {
    try{
        var data = "hello"
        data = await fs.readFile("./files/dead.txt", 'utf8',);
        console.log(data);
    }catch(err){
        console.error(err)
    }
}

fileOps();
appendData("\nand this is a seprate function to append files to dead.txt");

    //fs.unlink is used to delete a file from the system;


// fs.readFile("./files/starter.txt", 'utf8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// })


process.on("uncaughtException", err => {
    console.error(`\nThere was an uncaught exception: ${err}`);
    process.exit(1);
})

// fs.writeFile("./files/dead.txt", "My name is Rana and it's nice to meet you", (err) => {
//     if(err) throw err;
//     console.log("write done");
// })

// fs.appendFile("./files/low.txt", "Let the light show the way", (err) => {
//     if(err) throw err;
//     console.log("done");
// })