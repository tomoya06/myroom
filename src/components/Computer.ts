import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { findChildByName } from "../util";
import ModelSection from "./ModelSection";

const AnimateKey = {
  Text: "MonitorTextAction",
};

export default class Computer extends ModelSection {
  private _monitorCamera: THREE.Camera;
  private _screenMesh: THREE.Object3D;
  private _keyboardMesh: THREE.Object3D;
  private browserContainer: HTMLDivElement;

  constructor(mod: GLTF) {
    super(mod);

    this.regAnimate(AnimateKey.Text);
    this._monitorCamera = mod.cameras.find(
      (cam) => cam.name === "MonitorCamera"
    )!;

    const monitorMesh = this.findMesh("Monitor")!;
    this._screenMesh = findChildByName(monitorMesh, "MonitorScreen")!;
    this._keyboardMesh = this.findMesh("Keyboard")!;

    this.browserContainer = document.getElementById(
      "BrowserContainer"
    ) as HTMLDivElement;
  }

  public get monitorCamera() {
    return this._monitorCamera;
  }
  public get screenMesh(): THREE.Object3D {
    return this._screenMesh;
  }
  public get keyboardMesh(): THREE.Object3D {
    return this._keyboardMesh;
  }

  public turnon() {
    this.playInfinite(this.animate[AnimateKey.Text]);
  }

  public turnoff() {
    this.stopInfinite(this.animate[AnimateKey.Text]);
  }

  public startBrowser() {
    this.turnoff();

    this.browserContainer.className = "on";
  }
}
