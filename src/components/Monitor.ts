import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import ModelSection from "./ModelSection";

const AnimateKey = {
  Text: 'MonitorTextAction.001',
}

export default class Monitor extends ModelSection {
  constructor(mod: GLTF) {
    super(mod);

    this.regAnimate(AnimateKey.Text);
  }

  public turnon() {
    this.playInfinite(this.animate[AnimateKey.Text]);
  }
}
