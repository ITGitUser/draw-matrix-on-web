import { IMATRIX } from "../IMatrix";

export abstract class Decorator implements IMATRIX {
  protected _origMatrix: IMATRIX;
  abstract Read(indexRow: number, indexColumn: number): number;
  abstract Write(indexRow: number, indexColumn: number, val: number): void;
  abstract DrawMatrix(): void;
  readonly SIZE_ROW: number;
  readonly SIZE_COLUMN: number;
  constructor(mtrx: IMATRIX) {
    this._origMatrix = mtrx;
    this.SIZE_ROW = mtrx.SIZE_ROW;
    this.SIZE_COLUMN = mtrx.SIZE_COLUMN;
  }
}
