import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/PointerLockControls.js";

let scene, camera, renderer, controls, playerModel, cube, playerMeshes = {};

function initializeGame() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB); // Sky-blue background

  // Create the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 1.6; // Player height
  camera.position.z = 5;

  // WebGL Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // PointerLock Controls for first-person view
  controls = new PointerLockControls(camera, document.body);
  document.body.addEventListener("click", () => controls.lock());
  controls.addEventListener("lock", () => console.log("Pointer locked"));
  controls.addEventListener("unlock", () => console.log("Pointer unlocked"));

  // Ground Plane
  const groundGeometry = new THREE.PlaneGeometry(100, 100);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.6);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xFFFFFF, 1);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // Simple player (cube) as a placeholder
  cube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 0.5), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  cube.position.set(0, 1.6, 0);
  scene.add(cube);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    if (controls.isLocked) {
      // Player movement via keyboard
      if (keys["w"]) camera.position.z -= 0.1;
      if (keys["s"]) camera.position.z += 0.1;
      if (keys["a"]) camera.position.x -= 0.1;
      if (keys["d"]) camera.position.x += 0.1;
    }
    renderer.render(scene, camera);
  }
  animate();
}

// Key input for movement
let keys = {};
window.addEventListener("keydown", (event) => { keys[event.key] = true; });
window.addEventListener("keyup", (event) => { keys[event.key] = false; });
