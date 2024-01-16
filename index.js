const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
let io = require("socket.io")(httpServer);

const PORT = 8080;  

app.use(express.static('public'));

let connections = [];
io.on('connect',(socket)=>{
    connections.push(socket);
    console.log(`${socket.id} has connected`);

    socket.on('disconnect',(reason)=>{
        console.log(`${socket.id} has disconnected`);
        connections = connections.filter((con)=> con.id !== socket.id);
    });

    socket.on("draw", (data)=>{
        connections.forEach(con =>{
            if(con.id !== socket.id){
                con.emit('onDraw',{x:data.x, y:data.y});
            }
        })
    });

    socket.on("down", (data)=>{
        connections.forEach(con =>{
            if(con.id !== socket.id){
                con.emit('onDown',{x:data.x, y:data.y});
            }
        })
    });
});


httpServer.listen(PORT, ()=>{
    console.log("Server started at:",PORT);
})