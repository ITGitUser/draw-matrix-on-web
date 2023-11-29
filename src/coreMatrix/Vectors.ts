import { IVECTOR } from "./IVector";

export class NormalVector implements IVECTOR {
  private _components: number[] = [];
  public Read(index: number): number {
    return this._components[index];
  }
  public Write(index: number, val: number): void {
    this._components[index] = val;
  }
  public readonly SIZE_VECTOR: number = 0;
  constructor(sizeVector: number) {
    this._components = new Array<number>(sizeVector).fill(0);
    this.SIZE_VECTOR = sizeVector;
  }
}

export class SparseVector implements IVECTOR {
  private _components: Record<number, number> = {};

  public Read(index: number): number {
    return this._components[index];
  }
  public Write(index: number, val: number): void {
    this._components[index] = val;
  }
  public readonly SIZE_VECTOR: number = 0;
  constructor(sizeVector: number) {
    this.SIZE_VECTOR = sizeVector;
  }
}
