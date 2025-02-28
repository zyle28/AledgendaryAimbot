const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let stars = [];
const FPS = 60;
const numStars = 100;
const mouse = { x: 0, y: 0 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

// Initialize stars
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    
    // Draw stars
    stars.forEach(star => {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Draw connections
    ctx.beginPath();
    stars.forEach((starI, i) => {
        ctx.moveTo(starI.x, starI.y);
        if(distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
        stars.forEach((starII, j) => {
            if(i !== j && distance(starI, starII) < 150) {
                ctx.lineTo(starII.x, starII.y);
            }
        });
    });
    ctx.lineWidth = 0.05;
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function update() {
    stars.forEach(star => {
        star.x += star.vx / FPS;
        star.y += star.vy / FPS;
        
        if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
        if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;
    });
}

function distance(point1, point2) {
    return Math.hypot(point2.x - point1.x, point2.y - point1.y);
}

// Event listeners
canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
    resizeCanvas();
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1 + 1,
            vx: Math.floor(Math.random() * 50) - 25,
            vy: Math.floor(Math.random() * 50) - 25
        });
    }
});

// Animation loop
function tick() {
    draw();
    update();
    requestAnimationFrame(tick);
}
tick();