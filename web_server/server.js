// const { format } = require('date-fns');
// const eventEmitter = require('events');
// const logEvents = require('./logEvents');
// const eventListener = require('./logEvents');
// const path = require('path');
// const fs = require('fs');
// const http = require('http');
// const fsPromise = require('fs').promises;

// //Creating an events class
// class Emitter extends eventEmitter{};

// //Finding the port here
// const PORT = process.env.PORT || 3500;

// //Creating an emitter object
// const emitter = new Emitter();

// //Creating a emitter function to respond to the emit
// emitter.on('rana', (msg) => logEvents(msg));


// //Creating a minimal server here
// const server = http.createServer((req, res) => {
//     console.log(req.method, req.url);
    
//     const extension = path.extname(req.url);


//     //Creating a respose function
// const serverFile = async (filePath, contentType, response) => {
//     try{
//         const rawData = await fsPromise.readFile(
//             filePath,
//             !contentType.includes('image') ? 'utf8' : '' //Not specifiying any type of decryption method so it let the image pass as it is;
//             );
//         const data = contentType === 'application/json' 
//                         ? JSON.parse(rawData) : rawData;
//         response.writeHead(200, {'Content-Type': contentType});
//         if(path.basename(filePath) !== '404.html'){
//             emitter.emit('rana',` ${path.basename(filePath)}\t${req.method}`);
//         }
//         response.end(contentType === 'application/json' ? JSON.stringify(data) : data);
//     }catch(err){
//         console.log(err);
//         response.statusCode = 500;
//         response.end();
//     }
// }



     
//     let contentType;
//     if(req.url === '/close') server.emit('close');

//     switch(extension){
//         case ".css":
//             contentType = 'text/css';
//             break;
//         case ".js":
//             contentType = 'text/javascript';
//             break;
//         case ".txt":
//             contentType = 'text/plain';
//             break;
//         case ".jpg":
//             contentType = 'image/jpg';
//             break;
//         case ".png":
//             contentType = 'image/png';
//             break;
//         case ".json":
//             contentType = 'application/json';
//             break;
//         default:
//             contentType = 'text/html';
//             break;
//     }

//     ///THE CHAIN TURNER :)
//     let filePath = 
//             contentType === "text/html" && req.url ==='/'
//             ? path.join(__dirname, 'views', "index.html") : 
//                 contentType === 'text/html' && req.url.slice(-1) === '/'
//                 ? path.join(__dirname, 'views', req.url, 'index.html')
//                     : contentType === 'text/html' ?
//                         path.join(__dirname, 'views', req.url)
//                             : path.join(__dirname, req.url);

//     if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

//     const fileExists = fs.existsSync(filePath);

//     if(fileExists){
//         serverFile(path.join(filePath), contentType, res);
//     } else {
//         //Redirecting to some new pages
//         switch(path.parse(filePath).base){
//             case 'old.html':
//                 res.writeHead(301, {'Location': "new_page.html"});
//                 res.end();
//                 console.log('new_page.html')
//                 break;
//             case 'new-page.html':
//                 res.writeHead(301, {'Location': '/'});
//                 res.end();
//                 console.log('/homepage');
//                 break;
//             default:
//                 serverFile(path.join(__dirname, 'views', 'error', '404.html'), 'text/html', res);
//         };
//     }
// });

// //Listening to the server when it starts
// server.listen(PORT, () => console.log(`Starting server on port ${PORT}`))


// server.on('close', ()=> {
//     server.close((err) => {
//         console.log(err);
//     })
// })


const fs = require('fs');
const fsPromise = require("fs").promises;
const path = require('path');
const http = require('http');
const logEvents = require('./logEvents');

const Emitter = require('events');

class emitter extends Emitter{};

const MyEmitter = new emitter();

MyEmitter.on('log', (msg) => logEvents(msg));

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    const serveFile = async (filePath, contentType, res) => {
        console.log('hello world');
        try{
           const rawData = await fsPromise.readFile(
               filePath,
               !contentType.includes('image') ?  'utf8' : ''
                );
            const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
           res.writeHead(200, {'Content-Type' : contentType});
           res.end(contentType === 'application/json' ? JSON.stringify(data) : data);
        }catch(err){
            throw err;
            res.statusCode = 500;
            res.end();
        }
    }

    const extension = path.extname(req.url);

    let contentType;

    switch(extension){
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
            break;
    }

    let filePath = contentType === 'text/html' && req.url === '/'
                    ? path.join(__dirname, 'views', 'index.html')
                        : contentType === 'text/html' && req.url.slice(-1) === '/'
                            ? path.join(__dirname, 'views', req.url, 'index.html')  
                                : contentType === 'text/html'
                                    ? path.join(__dirname, 'views', req.url) 
                                        : path.join(__dirname, req.url);

    if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if(fileExists){
        serveFile(filePath, contentType, res);
    } else {
        switch(path.parse(filePath).base){
            case 'old.html':
                res.writeHead(301, {'Location': 'new_page.html'});
                res.end();
                console.log('new_page.html');
                break;
            case 'second':
                res.writeHead(301, {'Location':'/'});
                res.end();
                console.log('/homepage');
                break;
            default:
                serveFile(path.join(__dirname, 'views', 'error', '404.html'), 'text/html', res);
        }
    }
})



server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})