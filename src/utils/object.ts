import * as THREE from "three";

export function findChildByName(
  obj: THREE.Object3D,
  name: string
): THREE.Object3D | undefined {
  const found = obj.children.find((child) => child.name === name);
  if (found) {
    return found;
  }

  for (const child of obj.children) {
    const subRes = findChildByName(child, name);
    if (subRes) {
      return subRes;
    }
  }

  return undefined;
}
