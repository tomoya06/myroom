export interface Axis {
  x: number;
  y: number;
  z: number;
}

export interface CtrlState {
  pos: Axis;
  rot: Axis;
}

export const PositionRange = [-10, 10, 0.1];
export const RotationRange = [-Math.PI, Math.PI, Math.PI/180];

export const genCtrlState = (): CtrlState => {
  return {
    pos: {
      x: 0,
      y: 0,
      z: 0,
    },
    rot: {
      x: 0,
      y: 0,
      z: 0,
    }
  }
}
