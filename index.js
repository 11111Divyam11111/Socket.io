const express = require('express');
const http = require('http');
const path  = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    connectionStateRecovery: {}
});


// Socket IO
// 1.) first line main front end se connect kiya
// 2.) second line main hamne frontend se messsage server par recieve kiya
// 3.) third line main hamne server se message sabko send kiya jo ki wapas frontend 
// par bheja jata hai taki sab use dekh sake
io.on('connection',(socket) => {
    socket.on('server-ko-bhejo',(message)=>{
        console.log(`New message from ${socket.id} : `,message );
        console.log('user connected');
        io.emit('sabko-bhejo',message);
    });
    socket.on('disconnect',() => {
        console.log('user Disconnected');       
    })
});


// http requests ko express handle karega 
app.use(express.static(path.resolve("./public")));
app.get('/',(req,res)=>{
    return res.sendFile('/public/index.html');
})

server.listen(9000 ,()=>{
   console.log('server started at 9000');
});
