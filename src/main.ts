import * as THREE from "three";
import { PMREMGenerator, sRGBEncoding } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as TWEEN from "@tweenjs/tween.js";
import { CtrlState, genCtrlState, ThreeBundle } from "./interface.d";
import Chair from "./components/Chair";
import Switch from "./components/Switch";
import Computer from "./components/Computer";
import { InteractionManager } from "three.interactive";
import StateMachine, { EnumStatus } from "./StateMachine";
import { MessageName } from "./utils/window";

const defCamPos = new THREE.Vector3(4, 4, 4);
const defCamLook = new THREE.Vector3(0, 0, 0);

class App {
  state: CtrlState;

  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera!: THREE.PerspectiveCamera;
  control: OrbitControls;
  lights: THREE.Light[] = [];

  roomGltf!: GLTF;
  mixer!: THREE.AnimationMixer;

  chair!: Chair;
  switch!: Switch;
  computer!: Computer;

  interaction!: InteractionManager;
  stateMachine!: StateMachine;

  get bundle(): ThreeBundle {
    return {
      camera: this.camera,
      scene: this.scene,
      renderer: this.renderer,
      control: this.control,
    };
  }

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

    this.loadLights();
    this.beautify();
    this.loadCamera();
    this.control = new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener("resize", this.handleWindowResize.bind(this));

    this.loadModels().then(() => {
      requestAnimationFrame(this.loop.bind(this));

      this.chair = new Chair(this.roomGltf);
      this.switch = new Switch(this.roomGltf);
      this.computer = new Computer(this.roomGltf);

      this.stateMachine = new StateMachine(this.handleStateChange.bind(this));
      this.interaction = new InteractionManager(
        this.renderer,
        this.camera,
        this.renderer.domElement,
        true
      );

      this.bindActions();
      this.bindInteraction();
    });
  }

  private loadCamera() {
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );

    this.camera.position.copy(defCamPos);
    this.camera.lookAt(defCamLook);
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
    this.interaction.update();

    TWEEN.update();
    requestAnimationFrame(this.loop.bind(this));
  }

  private async loadModels() {
    const loader = new GLTFLoader();
    this.roomGltf = await loader.loadAsync(
      "https://tomoya06.github.io/myroom/assets/lowgameroom.glb"
    );

    // // this helps you look at your model
    // debugger;
    console.log(this.roomGltf);

    this.scene.add(this.roomGltf.scene);
  }

  private bindInteraction() {
    const hoverables: [THREE.Object3D, EnumStatus, EnumStatus[]][] = [
      [
        this.computer.keyboardMesh,
        EnumStatus.AtComputer,
        [EnumStatus.Lobby, EnumStatus.AtComputer],
      ],
      [
        this.computer.screenMesh,
        EnumStatus.ComputerBrowser,
        [EnumStatus.AtComputer],
      ],
      [
        this.computer.mouseMesh,
        EnumStatus.Lobby,
        [EnumStatus.Lobby, EnumStatus.AtComputer],
      ],
    ];

    hoverables.map((hoverable) => {
      this.interaction.add(hoverable[0]);
      hoverable[0].addEventListener("click", () => {
        this.stateMachine.status = hoverable[1];
      });
      hoverable[0].addEventListener("mouseover", () => {
        if (!hoverable[2].includes(this.stateMachine.status)) {
          document.body.style.cursor = "default";
          return;
        }
        document.body.style.cursor = "pointer";
      });
      hoverable[0].addEventListener("mouseout", () => {
        document.body.style.cursor = "default";
      });
    });

    window.addEventListener("message", (evt) => {
      if (evt.data === MessageName.PowerOFF) {
        this.computer.browserIframe.contentWindow?.postMessage(
          MessageName.PowerOFF
        );
        this.stateMachine.status = EnumStatus.AtComputer;
      }
    });
  }

  private handleStateChange(s: EnumStatus) {
    if (s === EnumStatus.Lobby) {
      this.moveCamera(defCamLook, defCamPos);
    }
    if (s !== EnumStatus.Lobby) {
    }
    if (s === EnumStatus.AtComputer) {
      const newCamPos = new THREE.Vector3();
      const newTarget = new THREE.Vector3();
      this.computer.monitorCamera.getWorldPosition(newCamPos);
      this.computer.screenMesh.getWorldPosition(newTarget);
      this.computer.turnon();
      this.moveCamera(newTarget, newCamPos);
    }
    if (s !== EnumStatus.AtComputer) {
      this.computer.turnoff();
    }
    if (s === EnumStatus.ComputerBrowser) {
      this.computer.startBrowser();
    }
    if (s !== EnumStatus.ComputerBrowser) {
      this.computer.stopBrowser();
    }
  }

  private bindActions() {
    this.chair.regInteraction(this.interaction);
    this.switch.regInteraction(this.interaction);
  }

  private moveCamera(target: THREE.Vector3, position: THREE.Vector3) {
    const controls = this.control;
    const camera = this.camera;

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
