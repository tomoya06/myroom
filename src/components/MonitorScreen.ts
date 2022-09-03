import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

export default class MonitorScreen extends CSS3DObject {
  constructor(id: string, x: number, y: number, z: number, ry: number) {
    const div = document.createElement("div");
    div.style.width = "480px";
    div.style.height = "360px";
    div.style.backgroundColor = "#000";

    const iframe = document.createElement("iframe");
    iframe.style.width = "480px";
    iframe.style.height = "360px";
    iframe.style.border = "0px";
    iframe.src = ["https://www.youtube.com/embed/", id, "?rel=0"].join("");
    div.appendChild(iframe);

    super(div);
    this.position.set(0, 0, 0);
    this.scale.set(0.1, 0.1, 0.1);
  }
}
