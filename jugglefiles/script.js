const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let mouse = {x: 0, y: 0};
let maxDragHeight = 200;
let dragging = null;
let tick = 0;
let timer = 0;

class Ball{
    static allInstances = [];
    constructor(x = 0, y = 0){
        this.positionX = x;
        this.positionY = y;
        this.scale = 40;
        this.velocityX = 0;
        this.velocityY = 0;
        this.maxSpeed = 40;
        this.gravityInfluence = 0.4;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        this.img = new Image();
        this.img.src = "jugglefiles/ball.png";
        Ball.allInstances.push(this);
    }
    updatePosition(x, y){
        this.positionX = x;
        this.positionY = y;
        if(x < this.scale/2 || x > 300-this.scale/2){
            this.positionX = Math.min(Math.max(x, this.scale/2), 300-this.scale/2);
            this.updateVelocity(-this.velocityX*0.5, this.velocityY);
        }if(y > 600-this.scale/2){
            this.positionY = 600-this.scale/2;
            this.updateVelocity(this.velocityX, 0);
        }if(y <= maxDragHeight && this.velocityY < 0){
            this.maxSpeed = 4;
        }else{
            this.maxSpeed = 40;
        }
    }
    updateVelocity(x, y){
        let direction = Math.atan2(y,x);
        let scalar = Math.min(Math.sqrt(x**2 + y**2), this.maxSpeed);
        this.velocityX = Math.cos(direction)*scalar;
        this.velocityY = Math.sin(direction)*scalar;
    }
}

new Ball(150, 500);
ctx.font = "30px Verdana";
ctx.textAlign = "center";
setInterval(run, 1000/60);

function run(){
    tick++;
    Ball.allInstances.forEach(ball => {
        if(dragging == ball){
            ball.updateVelocity((mouse.x - ball.positionX + ball.dragOffsetX)/2, (mouse.y - ball.positionY + ball.dragOffsetY)/2);
            ball.updatePosition(mouse.x + ball.dragOffsetX, mouse.y + ball.dragOffsetY);
        }else{
            ball.updatePosition(ball.positionX + ball.velocityX, ball.positionY + ball.velocityY);
            ball.updateVelocity(ball.velocityX, ball.velocityY - ball.gravityInfluence);
        }
    });
    if(tick % 60 == 0){
        timer++;
        timer % 10 == 0 && new Ball(150, 500);
    }
    draw();
}

function draw(){
    ctx.clearRect(0, 0, 300, 600);
    ctx.fillStyle = "#222255";
    ctx.fillRect(0, 0, 300, 600);
    ctx.fillStyle = "#4444aa";
    ctx.fillRect(0, 600-maxDragHeight, 300, maxDragHeight);
    Ball.allInstances.forEach(ball => {
        ctx.drawImage(ball.img, ball.positionX-ball.scale/2, 600-ball.positionY-ball.scale/2, ball.scale, ball.scale);
    });
    ctx.fillStyle = "#ffffff";
    ctx.fillText(timer, 150, 50);
}

function mousePos(c, e){
    let rect = c.getBoundingClientRect();
    let scale = {x:rect.width/300, y: rect.height/600};
    return{
        x: (e.clientX - rect.left)/scale.x,
        y: 600 - (e.clientY - rect.top)/scale.y
    };
}

function mouseDown(event){
    mouse = mousePos(canvas, event);
    Ball.allInstances.forEach(ball => {
        if(dragging == null && mouse.x >= ball.positionX - ball.scale/2 - 10 && mouse.x <= ball.positionX + ball.scale/2 + 10 &&
        mouse.y >= ball.positionY - ball.scale/2 - 10 && mouse.y <= ball.positionY + ball.scale/2 + 10 && mouse.y <= maxDragHeight){
            dragging = ball;
            ball.updateVelocity(0, 0);
            ball.dragOffsetX = ball.positionX - mouse.x;
            ball.dragOffsetY = ball.positionY - mouse.y;
        }
    });
}

function mouseUp(){
    dragging = null;
}

function mouseMove(event){
    mouse = mousePos(canvas, event);
    if(mouse.y >= maxDragHeight){
        mouseUp();
    }
}

canvas.addEventListener("pointerdown", mouseDown);
canvas.addEventListener("pointerup", mouseUp);
canvas.addEventListener("pointermove", mouseMove);
canvas.addEventListener("pointerleave", mouseUp);