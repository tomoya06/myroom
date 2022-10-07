import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import ModelSection from "./ModelSection";

export default class Cabinets extends ModelSection {
  public woodenCabinetMesh: THREE.Object3D;
  public whiteCabinetMesh: THREE.Object3D;

  constructor(mod: GLTF) {
    super(mod);

    this.woodenCabinetMesh = this.findMesh("Cabinet");
    this.whiteCabinetMesh = this.findMesh("Fridge");
  }
}
