export function traverseMaterials(object: any, callback: Function) {
  object.traverse((node: any) => {
    if (!node.isMesh) return;
    const materials = Array.isArray(node.material)
      ? node.material
      : [node.material];
    materials.forEach(callback);
  });
}
