import * as THREE from "three";

export default class ThreeInteract {
  private scene: THREE.Scene;
  private renderer: THREE.Renderer;
  private camera: THREE.Camera;
  private activeObj: THREE.Object3D | undefined;
  private raycaster: THREE.Raycaster;
  private pointer: THREE.Vector2;

  constructor(
    scene: THREE.Scene,
    renderer: THREE.Renderer,
    camera: THREE.Camera
  ) {
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;

    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.initIntersect();
  }

  private initIntersect() {
    const ref = this;
    document.addEventListener("mousemove", function (event) {
      ref.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      ref.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      ref.raycaster.setFromCamera(ref.pointer, ref.camera);

      const intersects = ref.raycaster.intersectObjects(
        ref.scene.children,
        false
      );

      const activeObj = intersects[0]?.object;

      console.log("mousemove", activeObj);

      ref.activeObj = activeObj;
    });
  }

  public register(
    evtName: keyof HTMLElementEventMap,
    obj: THREE.Object3D,
    handler: (obj: THREE.Object3D) => void
  ) {
    const ref = this;
    document.addEventListener(evtName, function () {
      console.log("register", evtName, "triggered");
      if (obj === ref.activeObj) {
        handler(obj);
      }
    });
  }
}
