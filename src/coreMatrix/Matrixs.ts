import { IMATRIX } from "./IMatrix";
import { IVECTOR } from "./IVector";
import { IVisualisation } from "./Visual/IVisualisation";
import { NormalVector, SparseVector } from "./Vectors";

export abstract class SomeMatrix implements IMATRIX {
  protected flagBorder: boolean = false;
  protected _matrix: Array<IVECTOR> = [];
  protected _visualisation: IVisualisation;
  public abstract Read(indexRow: number, indexColumn: number): number;
  public abstract Write(
    indexRow: number,
    indexColumn: number,
    val: number
  ): void;
  public abstract DrawMatrix(): void;
  public setFlagBorder(isBorder: boolean): void {
    this.flagBorder = isBorder;
  }
  public SetTypeVisualisation(typeVisual: IVisualisation): void {
    this._visualisation = typeVisual;
  }
  public abstract readonly SIZE_ROW: number;
  public abstract readonly SIZE_COLUMN: number;
  constructor(visual: IVisualisation) {
    this._visualisation = visual;
  }
}

export class NormalMatrix extends SomeMatrix {
  public DrawMatrix(): void {
    this._visualisation.BeginDraw(this.SIZE_ROW, this.SIZE_COLUMN);
    for (let index_row = 0; index_row < this.SIZE_ROW; index_row++) {
      for (let index_col = 0; index_col < this.SIZE_COLUMN; index_col++) {
        this._visualisation.DrawElement(
          index_row,
          index_col,
          this._matrix[index_row].Read(index_col).toString()
        );
      }
    }
    this.flagBorder &&
      this._visualisation.DrawBorder(this.SIZE_ROW, this.SIZE_COLUMN);
    this._visualisation.EndDraw();
  }
  public Read(indexRow: number, indexColumn: number): number {
    return this._matrix[indexRow].Read(indexColumn);
  }
  public Write(indexRow: number, indexColumn: number, val: number): void {
    this._matrix[indexRow].Write(indexColumn, val);
  }
  public readonly SIZE_ROW: number = 0;
  public readonly SIZE_COLUMN: number = 0;
  constructor(numRows: number, numColumns: number, visual: IVisualisation) {
    super(visual);
    this._matrix = new Array<NormalVector>(numRows);
    for (let index = 0; index < numRows; index++) {
      this._matrix[index] = new NormalVector(numColumns);
      this.SIZE_COLUMN = numColumns;
      this.SIZE_ROW = numRows;
    }
  }
}

export class SparseMatrix extends SomeMatrix {
  public DrawMatrix(): void {
    this._visualisation.BeginDraw(this.SIZE_ROW, this.SIZE_COLUMN);
    this.flagBorder &&
      this._visualisation.DrawBorder(this.SIZE_ROW, this.SIZE_COLUMN);
    for (let index_row = 0; index_row < this.SIZE_ROW; index_row++) {
      for (let index_col = 0; index_col < this.SIZE_COLUMN; index_col++) {
        if (this._matrix[index_row].Read(index_col) !== undefined) {
          this._visualisation.DrawElement(
            index_row,
            index_col,
            this._matrix[index_row].Read(index_col).toString()
          );
        } else {
          this._visualisation.DrawElement(index_row, index_col, " ");
        }
      }
    }
    this._visualisation.EndDraw();
  }
  public Read(indexRow: number, indexColumn: number): number {
    return this._matrix[indexRow].Read(indexColumn);
  }
  public Write(indexRow: number, indexColumn: number, val: number): void {
    this._matrix[indexRow].Write(indexColumn, val);
  }
  public readonly SIZE_ROW: number = 0;
  public readonly SIZE_COLUMN: number = 0;
  constructor(numRows: number, numColumns: number, visual: IVisualisation) {
    super(visual);
    this._matrix = new Array<SparseVector>(numRows);
    for (let index = 0; index < numRows; index++) {
      this._matrix[index] = new SparseVector(numColumns);
    }
    this.SIZE_ROW = numRows;
    this.SIZE_COLUMN = numColumns;
  }
}
