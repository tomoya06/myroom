import * as THREE from "three";
import { PMREMGenerator, sRGBEncoding } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as TWEEN from "@tweenjs/tween.js";
import { CtrlState, genCtrlState } from "./interface.d";
import Chair from "./components/Chair";
import Switch from "./components/Switch";
import Monitor from "./components/Monitor";

class App {
  state: CtrlState;

  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  control: OrbitControls;
  lights: THREE.Light[] = [];

  roomGltf!: GLTF;
  mixer!: THREE.AnimationMixer;

  chair!: Chair;
  switch!: Switch;
  monitor!: Monitor;

  constructor() {
    this.state = genCtrlState();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.toneMappingExposure = 1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );

    this.camera.position.set(4, 4, 4);
    this.camera.lookAt(0, 0, 0);

    this.control = new OrbitControls(this.camera, this.renderer.domElement);
    this.loadLights();
    this.beautify();

    window.addEventListener("resize", this.handleWindowResize.bind(this));

    this.loadModels().then(() => {
      requestAnimationFrame(this.loop.bind(this));

      this.chair = new Chair(this.roomGltf);
      this.switch = new Switch(this.roomGltf);
      this.monitor = new Monitor(this.roomGltf);

      this.bindActions();
    });
  }

  private handleWindowResize() {
    const { innerWidth, innerHeight } = window;
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(innerWidth, innerHeight);
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

  private loop() {
    this.renderer.render(this.scene, this.camera);
    this.control.update();

    TWEEN.update();
    requestAnimationFrame(this.loop.bind(this));
  }

  private async loadModels() {
    const loader = new GLTFLoader();
    this.roomGltf = await loader.loadAsync("src/assets/lowgameroom.glb");

    // // this helps you look at your model
    // debugger;
    console.log(this.roomGltf);

    this.scene.add(this.roomGltf.scene);
  }

  private bindActions() {
    const btnElemsCol = document.getElementsByTagName("button");
    const btnElems = Array.prototype.slice
      .call(btnElemsCol, 0)
      .filter((btn) => !btn.dataset.off);
    const ref = this;

    document
      .getElementById("ActionRollChair")
      ?.addEventListener("click", async () => {
        btnElems.forEach((_elem) => (_elem.disabled = true));
        await this.chair.moveChair();
        btnElems.forEach((_elem) => (_elem.disabled = false));
      });
    document
      .getElementById("ActionRollBody")
      ?.addEventListener("click", async () => {
        btnElems.forEach((_elem) => (_elem.disabled = true));
        await this.chair.rotateBody();
        btnElems.forEach((_elem) => (_elem.disabled = false));
      });

    document
      .getElementById("ActionPickupSwitch")
      ?.addEventListener("click", async function () {
        btnElems.forEach((_elem) => (_elem.disabled = true));
        const rev = Number(this.dataset.rev);
        if (Boolean(rev)) {
          await ref.switch.putdown();
        } else {
          await ref.switch.pickup();
        }
        if (!isNaN(rev)) {
          this.dataset.rev = String(1 - rev);
        }
        btnElems.forEach((_elem) => (_elem.disabled = false));
      });

    document
      .getElementById("TurnOnScreen")
      ?.addEventListener("click", async function () {
        ref.monitor.turnon();
        (this as HTMLButtonElement).disabled = true;
      });

    document
      .getElementById("GotoMonitor")
      ?.addEventListener("click", async function () {
        const newCamPos = new THREE.Vector3();
        ref.monitor.camera.getWorldPosition(newCamPos);
        const newTarget = new THREE.Vector3();
        ref.monitor.screenMesh.getWorldPosition(newTarget);
        ref.moveCamera(ref.control, ref.camera, newTarget, newCamPos);
      });
  }

  private moveCamera(
    controls: OrbitControls,
    camera: THREE.Camera,
    target: THREE.Vector3,
    position: THREE.Vector3
  ) {
    new TWEEN.Tween(camera.position)
      .to(
        {
          x: position.x,
          y: position.y,
          z: position.z,
        },
        600
      )
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .start();
    new TWEEN.Tween(controls.target)
      .to(
        {
          x: target.x,
          y: target.y,
          z: target.z,
        },
        600
      )
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .start();
  }
}

new App();
