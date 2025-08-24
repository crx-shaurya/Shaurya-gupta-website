// Loading Screen
window.addEventListener("load", () => {
  document.getElementById("loading-screen").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
  }, 1000);
});

// Custom Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// GSAP Animations
gsap.from(".hero h1", { y: -50, opacity: 0, duration: 1, delay: 0.5 });
gsap.from(".hero p", { y: 50, opacity: 0, duration: 1, delay: 1 });
gsap.from(".hero button", { scale: 0, opacity: 0, duration: 1, delay: 1.5 });

// 3D Boy Model
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("boy-canvas"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(2, 3, 4);
scene.add(light);

// Boy (simple 3D sphere now, replace with real model later)
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x9933ff });
const boy = new THREE.Mesh(geometry, material);
scene.add(boy);

camera.position.z = 5;

// Animation
function animate() {
  requestAnimationFrame(animate);
  boy.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
