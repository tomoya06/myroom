import { InteractionManager } from "three.interactive";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { findChildByName } from "../utils/three";
import ModelSection from "./ModelSection";

const AnimateKey = {
  Pickup: "SwitchAction",
};

export default class Switch extends ModelSection {
  private switchMesh: THREE.Object3D;
  private switchScreenContent: THREE.Object3D;
  private isOn: boolean;
  private isAnimating: boolean;

  constructor(mod: GLTF) {
    super(mod);

    this.regAnimate(AnimateKey.Pickup);
    const switchKit = this.findMesh("SwitchKit")!;
    this.switchScreenContent = findChildByName(switchKit, "ScreenContent")!;
    this.switchMesh = switchKit;
    this.isOn = false;
    this.isAnimating = false;

    this.turnOnOffScreen(false);
  }

  public async pickup() {
    this.isAnimating = true;
    this.isOn = true;
    await this.playAnimation(this.animate[AnimateKey.Pickup], { rev: false });
    this.turnOnOffScreen(true);
    this.isAnimating = false;
  }

  public async putdown() {
    this.isAnimating = true;
    this.isOn = false;
    this.turnOnOffScreen(false);
    await this.playAnimation(this.animate[AnimateKey.Pickup], { rev: true });
    this.isAnimating = false;
  }

  private turnOnOffScreen(flag: boolean) {
    this.switchScreenContent.visible = flag;
  }

  public regInteraction(interaction: InteractionManager) {
    interaction.add(this.switchMesh);

    const ref = this;
    this.switchMesh.addEventListener("click", function () {
      if (ref.isAnimating) {
        return;
      }
      if (ref.isOn) {
        ref.putdown();
      } else {
        ref.pickup();
      }
    });
  }
}
