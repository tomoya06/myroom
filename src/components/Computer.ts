import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { findChildByName } from "../util";
import ModelSection from "./ModelSection";

const AnimateKey = {
  Text: "MonitorTextAction",
};

export default class Computer extends ModelSection {
  public monitorCamera: THREE.Camera;
  public screenMesh: THREE.Object3D;
  public keyboardMesh: THREE.Object3D;
  public deckMesh: THREE.Object3D;
  public mouseMesh: THREE.Object3D;

  private browserContainer: JQuery<HTMLElement>;

  constructor(mod: GLTF) {
    super(mod);

    this.regAnimate(AnimateKey.Text);
    this.monitorCamera = mod.cameras.find(
      (cam) => cam.name === "MonitorCamera"
    )!;

    const monitorMesh = this.findMesh("Monitor")!;
    this.screenMesh = findChildByName(monitorMesh, "MonitorScreen")!;
    this.keyboardMesh = this.findMesh("Keyboard")!;
    this.deckMesh = this.findMesh("PCDesk")!;
    this.mouseMesh = this.findMesh("Mouse")!;

    this.browserContainer = $("#BrowserContainer");
  }

  public turnon() {
    this.playInfinite(this.animate[AnimateKey.Text]);
  }

  public turnoff() {
    this.stopInfinite(this.animate[AnimateKey.Text]);
  }

  public stopBrowser() {
    this.browserContainer.find("iframe").removeClass("on");
    this.browserContainer.removeClass("on");
  }

  public startBrowser() {
    this.browserContainer.addClass("on");
    setTimeout(() => {
      this.browserContainer.find("iframe").addClass("on");
    }, 500);
  }
}
