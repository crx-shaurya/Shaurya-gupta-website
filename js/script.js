// GSAP Text Animation
gsap.from(".title", {duration: 1, y: -50, opacity: 0, ease: "bounce"});
gsap.from(".tagline", {duration: 1, delay: 0.5, y: 50, opacity: 0, ease: "power2.out"});
gsap.from(".skills", {duration: 1, delay: 1, y: 50, opacity: 0, ease: "power2.out"});
gsap.from(".cta", {duration: 1, delay: 1.5, scale: 0.5, opacity: 0, ease: "back.out(1.7)"});


// Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
cursor.style.left = e.clientX + 'px';
cursor.style.top = e.clientY + 'px';
});


// Three.js Scene for 3D Boy
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('three-canvas'), alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 3;


const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);


const loader = new THREE.GLTFLoader();
loader.load('boy.glb', function(gltf) {
const model = gltf.scene;
scene.add(model);
model.position.set(0, -1, 0);
model.scale.set(1.5, 1.5, 1.5);


function animate() {
requestAnimationFrame(animate);
model.rotation.y += 0.01; // slow rotation
renderer.render(scene, camera);
}
animate();
});