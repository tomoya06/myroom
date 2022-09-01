import * as THREE from "three";
import { PMREMGenerator, sRGBEncoding } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class App {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.Camera;
  control: OrbitControls;

  lights: THREE.Light[] = [];

  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    this.renderer.toneMappingExposure = 1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.set(4, 4, 4);
    this.camera.lookAt(0, 0, 0);

    this.control = new OrbitControls(this.camera, this.renderer.domElement);
    this.loadLights();
    this.beautify();

    this.loadModels().then(() => {
      this.animate();
    });
  }

  private loadLights() {
    const light = new THREE.AmbientLight(0xffffff, 0.3);
    const dlight = new THREE.DirectionalLight(0xffffff, 1);
    dlight.position.set(0.5, 1, 0.866);
    this.scene.add(light);
    this.scene.add(dlight);
    this.lights.push(light, dlight);
  }

  private beautify() {
    const pmremGenerator = new PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    this.renderer.outputEncoding = sRGBEncoding;
  }

  private animate() {
    this.renderer.render(this.scene, this.camera);
    this.control.update();

    requestAnimationFrame(this.animate.bind(this));
  }

  private async loadModels() {
    const loader = new GLTFLoader();
    const roomGltf = await loader.loadAsync("src/assets/gameroom.glb");
    this.scene.add(roomGltf.scene);
  }
}

new App();
