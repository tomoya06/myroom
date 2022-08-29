import * as THREE from "three";
import { PMREMGenerator, sRGBEncoding } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
renderer.toneMappingExposure = 1;
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const pmremGenerator = new PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
const neutralEnv = pmremGenerator.fromScene(new RoomEnvironment()).texture;
scene.environment = neutralEnv;
renderer.outputEncoding = sRGBEncoding;

camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);

function loadLights() {
  const light = new THREE.AmbientLight(0xffffff, 0.3);
  const dlight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(light);
  scene.add(dlight);
}

async function loadModels() {
  const loader = new GLTFLoader();
  const roomGltf = await loader.loadAsync("src/assets/gameroom.glb");
  scene.add(roomGltf.scene);
}

camera.position.z = 5;

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}

animate();

loadLights();
loadModels();
