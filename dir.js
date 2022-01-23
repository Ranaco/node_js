const fs = require('fs');

// fs.mkdir("./new", (err) => {
//     if(err) throw err;
//     console.log("Directory created");
// })

//here we are checking a condition if the directory does not exists then create that;
if(!fs.existsSync("./new")){
    fs.mkdir("./new", (err) => {
        if(err) throw err;
        console.log("Directory created");
    })
}

//Here we are cheking if the directory do exist then remove it;
// if(fs.existsSync("./new")){
//     fs.rmdir("./new", (err) => {
//         if(err) throw err;
//         console.log("Directory removed");
//     })
// }

process.on("uncaughtException", err => {
    console.log(`There was an error ${err}`);
})

