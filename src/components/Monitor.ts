import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { findChildByName } from "../utils/object";
import ModelSection from "./ModelSection";

const AnimateKey = {
  Text: "MonitorTextAction",
};

export default class Monitor extends ModelSection {
  private _camera: THREE.Camera;
  private _screenMesh: THREE.Object3D;

  constructor(mod: GLTF) {
    super(mod);

    this.regAnimate(AnimateKey.Text);
    const monitorMesh = this.findMesh("Monitor")!;
    this._camera = mod.cameras.find((cam) => cam.name === "MonitorCamera")!;
    this._screenMesh = findChildByName(monitorMesh, "MonitorScreen")!;
  }

  public get camera() {
    return this._camera;
  }
  public get screenMesh(): THREE.Object3D {
    return this._screenMesh;
  }

  public turnon() {
    this.playInfinite(this.animate[AnimateKey.Text]);
  }

  public turnoff() {
    this.stopInfinite(this.animate[AnimateKey.Text]);
  }
}
