let canvas = document.getElementById("canvas");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var io = io.connect("http://localhost:8080/")

let context = canvas.getContext("2d");
let x;
let y;
let mouseDown = false;

window.onmousedown = (e) =>{
    context.moveTo(x,y);
    io.emit('down',{x,y});
    mouseDown = true;
}

window.onmouseup = (e)=>{
    mouseDown = false;
}

io.on('onDraw',({x,y})=>{
    context.lineTo(x,y);
    context.stroke();
});

io.on("onDown",({x,y})=>{
    context.moveTo(x,y);
});
window.onmousemove = (e)=>{
    x = e.clientX;
    y = e.clientY;
    if(mouseDown){
        io.emit("draw",{x,y})
        context.lineTo(x,y);
        context.stroke();
    }
}


