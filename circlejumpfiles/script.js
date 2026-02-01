const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let height = 0;
let tick = 0;
let posx = 200;
let posy = -570;
let originx = 200;
let originy = -570;
let prevx = 200;
let prevy = -570;
let angle = Math.PI/2;
let power = 25;
let mode = "angle";
let isPlaying = false;
let platforms = [];
let platformsPerSegment = 2;
let segmentsDrawn = 0;
let score = 0;
let highScore = localStorage.getItem("circlejumphighscore") || 0;
const sounds = {
    stretch: new Audio("circlejumpfiles/stretch.mp3"),
    jump: new Audio("circlejumpfiles/jump.mp3"),
    collision: new Audio("circlejumpfiles/collision.mp3"),
    death: new Audio("circlejumpfiles/death.mp3")
};

ctx.font = "15px Verdana";
setInterval(run, 1000/60);

function run() {
    if(isPlaying){
        height = Math.max(height+.25, posy+100);
    }
    while(height+600 > 100*segmentsDrawn){
        drawSegment();
        segmentsDrawn++;
    }
    for(let i = 0; i < platforms.length; i++){
        while(platforms[i].posy < height-600){
            platforms.splice(i, 1);
        }
    }
    tick++;
    if(mode == "angle"){
        angle = Math.asin(Math.sin(tick/35))+Math.PI/2;
    } else if(mode == "power"){
        power = 50/Math.PI*Math.acos(Math.cos(tick/10))+25;
    } else if(mode == "launching"){
        prevx = posx;
        prevy = posy;
        posx = Math.min(Math.max(power*Math.cos(angle)*(tick/10)+originx, 30), 370);
        posy = power*Math.sin(angle)*(tick/10)-5*(tick/10)**2+originy;
        if(posy < -570 && height < 20){
            land(-570);
        }
        platforms.forEach(platform => {
            if(posx >= platform.posx && posx <= platform.posx+40 && posy <= platform.posy+10 && prevy >= platform.posy+10){
                land(platform.posy+10);
                score = Math.floor(Math.max(posy+570, score));
                highScore = Math.max(score,highScore);
                isPlaying = true;
            }
        })
    }
    if(posy+10 < height-600){
        resetGame();
        sounds.death.play();
    }
    draw();
}

function draw() {
    ctx.clearRect(0, 0, 400, 600);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 20, 600);
    ctx.fillRect(380, 0, 20, 600);
    ctx.fillRect(0, 580+height, 400, 20);
    ctx.fillStyle = "#cccccc";
    platforms.forEach(platform => {
        ctx.fillRect(platform.posx, height-platform.posy, 40, 5);
    })
    ctx.fillStyle = "#cc1a1a";
    ctx.beginPath();
    ctx.arc(posx, height-posy, 10, 0, 2*Math.PI);
    ctx.fill();
    if(mode == "angle" || mode == "power"){
        ctx.translate(posx, height-posy);
        ctx.rotate(-angle);
        ctx.fillRect(20, -5, power+5, 10);
        ctx.moveTo(power+20, -10);
        ctx.lineTo(power+20, 10);
        ctx.lineTo(power+30, 0);
        ctx.closePath();
        ctx.fill();
        ctx.resetTransform();
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillText("SCORE: "+score, 0, 15);
    ctx.fillText("BEST: "+highScore, 0, 30);
}

function launch() {
    if(mode == "angle"){
        mode = "power";
        tick = 0;
        sounds.stretch.play();
    } else if(mode == "power"){
        mode = "launching";
        tick = 0;
        sounds.jump.play();
        sounds.stretch.pause();
        sounds.stretch.currentTime = 0;
    }
}

function land(y) {
    posy = y;
    originx = posx;
    originy = posy;
    angle = Math.PI/2;
    power = 25;
    mode = "angle";
    tick = 0;
    sounds.collision.play();
}

function drawPlatform(x, y) {
    let platform = {posx:x, posy:y};
    platforms[platforms.length] = platform;
}

function drawSegment() {
    for(let i = 0; i < platformsPerSegment; i++){
        drawPlatform(Math.floor(Math.random()*321)+20, segmentsDrawn*100-550+Math.floor(Math.random()*101));
    }
}

function resetGame() {
    localStorage.setItem("circlejumphighscore", highScore);
    height = 0;
    tick = 0;
    posx = 200;
    posy = -570;
    originx = 200;
    originy = -570;
    prevx = 200;
    prevy = -570;
    angle = Math.PI/2;
    power = 25;
    mode = "angle";
    isPlaying = false;
    platforms = [];
    segmentsDrawn = 0;
    score = 0;
}

canvas.addEventListener("click", launch);

window.addEventListener("keydown", function(event){
    if(event.code == "Space"){
        launch();
    } else if(event.code == "KeyR"){
        resetGame();
    }
});