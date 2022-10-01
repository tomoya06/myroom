import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import * as TWEEN from "@tweenjs/tween.js";

/**
 * Base Class for Registering Model Section
 */
export default class ModelSection {
  protected model: GLTF;
  public animate: Record<string, THREE.AnimationClip>;

  constructor(mod: GLTF) {
    this.model = mod;
    this.animate = {};
  }

  protected regAnimate(key: string) {
    const { animations } = this.model;

    const theAnimate = animations.find((clip) => {
      return clip.name.startsWith(key);
    });

    if (!theAnimate) {
      return undefined;
    }

    this.animate[key] = theAnimate;

    return key;
  }

  protected playAnimation(theAnimate: THREE.AnimationClip, params?: {
    rev?: boolean;
  }) {
    this.doPlayAnimation(theAnimate, params);
  }

  private doPlayAnimation(
    theAnimate: THREE.AnimationClip,
    params?: {
      rev?: boolean;
    },
    onComplete?: () => void,
  ) {
    const mixer = new THREE.AnimationMixer(this.model.scene);
    const { rev } = params || {};

    const action = mixer.clipAction(theAnimate);
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    if (rev) {
      action.setLoop(THREE.LoopPingPong, 2);
      action.timeScale = -1;
    }

    let prevDt = 0;

    new TWEEN.Tween({ dt: 0 })
      .to({ dt: theAnimate.duration }, theAnimate.duration * 1000)
      .onStart(() => {
        action.reset();
        action.play();
      })
      .onUpdate(({ dt }) => {
        const delta = dt - prevDt;
        mixer.update(delta);
        prevDt = dt;
      })
      .onComplete(() => {
        action.paused = true;
        onComplete?.();
      })
      .start();
  }

  protected playInfinite(theAnimate: THREE.AnimationClip) {
    const loop = () => this.doPlayAnimation(theAnimate, undefined, loop);

    loop();
  }
}
