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

export const bindHoverCursor = (objs: THREE.Object3D[]) => {
  objs.map((obj) => {
    obj.addEventListener("mouseover", () => {
      document.body.style.cursor = "pointer";
    });
    obj.addEventListener("mouseout", () => {
      document.body.style.cursor = "default";
    });
  });
};
