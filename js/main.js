// ====== Utilities ======
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('year').textContent = new Date().getFullYear();

// ====== Preloader ======
const preloader = document.getElementById('preloader');
function hidePreloader() {
  if (!preloader) return;
  preloader.style.opacity = '0';
  setTimeout(() => { preloader.style.display = 'none'; }, 400);
}
window.addEventListener('load', () => {
  // small delay to let fonts/paint settle
  setTimeout(hidePreloader, 300);
});

// ====== Custom Cursor ======
(function cursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let x = 0, y = 0, tx = 0, ty = 0;

  function loop() {
    tx += (x - tx) * 0.2;
    ty += (y - ty) * 0.2;
    ring.style.transform = `translate(${tx}px, ${ty}px)`;
    dot.style.transform  = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(loop);
  }
  window.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; });
  loop();

  // Scale ring on interactive elements
  const boost = (s) => { ring.style.width = s; ring.style.height = s; };
  ['a','button','.btn','.tile'].forEach(sel=>{
    document.querySelectorAll(sel).forEach(el=>{
      el.addEventListener('mouseenter', ()=>boost('48px'));
      el.addEventListener('mouseleave', ()=>boost('32px'));
    });
  });
})();

// ====== Smooth Scroll (Lenis) + GSAP ScrollTrigger sync ======
let lenis;
function initLenis() {
  // Lightweight & Netlify-safe
  // eslint-disable-next-line no-undef
  lenis = new Lenis({ smooth: !prefersReduced, lerp: 0.08, wheelMultiplier: 1.0 });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // eslint-disable-next-line no-undef
  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) { return arguments.length ? window.scrollTo(0, value) : window.scrollY; },
    getBoundingClientRect() { return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }; }
  });
  ScrollTrigger.addEventListener('refresh', () => lenis?.emit('scroll'));
  ScrollTrigger.refresh();
}

// ====== 3D Placeholder (we’ll implement in Step 2) ======
function initThreeHero() {
  // We stub here so Step 1 runs without errors.
  // Real 3D scene with Three.js arrives in Step 2.
}

// ====== GSAP Entrances ======
function introAnimations() {
  // eslint-disable-next-line no-undef
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
  // eslint-disable-next-line no-undef
  gsap.set(['.kicker','.title','.subtitle','.hero-cta .btn','.badge'], { autoAlpha:0, y:16 });
  tl.to('.kicker', { autoAlpha:1, y:0 }, 0.1)
    .to('.title', { autoAlpha:1, y:0 }, 0.2)
    .to('.subtitle', { autoAlpha:1, y:0 }, 0.3)
    .to('.badge', { autoAlpha:1, y:0, stagger:0.05 }, 0.35)
    .to('.hero-cta .btn', { autoAlpha:1, y:0, stagger:0.06 }, 0.45);

  // Tiles on scroll
  // eslint-disable-next-line no-undef
  gsap.utils.toArray('.tile').forEach(el=>{
    // eslint-disable-next-line no-undef
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      y: 40, autoAlpha: 0, duration: 0.9, ease: 'power3.out'
    });
  });
}

// ====== Boot ======
window.addEventListener('DOMContentLoaded', () => {
  initLenis();
  introAnimations();
  initThreeHero();
});
