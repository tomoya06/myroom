import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { findChildByName } from "../util";
import ModelSection from "./ModelSection";

const AnimateKey = {
  Pickup: "SwitchAction",
};

export default class Switch extends ModelSection {
  private switchScreenContent: THREE.Object3D;

  constructor(mod: GLTF) {
    super(mod);

    this.regAnimate(AnimateKey.Pickup);
    const switchKit = this.findMesh('SwitchKit')!;
    this.switchScreenContent = findChildByName(switchKit, 'ScreenContent')!;

    this.turnOnOffScreen(false);
  }

  public async pickup() {
    await this.playAnimation(this.animate[AnimateKey.Pickup], { rev: false });
    this.turnOnOffScreen(true);
  }

  public async putdown() {
    this.turnOnOffScreen(false);
    await this.playAnimation(this.animate[AnimateKey.Pickup], { rev: true });
  }

  private turnOnOffScreen(flag: boolean) {
    this.switchScreenContent.visible = flag;
  }
}
