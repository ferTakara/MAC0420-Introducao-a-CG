window.onload = main

var ctx;
var interface = {
    side: 'l',
    size: 50    
}

var canvas;
var lastEvent;
var lado;
function main() {
    console.log("Starting");
    initControl()
    initCanvas()
}

function initControl() {
    lado = document.getElementById('Lado')
    lado.addEventListener('change', controlEventListener)
    barra_r  = document.getElementById("Barra R")
    barra_r .addEventListener('change', (e) => controlEventListener(e, 'r'))
    barra_g  = document.getElementById("Barra G")
    barra_g .addEventListener('change', (e) => controlEventListener(e, 'g'))
    barra_b  = document.getElementById("Barra B")
    barra_b .addEventListener('change', controlEventListener)
    lado = document.getElementById("Lado")
    lado.addEventListener('change', controlEventListener)
    botao_c  = document.getElementById("Botao_C")
    botao_c .addEventListener('click', controlEventListener)
    botao_e  = document.getElementById("Botao_E")
    botao_e .addEventListener('click', controlEventListener)
    botao_d  = document.getElementById("Botao_D")
    botao_d .addEventListener('click', controlEventListener)
    botao_b = document.getElementById("Botao_B")
    botao_b.addEventListener('click', controlEventListener)
    passo  = document.getElementById("Passo")
    passo .addEventListener('change', controlEventListener)
}
function controlEventListener(e, type) {
    console.log(type, e.target.value)
    let step = passo.value
    if (type == ">"){
        drawSquare(interface.coords.x + step, interface.coords.y)
    }
    if (type == "V"){
        drawSquare(interface.coords.x, interface.coords.y + step)
        
    }
    if (type == "<"){
        drawSquare(interface.coords.x - step, interface.coords.y)
        
    }
    if (type == "^"){
        drawSquare(interface.coords.x, interface.coords.y - step)
        
    }
    lastEvent = e
}
function initCanvas() {    
    console.log("getting context")
    canvas = document.getElementById('meucanvas')
    ctx = canvas.getContext('2d')   
    canvas.addEventListener('click', clickHandler)
}


function clickHandler(e) {
    const coords = { 'x': e.offsetX, 'y': e.offsetY}
    interface.coords = coords
    console.log(`handling click on ${coords}`)    
    drawSquare(coords.x, coords.y)
}

function drawSquare(x, y) {    
    cleanCanvas()
    let quad = new Path2D();
    let r = barra_r.value
    let g= barra_g.value
    let b = barra_b.value
    let size = parseInt(lado.value)
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    
    console.log(`drawing, ${x}, ${y},${size}`)
    quad.moveTo( x, y);
    quad.lineTo( x+size, y);
    quad.lineTo( x+size, y+size);
    quad.lineTo( x, y+size);
    quad.closePath();
    ctx.fill(quad);    
}


function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}