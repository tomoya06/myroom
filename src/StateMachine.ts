export enum EnumStatus {
  Lobby,
  AtComputer,
  ComputerBrowser,
  AtSwtich,
  SwitchBrowser,
}

const NextStatus: Record<EnumStatus, EnumStatus[]> = {
  [EnumStatus.Lobby]: [EnumStatus.AtComputer, EnumStatus.AtSwtich],
  [EnumStatus.AtComputer]: [EnumStatus.Lobby, EnumStatus.ComputerBrowser],
  [EnumStatus.ComputerBrowser]: [EnumStatus.AtComputer],
  [EnumStatus.AtSwtich]: [EnumStatus.SwitchBrowser, EnumStatus.Lobby],
  [EnumStatus.SwitchBrowser]: [EnumStatus.AtSwtich],
};

export default class StateMachine {
  private _updating: boolean;
  private _status: EnumStatus;
  private _handler: (s: EnumStatus) => void;

  public get status(): EnumStatus {
    return this._status;
  }
  public set status(value: EnumStatus) {
    if (!NextStatus[this._status].includes(value) && this._status !== value) {
      return;
    }
    if (this._updating) {
      return;
    }
    this._status = value;
    this.update();
  }

  constructor(handler: (s: EnumStatus) => void) {
    this._updating = false;
    this._status = EnumStatus.Lobby;
    this._handler = handler;
    this.update();
  }

  private update() {
    this._handler(this._status);
  }
}
