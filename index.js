const canvas = document.getElementById("canvas");
const ctx = document.getElementById("canvas").getContext("2d");

const radius = 50;
const position = {x: window.innerWidth/2, y: window.innerHeight/2};
const last_position = {x: window.innerWidth/2, y: window.innerHeight/2};
const speed = .4;
const direction = {x: 1, y: 1};
const windowSize = {width: window.innerWidth, height: window.innerHeight};


canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

startMainLoop();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
    windowSize = {width: window.innerWidth, height: window.innerHeight};
});

function startMainLoop() {
    MainLoop
        .setBegin((timestamp, delta) => {
        })
        .setUpdate(delta => {
            updatePhysics(delta);
        })
        .setDraw(interpolation => {
            render(interpolation);
        })
        .setEnd((fps, panic) => {
        })
        .start();
}

function updatePhysics(dt) {
    last_position.x = position.x;
    last_position.y = position.y;

    position.x += speed * dt * direction.x;
    position.y += speed * dt * direction.y;

    //not perfect but good enough
    if(position.x <= radius && direction.x == -1) {
        direction.x = 1;
    }
    if(position.x >= (windowSize.width - radius) && direction.x === 1) {
        direction.x = -1;
    }
    if(position.y <= radius && direction.y == -1) {
        direction.y = 1;
    }
    if(position.y >= (windowSize.height- radius) && direction.y === 1) {
        direction.y = -1;
    }
}

function render(interpolation) {
    const x = lerp(last_position.x, position.x, interpolation);
    const y = lerp(last_position.y, position.y, interpolation);
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
}

function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}