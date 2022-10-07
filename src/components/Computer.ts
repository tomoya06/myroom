import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { findChildByName } from "../utils/three";
import { MessageName } from "../utils/window";
import ModelSection from "./ModelSection";

const AnimateKey = {
  Text: "MonitorTextAction",
};

export default class Computer extends ModelSection {
  public monitorCamera: THREE.Camera;
  public monitorCameraMobile: THREE.Camera;
  public screenMesh: THREE.Object3D;
  public keyboardMesh: THREE.Object3D;
  public deckMesh: THREE.Object3D;
  public mouseMesh: THREE.Object3D;

  private browserContainer: HTMLElement;
  public browserIframe: HTMLIFrameElement;

  constructor(mod: GLTF) {
    super(mod);

    this.regAnimate(AnimateKey.Text);
    this.monitorCamera = this.findCamera("MonitorCamera");
    this.monitorCameraMobile = this.findCamera("MonitorCameraMobile");

    const monitorMesh = this.findMesh("Monitor")!;
    this.screenMesh = findChildByName(monitorMesh, "MonitorScreen")!;
    this.keyboardMesh = this.findMesh("Keyboard")!;
    this.deckMesh = this.findMesh("PCDesk")!;
    this.mouseMesh = this.findMesh("Mouse")!;

    this.browserContainer = document.getElementById("BrowserContainer")!;
    this.browserIframe = document.getElementById(
      "BrowserIframe"
    ) as HTMLIFrameElement;
  }

  public turnon() {
    this.playInfinite(this.animate[AnimateKey.Text]);
  }

  public turnoff() {
    this.stopInfinite(this.animate[AnimateKey.Text]);
  }

  public stopBrowser() {
    this.browserIframe.className = "off";
    this.browserContainer.className = "off";
  }

  public startBrowser() {
    this.browserContainer.className = "on";
    setTimeout(() => {
      this.browserIframe.className = "on";
      this.browserIframe.contentWindow?.postMessage(MessageName.PowerON);
    }, 500);
  }
}
