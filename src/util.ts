import * as THREE from 'three';

export function traverseMaterials(object: any, callback: Function) {
  object.traverse((node: any) => {
    if (!node.isMesh) return;
    const materials = Array.isArray(node.material)
      ? node.material
      : [node.material];
    materials.forEach(callback);
  });
}

export function calcActualSize(box: THREE.Box3) {
  return {
    x: box.max.x - box.min.x,
    y: box.max.y - box.min.y,
    z: box.max.z - box.min.z,
  }
}
