/**
 * Black Hole Background — Canvas Animation
 * Accretion disk + orbiting particles + gravitational glow
 */
(function () {
  const canvas = document.getElementById('blackhole-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h, cx, cy, scale;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cx = w / 2;
    cy = h / 2;
    scale = Math.min(w, h) / 900;
  }

  window.addEventListener('resize', resize);
  resize();

  // --- Accretion disk particles ---
  const PARTICLE_COUNT = 260;
  const particles = [];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial) {
      // Orbit radius — mostly in the disk
      const rMin = 28 * scale;
      const rMax = 190 * scale;
      this.r = initial
        ? rMin + Math.random() * (rMax - rMin)
        : rMin + Math.random() * 60 * scale;

      // Angular position
      this.angle = Math.random() * Math.PI * 2;

      // Orbital speed (inner = faster, like real gravity)
      const speedBase = 0.012 / Math.sqrt(Math.max(this.r / scale, 10) / 40);
      this.speed = speedBase * (0.6 + Math.random() * 0.8);

      // Spiral: slowly drift inward
      this.spiral = 0.015 + Math.random() * 0.06;

      // Visual
      this.size = 0.4 + Math.random() * 1.3;
      this.alpha = 0.25 + Math.random() * 0.65;

      // Color — white to golden to orange
      const colors = [
        [255, 255, 255],
        [255, 240, 200],
        [255, 200, 100],
        [255, 150, 50],
        [255, 180, 60],
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];

      // History trail
      this.trail = [];
      this.trailLen = Math.floor(3 + Math.random() * 10);
    }

    update() {
      this.angle += this.speed;
      this.r -= this.spiral * (this.r > 35 * scale ? 1 : 0.1);

      // Recycle particles that fall into the event horizon or drift too far
      if (this.r < 22 * scale || this.r > 220 * scale) {
        this.reset(false);
      }

      // Store trail position
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > this.trailLen) this.trail.shift();
    }

    get x() {
      return cx + Math.cos(this.angle) * this.r;
    }
    get y() {
      return cy + Math.sin(this.angle) * this.r;
    }

    draw(ctx) {
      // Draw trail
      if (this.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let i = 1; i < this.trail.length; i++) {
          ctx.lineTo(this.trail[i].x, this.trail[i].y);
        }
        ctx.strokeStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha * 0.3})`;
        ctx.lineWidth = this.size * 0.5;
        ctx.stroke();
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  // --- Background stars ---
  const STARS = [];
  for (let i = 0; i < 180; i++) {
    STARS.push({
      x: Math.random() * (typeof w !== 'undefined' ? w : 1920),
      y: Math.random() * (typeof h !== 'undefined' ? h : 1080),
      r: 0.3 + Math.random() * 1.2,
      alpha: 0.3 + Math.random() * 0.7,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.005 + Math.random() * 0.02,
    });
  }

  // --- Animation loop ---
  let frame = 0;

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Deep space background
    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.8);
    bgGrad.addColorStop(0, '#000000');
    bgGrad.addColorStop(0.15, '#020205');
    bgGrad.addColorStop(0.4, '#030310');
    bgGrad.addColorStop(0.7, '#010108');
    bgGrad.addColorStop(1, '#000005');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Stars
    STARS.forEach(s => {
      s.twinkle += s.twinkleSpeed;
      const flicker = 0.5 + 0.5 * Math.sin(s.twinkle);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${s.alpha * flicker})`;
      ctx.fill();
    });

    // --- Accretion disk glow rings ---
    // Outer glow
    for (let i = 4; i >= 0; i--) {
      const r = (35 + i * 32) * scale;
      const alpha = 0.03 - i * 0.005;
      const grad = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r * 1.3);
      grad.addColorStop(0, `rgba(255,140,30,${alpha * 1.8})`);
      grad.addColorStop(0.5, `rgba(255,100,20,${alpha})`);
      grad.addColorStop(1, 'rgba(255,60,10,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // Inner bright ring
    const innerGlow = ctx.createRadialGradient(cx, cy, 22 * scale, cx, cy, 48 * scale);
    innerGlow.addColorStop(0, 'rgba(0,0,0,0)');
    innerGlow.addColorStop(0.3, 'rgba(255,180,60,0.08)');
    innerGlow.addColorStop(0.6, 'rgba(255,120,30,0.06)');
    innerGlow.addColorStop(1, 'rgba(255,60,10,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, 48 * scale, 0, Math.PI * 2);
    ctx.fillStyle = innerGlow;
    ctx.fill();

    // --- Particles ---
    particles.forEach(p => {
      p.update();
      p.draw(ctx);
    });

    // --- Event horizon ---
    const ehGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22 * scale);
    ehGrad.addColorStop(0, '#000000');
    ehGrad.addColorStop(0.6, '#000000');
    ehGrad.addColorStop(0.85, '#030308');
    ehGrad.addColorStop(1, 'rgba(10,5,20,0.3)');
    ctx.beginPath();
    ctx.arc(cx, cy, 22 * scale, 0, Math.PI * 2);
    ctx.fillStyle = ehGrad;
    ctx.fill();

    // --- Photon ring (thin bright ring just outside event horizon) ---
    ctx.beginPath();
    ctx.arc(cx, cy, 25 * scale, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,200,100,${0.15 + Math.sin(frame * 0.02) * 0.05})`;
    ctx.lineWidth = 1.5 * scale;
    ctx.shadowColor = 'rgba(255,150,40,0.5)';
    ctx.shadowBlur = 8 * scale;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // --- Gravitational lensing arcs (top and bottom) ---
    const arcAlpha = 0.06 + Math.sin(frame * 0.015) * 0.02;
    for (let side = -1; side <= 1; side += 2) {
      ctx.beginPath();
      ctx.arc(cx, cy, 34 * scale, -Math.PI * 0.35 * side, Math.PI * 1.35 * side, side < 0);
      ctx.strokeStyle = `rgba(180,200,255,${arcAlpha})`;
      ctx.lineWidth = 3 * scale;
      ctx.shadowColor = 'rgba(150,180,255,0.3)';
      ctx.shadowBlur = 6 * scale;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    frame++;
    requestAnimationFrame(draw);
  }

  draw();

  // Reposition stars on resize
  window.addEventListener('resize', () => {
    STARS.forEach(s => {
      s.x = Math.random() * w;
      s.y = Math.random() * h;
    });
  });
})();
