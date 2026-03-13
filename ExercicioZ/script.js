window.onload = main

function main() {
    const canvas = document.getElementById('meucanvas')
    const square = new Square(0, 0, 0, 'rgb(255, 0, 0)', canvas)    
    canvas.addEventListener('click', (e) => square.update(e.offsetX, e.offsetY))    
    document.getElementById("Botao_C").addEventListener('click', () => square.stepUp())
    document.getElementById("Botao_B").addEventListener('click', () => square.stepDown())
    document.getElementById("Botao_E").addEventListener('click', () => square.stepLeft())
    document.getElementById("Botao_D").addEventListener('click', () => square.stepRight())

    document.getElementById("Barra R").addEventListener('change', () => square.update())
    document.getElementById("Barra G").addEventListener('change', () => square.update())
    document.getElementById("Barra B").addEventListener('change', () => square.update())
    
    document.getElementById("Lado").addEventListener('change', () => square.update())
}

class Square {
    constructor(x, y, size, color, canvas) {
        this.x = x
        this.y = y
        this.size = size
        this.color = color
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas
    }
    stepUp() {
        this.step(0, -this.getPasso())
    }
    stepDown() {
        this.step(0, this.getPasso())
    }
    stepLeft() {
        this.step(-this.getPasso(), 0)
    }
    stepRight() {
        this.step(this.getPasso(), 0)
    }
    step(xIncrement, yIncrement) {        
        this.update(this.x+=xIncrement, this.y+=yIncrement)
    }
    update(x, y) {
        this.x = x? x : this.x
        this.y = y? y : this.y
        this.size = this.getLado()
        this.color = this.getColor()
        this.clean()
        this.draw()
    }
    clean() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    draw() {
        this.ctx.fillStyle = this.color
        let quad = new Path2D();
        quad.moveTo(this.x, this.y);
        quad.lineTo(this.x + this.size, this.y);
        quad.lineTo(this.x + this.size, this.y + this.size);
        quad.lineTo(this.x, this.y + this.size);
        quad.closePath();
        this.ctx.fill(quad);
    }
    getLado() {
        return parseInt(document.getElementById('Lado').value)
    }
    getPasso() {
        return parseInt(document.getElementById('Passo').value)
    }
    getColor() {
        return `rgb(${parseInt(document.getElementById('Barra R').value)}, ${parseInt(document.getElementById('Barra G').value)}, ${parseInt(document.getElementById('Barra B').value)})`
    }
}
