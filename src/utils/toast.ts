import delay from "delay";

class ToastManager {
  private isShowing: boolean = false;
  private containerId: string;
  private divId: string;

  constructor() {
    this.containerId = "SceneHint";
    this.divId = "SceneHintText";
  }
  public async showToast(msg: string, duration = 3000) {
    while (this.isShowing) {
      await delay(500);
    }

    this.isShowing = true;

    document.getElementById(this.divId)!.innerText = msg;
    document.getElementById(this.containerId)!.className = "in";

    await delay(duration);

    document.getElementById(this.containerId)!.className = "out";
  }
}

export default ToastManager;
