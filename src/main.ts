import * as THREE from "three";
import { LoadingManager, PMREMGenerator, sRGBEncoding } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as TWEEN from "@tweenjs/tween.js";
import { CtrlState, genCtrlState, ThreeBundle } from "./interface.d";
import Chair from "./components/Chair";
import Switch from "./components/Switch";
import Computer from "./components/Computer";
import { InteractionManager } from "three.interactive";
import StateMachine, { EnumStatus } from "./StateMachine";
import { isDev, isPortrait, MessageName } from "./utils/window";
import Cabinets from "./components/Cabinets";
import vhCheck from "vh-check";
import ToastManager from "./utils/toast";
import delay from "delay";

const defCamPos = new THREE.Vector3(4, 4, 4);
const defCamLook = new THREE.Vector3(0, 0, 0);
const bottomCamPos = new THREE.Vector3(0.1, -4, 0.1);

vhCheck();

const toastManager = new ToastManager("SceneHint", "SceneHintText");

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
  cabinets!: Cabinets;

  interaction!: InteractionManager;
  stateMachine!: StateMachine;

  loadingManager: LoadingManager;

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
    this.loadingManager = new THREE.LoadingManager();
    this.bindLoadManager();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.outputEncoding = sRGBEncoding;

    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.loadLights();
    this.beautify();
    this.loadEnvironment();

    this.loadCamera();
    this.control = new OrbitControls(this.camera, this.renderer.domElement);
    // this.control.enabled = false;

    window.addEventListener("resize", this.handleWindowResize.bind(this));

    if (isPortrait()) {
      delay(1000).then(() => {
        toastManager.showToast("推荐使用电脑端（<ゝω・）☆");
      });
    }

    this.loadModels().then(() => {
      this.updateForPortrait();

      requestAnimationFrame(this.loop.bind(this));

      this.chair = new Chair(this.roomGltf);
      this.switch = new Switch(this.roomGltf);
      this.computer = new Computer(this.roomGltf);
      this.cabinets = new Cabinets(this.roomGltf);

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

  private bindLoadManager() {
    this.loadingManager.onLoad = () => {
      document.body.removeChild(document.getElementById("SceneLoader")!);
    };
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

    this.updateForPortrait();
  }

  private updateForPortrait() {
    if (!isPortrait()) {
      this.roomGltf.scene.scale.set(1, 1, 1);
      return;
    }
    this.roomGltf.scene.scale.set(0.6, 0.6, 0.6);
  }

  private loadLights() {
    const light = new THREE.AmbientLight(0xffffff, 0.4);
    const dlight = new THREE.DirectionalLight(0xffffff, 1);
    dlight.position.set(0.5, 1, 0.866);
    this.scene.add(light);
    this.scene.add(dlight);
    this.lights.push(light, dlight);
  }

  private beautify() {
    const pmremGenerator = new PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
  }

  private async loadEnvironment() {
    this.scene.background = new THREE.Color(0xf7f0e0);
    this.renderer.toneMappingExposure = 2;

    // const texture = await new RGBELoader().loadAsync(
    //   isDev
    //     ? "src/assets/studio_small_09_2k.hdr"
    //     : "https://tomoya06.github.io/myroom/assets/studio_small_09_2k.hdr"
    // );
    // texture.mapping = THREE.EquirectangularReflectionMapping;
    // texture.minFilter = THREE.LinearFilter;
    // // this.scene.background = texture;
    // this.scene.environment = texture;
  }

  private loop() {
    this.renderer.render(this.scene, this.camera);
    this.control.update();
    this.interaction.update();

    TWEEN.update();
    requestAnimationFrame(this.loop.bind(this));
  }

  private async loadModels() {
    const loader = new GLTFLoader(this.loadingManager);
    this.roomGltf = await loader.loadAsync(
      isDev
        ? "src/assets/lowgameroom.glb"
        : "https://tomoya06.github.io/myroom/assets/lowgameroom.glb"
    );

    // // this helps you look at your model
    // debugger;
    console.log(this.roomGltf);

    this.scene.add(this.roomGltf.scene);
  }

  private bindInteraction() {
    // object, next status choice (max 2), clickable status
    const hoverables: [THREE.Object3D, EnumStatus[], EnumStatus[]][] = [
      [
        this.computer.keyboardMesh,
        [EnumStatus.AtComputer],
        [EnumStatus.Lobby, EnumStatus.AtComputer],
      ],
      [
        this.computer.screenMesh,
        [EnumStatus.ComputerBrowser],
        [EnumStatus.AtComputer],
      ],
      [
        this.computer.mouseMesh,
        [EnumStatus.Lobby],
        [EnumStatus.Lobby, EnumStatus.AtComputer],
      ],
      [
        this.cabinets.whiteCabinetMesh,
        [EnumStatus.EASTEREGG, EnumStatus.Lobby],
        [EnumStatus.Lobby, EnumStatus.EASTEREGG, EnumStatus.AtComputer],
      ],
    ];

    hoverables.map((hoverable) => {
      this.interaction.add(hoverable[0]);
      hoverable[0].addEventListener("click", () => {
        const nxtState = hoverable[1];
        if (!nxtState[1] || this.stateMachine.status === nxtState[1]) {
          this.stateMachine.status = nxtState[0];
        } else {
          this.stateMachine.status = nxtState[1];
        }
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

    document
      .getElementById("BrowserContainer")
      ?.addEventListener("click", () => {
        this.stateMachine.status = EnumStatus.AtComputer;
      });

    (window as any).printCamera = () => {
      console.log(this.camera.position, this.control.target);
    };
  }

  private handleStateChange(s: EnumStatus) {
    if (s === EnumStatus.Lobby) {
      this.moveCamera(defCamLook, defCamPos);
    }
    if (s !== EnumStatus.Lobby) {
    }
    if (s === EnumStatus.EASTEREGG) {
      this.moveCamera(defCamLook, bottomCamPos);
    }
    if (s !== EnumStatus.EASTEREGG) {
    }
    if (s === EnumStatus.AtComputer) {
      const newCamPos = new THREE.Vector3();
      const newTarget = new THREE.Vector3();
      if (isPortrait()) {
        this.computer.monitorCameraMobile.getWorldPosition(newCamPos);
      } else {
        this.computer.monitorCamera.getWorldPosition(newCamPos);
      }
      this.computer.screenMesh.getWorldPosition(newTarget);

      console.log(newCamPos, newTarget);

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
