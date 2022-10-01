import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import ModelSection from "./ModelSection";

const AnimateKey = {
  ChairMove: 'ComputerChairAction',
  ChairBody: 'ChairRotate',
}

export default class Chair extends ModelSection {
  constructor(mod: GLTF) {
    super(mod);

    this.regAnimate(AnimateKey.ChairMove);
    this.regAnimate(AnimateKey.ChairBody);
  }

  public async moveChair() {
    await this.playAnimation(this.animate[AnimateKey.ChairMove]);
  }

  public async rotateBody() {
    await this.playAnimation(this.animate[AnimateKey.ChairBody]);
  }
}