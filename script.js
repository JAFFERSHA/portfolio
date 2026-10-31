/* =========================================================
   Portfolio interactions — vanilla JS, no dependencies
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Edit these to change the typing roles in the hero
  const ROLES = ["Software Engineer", "Full Stack Developer", "Backend Specialist", "Problem Solver"];

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Split headings into animated letters ---------- */
  $$("[data-split]").forEach((el) => {
    let ci = 0;
    el.innerHTML = el.textContent
      .trim()
      .split(" ")
      .map((word) =>
        `<span class="word">${[...word]
          .map((ch) => `<span class="mask"><span class="char" style="--ci:${ci++}">${ch}</span></span>`)
          .join("")}</span>`
      )
      .join(" ");
  });

  /* ---------- Preloader ---------- */
  document.body.classList.add("loading");
  const bar = $("#loaderBar"), count = $("#loaderCount");
  let p = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + Math.random() * 18 + 6);
    bar.style.width = p + "%";
    count.textContent = Math.floor(p) + "%";
    if (p >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        $("#loader").classList.add("done");
        document.body.classList.remove("loading");
        startHero();
      }, 250);
    }
  }, reduceMotion ? 10 : 90);

  function startHero() {
    $$(".hero [data-split], .hero .reveal-up").forEach((el, i) => {
      el.style.setProperty("--d", `${i * 0.08}s`);
      el.classList.add("in");
    });
    typeLoop();
  }

  /* ---------- Typing effect ---------- */
  const typed = $("#typed");
  let ri = 0, ti = 0, deleting = false;
  function typeLoop() {
    const word = ROLES[ri];
    typed.textContent = word.slice(0, ti);
    if (!deleting && ti === word.length) { deleting = true; return setTimeout(typeLoop, 1600); }
    if (deleting && ti === 0) { deleting = false; ri = (ri + 1) % ROLES.length; }
    ti += deleting ? -1 : 1;
    setTimeout(typeLoop, deleting ? 40 : 85);
  }

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.matches(".skill-group")) fillBars(e.target);
        if (e.target.matches(".stat")) countUp($("b", e.target));
        io.unobserve(e.target);
      }),
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  $$("section:not(.hero) .reveal-up, .reveal-left, section:not(.hero) [data-split]").forEach((el) => {
    // stagger siblings
    const sib = el.parentElement ? $$(":scope > .reveal-up", el.parentElement) : [];
    const idx = sib.indexOf(el);
    if (idx > 0) el.style.setProperty("--d", `${idx * 0.1}s`);
    io.observe(el);
  });

  function fillBars(group) {
    $$(".bar", group).forEach((b) => {
      const lvl = b.dataset.level;
      $("span", b).dataset.pct = lvl + "%";
      $("i", b).style.setProperty("--w", lvl + "%");
    });
  }
  function countUp(el) {
    const target = +el.dataset.count, start = performance.now(), dur = 1600;
    const step = (t) => {
      const k = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + (k === 1 ? "+" : "");
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Scroll: progress, nav hide, timeline, active link ---------- */
  const nav = $("#nav"), progress = $("#progress"), fill = $("#timelineFill"), timeline = $("#timeline");
  const links = $$(".nav__links a");
  let lastY = 0;
  function onScroll() {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${h ? y / h : 0})`;
    nav.classList.toggle("hide", y > lastY && y > 300 && !nav.classList.contains("open"));
    lastY = y;

    const r = timeline.getBoundingClientRect();
    const k = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
    fill.style.height = k * 100 + "%";

    let current = "";
    $$("main section[id]").forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) current = s.id; });
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  $("#burger").addEventListener("click", () => nav.classList.toggle("open"));
  links.forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

  /* ---------- Starfield (reacts to cursor) ---------- */
  const canvas = $("#stars"), ctx = canvas.getContext("2d");
  let W, H, stars = [], dpr = Math.min(devicePixelRatio || 1, 2);
  const mouse = { x: innerWidth / 2, y: innerHeight / 2, tx: innerWidth / 2, ty: innerHeight / 2 };
  function resize() {
    W = canvas.width = innerWidth * dpr; H = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px"; canvas.style.height = innerHeight + "px";
    const n = Math.min(220, Math.floor((innerWidth * innerHeight) / 7000));
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      z: Math.random() * 0.9 + 0.1, r: Math.random() * 1.4 + 0.3,
      tw: Math.random() * Math.PI * 2, gold: Math.random() < 0.18,
    }));
  }
  resize();
  addEventListener("resize", resize);

  function draw(t) {
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    const ox = (mouse.x - innerWidth / 2) * dpr, oy = (mouse.y - innerHeight / 2) * dpr;
    const sy = scrollY * dpr;
    ctx.clearRect(0, 0, W, H);
    const mx = mouse.x * dpr, my = mouse.y * dpr;
    const pts = [];
    for (const s of stars) {
      let x = (s.x - ox * s.z * 0.05) % W, y = (s.y - oy * s.z * 0.05 - sy * s.z * 0.15) % H;
      if (x < 0) x += W; if (y < 0) y += H;
      const a = 0.4 + Math.sin(t * 0.002 + s.tw) * 0.35;
      ctx.beginPath();
      ctx.arc(x, y, s.r * dpr * s.z * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = s.gold ? `rgba(245,197,66,${a})` : `rgba(255,255,255,${a})`;
      ctx.fill();
      const d = Math.hypot(x - mx, y - my);
      if (d < 160 * dpr) pts.push([x, y, d]);
    }
    // constellation lines around the cursor
    if (finePointer) {
      for (const [x, y, d] of pts) {
        ctx.strokeStyle = `rgba(245,197,66,${(1 - d / (160 * dpr)) * 0.35})`;
        ctx.lineWidth = dpr * 0.6;
        ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(x, y); ctx.stroke();
      }
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  /* ---------- Custom cursor + spotlight ---------- */
  const dot = $("#cursorDot"), ring = $("#cursorRing"), spot = $("#spotlight");
  let rx = mouse.tx, ry = mouse.ty;
  addEventListener("pointermove", (e) => {
    mouse.tx = e.clientX; mouse.ty = e.clientY;
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    spot.style.setProperty("--x", e.clientX + "px");
    spot.style.setProperty("--y", e.clientY + "px");
  });
  (function ringLoop() {
    rx += (mouse.tx - rx) * 0.18; ry += (mouse.ty - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(ringLoop);
  })();
  $$("a, button, .card, .chips li").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
  });

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    $$(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  }

  /* ---------- Hero photo: follows the cursor anywhere on screen ---------- */
  const photo = $("#photo"), glare = $("#glare"), bubble = $("#bubble"), visual = $("#heroVisual");
  const lines = {
    left: "Looking at my work? 👀",
    right: "Over here! 👋",
    top: "Up there? Let's aim higher 🚀",
    bottom: "Scroll down — it gets better ⬇️",
    near: "Nice to meet you! 🤝",
  };
  let lastLine = "";
  function setLine(key) {
    if (key === lastLine) return;
    lastLine = key;
    bubble.textContent = lines[key];
    bubble.classList.remove("pop"); void bubble.offsetWidth; bubble.classList.add("pop");
    setTimeout(() => bubble.classList.remove("pop"), 300);
  }
  if (!reduceMotion) {
    addEventListener("pointermove", (e) => {
      const r = visual.getBoundingClientRect();
      if (r.bottom < 0) return;
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / innerWidth, dy = (e.clientY - cy) / innerHeight;
      photo.style.transform = `rotateY(${dx * 30}deg) rotateX(${-dy * 24}deg) translateZ(0)`;
      glare.style.setProperty("--gx", 50 + dx * 120 + "%");
      glare.style.setProperty("--gy", 40 + dy * 120 + "%");

      const pr = photo.getBoundingClientRect();
      const inside = e.clientX > pr.left && e.clientX < pr.right && e.clientY > pr.top && e.clientY < pr.bottom;
      if (inside) setLine("near");
      else if (Math.abs(dx) > Math.abs(dy)) setLine(dx < 0 ? "left" : "right");
      else setLine(dy < 0 ? "top" : "bottom");
    });
    // gyroscope tilt on phones
    addEventListener("deviceorientation", (e) => {
      if (e.gamma == null) return;
      photo.style.transform = `rotateY(${e.gamma / 3}deg) rotateX(${-(e.beta - 45) / 4}deg)`;
    });
  }

  /* ---------- 3D tilt + spotlight on cards ---------- */
  if (finePointer && !reduceMotion) {
    $$(".tilt").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 10}deg) rotateX(${(0.5 - y) * 10}deg)`;
        el.style.setProperty("--mx", x * 100 + "%");
        el.style.setProperty("--my", y * 100 + "%");
      });
      el.addEventListener("mouseenter", () => (el.style.transition = "transform .15s ease-out, border-color .4s, opacity 1s"));
      el.addEventListener("mouseleave", () => {
        el.style.transition = "transform .6s cubic-bezier(.22,1,.36,1), border-color .4s, opacity 1s";
        el.style.transform = "";
      });
    });
  }
})();
