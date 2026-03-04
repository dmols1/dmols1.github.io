const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let mouse = {x: 0, y: 0};

class Ball{
    static allInstances = [];
    constructor(x = 0, y = 0){
        this.positionX = x;
        this.positionY = y;
        this.scale = 60;
        this.velocityX = 0;
        this.velocityY = 5;
        this.maxSpeed = 8;
        this.gravityInfluence = 0.15;
        this.isDragging = false;
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
        }
    }
    updateVelocity(x, y){
        this.velocityX = Math.min(Math.max(x, -this.maxSpeed), this.maxSpeed);
        this.velocityY = Math.min(Math.max(y, -this.maxSpeed), this.maxSpeed);
    }
}

new Ball(200, 400);
new Ball(100, 350);
new Ball(250, 300);
new Ball(50, 250);
setInterval(run, 1000/60);

function run(){
    Ball.allInstances.forEach(ball => {
        if(ball.isDragging){
            ball.updateVelocity(mouse.x - ball.positionX + ball.dragOffsetX, mouse.y - ball.positionY + ball.dragOffsetY);
            ball.updatePosition(mouse.x + ball.dragOffsetX, mouse.y + ball.dragOffsetY);
        }else{
            ball.updatePosition(ball.positionX + ball.velocityX, ball.positionY + ball.velocityY);
            ball.updateVelocity(ball.velocityX, ball.velocityY - ball.gravityInfluence);
        }
    });
    draw();
}

function draw(){
    ctx.clearRect(0, 0, 300, 600);
    Ball.allInstances.forEach(ball => {
        ctx.drawImage(ball.img, ball.positionX-ball.scale/2, 600-ball.positionY-ball.scale/2, ball.scale, ball.scale);
    });
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
        if(mouse.x >= ball.positionX - ball.scale/2 && mouse.x <= ball.positionX + ball.scale/2 &&
        mouse.y >= ball.positionY - ball.scale/2 && mouse.y <= ball.positionY + ball.scale/2){
            ball.isDragging = true;
            ball.updateVelocity(0, 0);
            ball.dragOffsetX = ball.positionX - mouse.x;
            ball.dragOffsetY = ball.positionY - mouse.y;
        }
    });
    event.preventDefault();
}

function mouseUp(event){
    Ball.allInstances.forEach(ball => {
        if(ball.isDragging){
            ball.isDragging = false;
        }
    });
    event.preventDefault();
}

function mouseMove(event){
    mouse = mousePos(canvas, event);
    event.preventDefault();
}

canvas.addEventListener("pointerdown", mouseDown);
canvas.addEventListener("pointerup", mouseUp);
canvas.addEventListener("pointermove", mouseMove);
canvas.addEventListener("pointerleave", mouseUp);