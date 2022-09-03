import * as THREE from "three";
import { DynamicCopyUsage, PMREMGenerator, sRGBEncoding } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import * as TWEEN from "@tweenjs/tween.js";
import { GUI } from "dat.gui";
import {
  CtrlState,
  genCtrlState,
  PositionRange,
  RotationRange,
} from "./interface.d";
import MonitorScreen from "./components/MonitorScreen";
import { calcActualSize } from "./util";

class App {
  state: CtrlState;

  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  cssRenderer: CSS3DRenderer;
  camera: THREE.PerspectiveCamera;
  control: OrbitControls;
  lights: THREE.Light[] = [];

  roomContent!: THREE.Group;
  roomAnimates!: THREE.AnimationClip[];
  mixer!: THREE.AnimationMixer;

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

    this.cssRenderer = new CSS3DRenderer();
    this.cssRenderer.domElement.style.position = "absolute";
    this.cssRenderer.domElement.style.top = "0px";
    this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.cssRenderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );

    this.camera.position.set(4, 4, 4);
    this.camera.lookAt(0, 0, 0);

    this.control = new OrbitControls(this.camera, this.cssRenderer.domElement);
    this.loadLights();
    this.beautify();

    window.addEventListener("resize", this.handleWindowResize.bind(this));

    this.loadModels().then(() => {
      requestAnimationFrame(this.loop.bind(this));

      this.loadGui();
      this.bindActions();

      this.bindIframes();

      console.log(this.roomContent);
    });
  }

  private handleWindowResize() {
    const { innerWidth, innerHeight } = window;
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(innerWidth, innerHeight);
    this.cssRenderer.setSize(innerWidth, innerHeight);
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
    this.cssRenderer.render(this.scene, this.camera);

    this.control.update();

    requestAnimationFrame(this.loop.bind(this));
    TWEEN.update();
    this.loopPrevTime = time;
  }

  private async loadModels() {
    const loader = new GLTFLoader();
    const roomGltf = await loader.loadAsync("src/assets/lowgameroom.glb");
    this.roomContent = roomGltf.scene;
    this.roomAnimates = roomGltf.animations;

    // // this helps you look at your model
    // debugger;

    this.scene.add(this.roomContent);
  }

  private playAnimation(idx: number, rev: boolean, onComplete: () => void) {
    this.mixer = new THREE.AnimationMixer(this.roomContent);

    const theAnimate = this.roomAnimates[idx];

    const action = this.mixer.clipAction(theAnimate);
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    if (rev) {
      action.setLoop(THREE.LoopPingPong, 2);
      action.timeScale = -1;
    }

    let prevDt = 0;

    new TWEEN.Tween({ dt: 0 })
      .to({ dt: theAnimate.duration }, theAnimate.duration * 1000)
      .onStart(() => {
        action.reset();
        action.play();
      })
      .onUpdate(({ dt }) => {
        const delta = dt - prevDt;
        this.mixer.update(delta);
        prevDt = dt;
      })
      .onComplete(() => {
        onComplete();
        action.paused = true;
      })
      .start();
  }

  private bindActions() {
    const btnIdsForAni = [
      "ActionRollChair",
      "ActionRollBody",
      "ActionPickupSwitch",
    ];
    const btnElems = btnIdsForAni.map(
      (btnId) => document.getElementById(btnId) as HTMLButtonElement
    );
    btnElems.forEach((btnElem, idx) => {
      btnElem.addEventListener("click", () => {
        btnElems.forEach((_elem) => (_elem.disabled = true));
        const rev = Number(btnElem.dataset.rev);

        this.playAnimation.bind(this)(idx, Boolean(rev), () => {
          if (!isNaN(rev)) {
            btnElem.dataset.rev = String(1 - rev);
          }
          btnElems.forEach((_elem) => (_elem.disabled = false));
        });
      });
    });
  }

  private bindIframes() {
    const monitorMesh = this.roomContent.children.find(
      (ch) => ch.name === "Monitor"
    )!;
    const screenMesh = monitorMesh.children.find(
      (ch) => ch.name === "MonitorScreen"
    )!;
    let worldPosition = new THREE.Vector3();
    screenMesh.getWorldPosition(worldPosition);

    const screenContent = new MonitorScreen("SJOz3qjfQXU", 0, 0, 240, 0);
    monitorMesh.add(screenContent);
  }
}

new App();
