import { InteractionManager } from "three.interactive";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { findChildByName } from "../utils/three";
import ModelSection from "./ModelSection";

const AnimateKey = {
  ChairMove: "ComputerChairAction",
  ChairBody: "ChairRotate",
};

const ClickedPart = {
  Leg: 1,
  Top: 2,
};

export default class Chair extends ModelSection {
  public chairBodyMesh: THREE.Object3D;
  public chairTopMesh: THREE.Object3D;

  private clicked: Set<number>;
  private clickTimeout: ReturnType<typeof setTimeout>;

  private isMoving: boolean;

  constructor(mod: GLTF) {
    super(mod);

    const chairMesh = this.findMesh("ComputerChair");
    this.chairBodyMesh = chairMesh;
    this.chairTopMesh = findChildByName(chairMesh, "ChairTop")!;

    this.regAnimate(AnimateKey.ChairMove);
    this.regAnimate(AnimateKey.ChairBody);

    this.clicked = new Set();
    this.clickTimeout = 0;
    this.isMoving = false;
  }

  private handleClick() {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = setTimeout(() => {
      if (this.clicked.has(ClickedPart.Leg)) {
        if (this.clicked.has(ClickedPart.Top)) {
          this.rotateBody();
        } else {
          this.moveChair();
        }
      }
      this.clicked.clear();
    }, 10);
  }

  public regInteraction(interaction: InteractionManager) {
    interaction.add(this.chairBodyMesh);
    interaction.add(this.chairTopMesh);

    const ref = this;

    this.chairBodyMesh.addEventListener("click", async function () {
      ref.handleClick();
      ref.clicked.add(ClickedPart.Leg);
    });

    this.chairTopMesh.addEventListener("click", async function () {
      ref.clicked.add(ClickedPart.Top);
    });
  }

  public async moveChair() {
    await this.playAnimation(this.animate[AnimateKey.ChairMove], {
      solo: true,
    });
  }

  public async rotateBody() {
    await this.playAnimation(this.animate[AnimateKey.ChairBody], {
      solo: true,
    });
  }
}
