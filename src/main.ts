import * as THREE from "three";
import { PMREMGenerator, sRGBEncoding } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import * as TWEEN from "@tweenjs/tween.js";
import { GUI } from "dat.gui";
import {
  CtrlState,
  genCtrlState,
  PositionRange,
  RotationRange,
} from "./interface.d";
import Chair from "./components/Chair";
import Switch from "./components/Switch";

class App {
  state: CtrlState;

  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  control: OrbitControls;
  lights: THREE.Light[] = [];

  roomGltf!: GLTF;
  roomContent!: THREE.Group;
  roomAnimates!: THREE.AnimationClip[];
  mixer!: THREE.AnimationMixer;

  chair!: Chair;
  switch!: Switch;

  loopPrevTime = 0;

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

      this.loadGui();
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

  private loadGui() {
    const gui = new GUI();
    const posGui = gui.addFolder("Position");
    posGui.open();
    const axises: ("x" | "y" | "z")[] = ["x", "y", "z"];
    axises.forEach((axis) => {
      posGui
        .add(
          this.state.pos,
          axis,
          PositionRange[0],
          PositionRange[1],
          PositionRange[2]
        )
        .onChange(() => {
          this.roomContent.position[axis] = this.state.pos[axis];
        });
      posGui
        .add(
          this.state.rot,
          axis,
          RotationRange[0],
          RotationRange[1],
          RotationRange[2]
        )
        .onChange(() => {
          this.roomContent.rotation[axis] = this.state.rot[axis];
        });
    });
    const guiWrap = document.getElementById("GuiBar")!;
    guiWrap.appendChild(gui.domElement);
    gui.open();
  }

  private beautify() {
    const pmremGenerator = new PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    this.renderer.outputEncoding = sRGBEncoding;
  }

  private loop(time: number) {
    this.renderer.render(this.scene, this.camera);

    this.control.update();

    requestAnimationFrame(this.loop.bind(this));
    TWEEN.update();
    this.loopPrevTime = time;
  }

  private async loadModels() {
    const loader = new GLTFLoader();
    this.roomGltf = await loader.loadAsync("src/assets/lowgameroom.glb");
    this.roomContent = this.roomGltf.scene;

    // // this helps you look at your model
    // debugger;
    console.log(this.roomGltf);

    this.scene.add(this.roomContent);
  }

  private bindActions() {
    const btnElemsCol = document.getElementsByTagName("button");
    const btnElems = Array.prototype.slice.call(btnElemsCol, 0);
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
  }
}

new App();
