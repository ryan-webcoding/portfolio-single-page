const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const maxParticles = 200;
const mouse = { x: null, y: null, radius: 100 };
const textParticles = [];
const textSize = 100; // Adjust for text size
const density = 5; // Lower number = denser text
const textMessage = "Hi, I'm Ryan, a Web Developer";

class Particle {
  constructor(x, y, isTextParticle = false) {
    this.originX = x;
    this.originY = y;
    this.x = x + (Math.random() - 0.5) * 50;
    this.y = y + (Math.random() - 0.5) * 50;
    this.size = (Math.random() * 5 + 2) * 0.4;
    this.speedX = (Math.random() - 0.5) * 0.1;
    this.speedY = (Math.random() - 0.5) * 0.1;
    this.life = Math.random() * 1000 + 1000;
    this.isTextParticle = isTextParticle;
  }

  update() {
    if (this.isTextParticle) {
      let dx = this.originX - this.x;
      let dy = this.originY - this.y;
      this.x += dx * 0.05;
      this.y += dy * 0.05;
    } else {
      this.x += this.speedX;
      this.y += this.speedY;
    }
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

function createTextParticles() {
  const textCanvas = document.createElement("canvas");
  const textCtx = textCanvas.getContext("2d");
  textCanvas.width = canvas.width;
  textCanvas.height = canvas.height;
  textCtx.fillStyle = "white";
  textCtx.font = `${textSize}px Arial`;
  textCtx.textAlign = "center";
  textCtx.textBaseline = "middle";
  textCtx.fillText(textMessage, canvas.width / 2, canvas.height / 2);

  const textData = textCtx.getImageData(
    0,
    0,
    textCanvas.width,
    textCanvas.height
  ).data;
  for (let y = 0; y < textCanvas.height; y += density) {
    for (let x = 0; x < textCanvas.width; x += density) {
      const index = (y * textCanvas.width + x) * 4;
      if (textData[index + 3] > 128) {
        textParticles.push(new Particle(x, y, true));
      }
    }
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius) {
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / mouse.radius})`;
      ctx.lineWidth = 3 - (distance / mouse.radius) * 2;
      ctx.stroke();
    }
  }
}

function createParticles() {
  if (particles.length < maxParticles) {
    particles.push(
      new Particle(Math.random() * canvas.width, Math.random() * canvas.height)
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.draw();
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  textParticles.forEach((p) => {
    p.update();
    p.draw();
  });

  connectParticles();
  createParticles();
  requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

canvas.addEventListener("click", () => {
  for (let p of [...particles, ...textParticles]) {
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius) {
      let angle = Math.atan2(dy, dx);
      let force = 2; // Adjust force of repulsion
      p.speedX = -Math.cos(angle) * force;
      p.speedY = -Math.sin(angle) * force;
    }
  }
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  textParticles.length = 0;
  createTextParticles();
});

createTextParticles();
animate();
