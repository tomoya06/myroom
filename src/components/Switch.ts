import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import ModelSection from "./ModelSection";

const AnimateKey = {
  Pickup: "SwitchAction",
};

export default class Switch extends ModelSection {
  constructor(mod: GLTF) {
    super(mod);

    this.regAnimate(AnimateKey.Pickup);
  }

  public async pickup() {
    await this.playAnimation(this.animate[AnimateKey.Pickup], { rev: false });
  }

  public async putdown() {
    await this.playAnimation(this.animate[AnimateKey.Pickup], { rev: true });
  }
}
