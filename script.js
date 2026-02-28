/* ================================================================
   LOKESH PANDEY — PORTFOLIO v4 — Premium Interactions
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Particle Canvas ── */
  const c = document.getElementById('bgCanvas');
  if (c) {
    const x = c.getContext('2d'); let pts = [];
    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize(); addEventListener('resize', resize);
    class P {
      constructor() { this.x = Math.random() * c.width; this.y = Math.random() * c.height; this.r = Math.random() * 1.5 + 0.5; this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3; this.o = Math.random() * 0.3 + 0.1; this.c = ['99,102,241', '34,211,238', '167,139,250'][~~(Math.random() * 3)]; }
      update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > c.width) this.vx *= -1; if (this.y < 0 || this.y > c.height) this.vy *= -1; }
      draw() { x.beginPath(); x.arc(this.x, this.y, this.r, 0, Math.PI * 2); x.fillStyle = `rgba(${this.c},${this.o})`; x.fill(); }
    }
    for (let i = 0; i < 65; i++) pts.push(new P());
    (function loop() {
      x.clearRect(0, 0, c.width, c.height);
      for (let a = 0; a < pts.length; a++) {
        pts[a].update(); pts[a].draw();
        for (let b = a + 1; b < pts.length; b++) {
          const dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) { x.beginPath(); x.strokeStyle = `rgba(99,102,241,${(1 - d / 120) * 0.15})`; x.lineWidth = 0.4; x.moveTo(pts[a].x, pts[a].y); x.lineTo(pts[b].x, pts[b].y); x.stroke(); }
        }
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ── Scroll Progress ── */
  const bar = document.getElementById('scrollBar');
  addEventListener('scroll', () => { bar.style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + '%'; });

  /* ── Back to Top ── */
  const btt = document.getElementById('btt');
  addEventListener('scroll', () => btt.classList.toggle('show', scrollY > 500));
  btt.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Navbar ── */
  const nav = document.getElementById('topbar');
  const secs = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.navmenu a');
  addEventListener('scroll', () => {
    nav.classList.toggle('stuck', scrollY > 50);
    let cur = '';
    secs.forEach(s => { if (scrollY >= s.offsetTop - 150) cur = s.id; });
    links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
  });

  /* ── Hamburger ── */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('navmenu');
  burger.addEventListener('click', () => { burger.classList.toggle('open'); menu.classList.toggle('open'); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { burger.classList.remove('open'); menu.classList.remove('open'); }));

  /* ── Typing ── */
  const el = document.getElementById('typedText');
  const words = ['Data Analyst | ML Engineer', 'Data Analyst | Power BI Developer', 'Analytics & ML Expert'];
  let wi = 0, ci = 0, del = false, sp = 85;
  (function type() {
    const w = words[wi];
    if (del) { el.textContent = w.substring(0, --ci); sp = 30; }
    else { el.textContent = w.substring(0, ++ci); sp = 80; }
    if (!del && ci === w.length) { sp = 2200; del = true; }
    else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; sp = 400; }
    setTimeout(type, sp);
  })();

  /* ── Counters ── */
  let counted = false;
  function counters() {
    if (counted) return; counted = true;
    document.querySelectorAll('.stat-val').forEach(el => {
      const t = +el.dataset.target, s = performance.now();
      (function up(n) {
        const p = Math.min((n - s) / 2000, 1);
        const e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(e * t) + (t <= 6 ? '+' : t === 84 ? '%' : '+');
        if (p < 1) requestAnimationFrame(up);
      })(s);
    });
  }

  /* ── Skill Bars ── */
  let barsDone = false;
  function bars() {
    if (barsDone) return; barsDone = true;
    document.querySelectorAll('.bar-fg').forEach((b, i) => {
      setTimeout(() => { b.style.width = b.dataset.w + '%'; b.classList.add('go'); }, i * 200);
    });
  }

  /* ── Scroll Reveals ── */
  const obs = new IntersectionObserver(ents => { ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.rv,.rv-l,.rv-r,.rv-s,.stg').forEach(el => obs.observe(el));

  // Counter trigger
  const heroM = document.querySelector('.stats-row');
  if (heroM) new IntersectionObserver(e => { if (e[0].isIntersecting) counters(); }, { threshold: 0.5 }).observe(heroM);
  // Bars trigger
  const skSec = document.querySelector('.skills');
  if (skSec) new IntersectionObserver(e => { if (e[0].isIntersecting) bars(); }, { threshold: 0.15 }).observe(skSec);

  /* ── Smooth Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── 3D Tilt on Project Cards ── */
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-10px) perspective(800px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ── Contact Form ── */
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    const d = new FormData(this);
    const s = encodeURIComponent((d.get('subject') || 'Contact') + ' — from ' + d.get('name'));
    const b = encodeURIComponent('From: ' + d.get('name') + ' (' + d.get('email') + ')\n\n' + d.get('message'));
    location.href = `mailto:pandeylokesh87@gmail.com?subject=${s}&body=${b}`;
    this.reset();
  });

  /* ── Custom Cursor ── */
  const cursorDot = document.getElementById("cursorDot");
  const cursorOutline = document.getElementById("cursorOutline");
  if (cursorDot && cursorOutline && window.innerWidth > 900) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Add a slight delay for the outline for a cool trailing effect
      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 150, fill: "forwards" });
    });

    // Hover effect on links and buttons
    const interactables = document.querySelectorAll('a, button, input, textarea, .nav3d, .proj-card, .btn-glow, .btn-border, .sk-chip, .fd-btn');
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.classList.add("hovering");
        cursorOutline.classList.add("hovering");
      });
      el.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("hovering");
        cursorOutline.classList.remove("hovering");
      });
    });
  }

  /* ── Side Dot Scroll Nav ── */
  const sections = document.querySelectorAll("section");
  const navDots = document.querySelectorAll(".sn-dot");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navDots.forEach((dot) => {
      dot.classList.remove("active");
      if (dot.getAttribute("href").includes(current)) {
        dot.classList.add("active");
      }
    });
  });

});
