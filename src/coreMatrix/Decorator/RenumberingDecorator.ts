import { IMATRIX } from "../IMatrix";
import { Decorator } from "./Decorator";

export class RenumberingDecorator extends Decorator {
  private rows: Record<number, number> = [];
  private cols: Record<number, number> = [];
  public Read(indexRow: number, indexColumn: number): number {
    let curIndexRow: number = indexRow;
    let curIndexCol: number = indexColumn;
    if (this.rows[indexRow] && this.cols[indexColumn]) {
      curIndexRow = this.rows[indexRow];
      curIndexCol = this.cols[indexColumn];
    }
    return this._origMatrix.Read(curIndexRow, curIndexCol);
  }
  public Write(indexRow: number, indexColumn: number, val: number): void {
    let curIndexRow: number = indexRow;
    let curIndexCol: number = indexColumn;
    if (this.rows[indexRow] && this.cols[indexColumn]) {
      curIndexRow = this.rows[indexRow];
      curIndexCol = this.cols[indexColumn];
    }
    this._origMatrix.Write(curIndexRow, curIndexCol, val);
  }
  public DrawMatrix(): void {
    this._origMatrix.DrawMatrix();
  }
  public SwapRows(oneRow: number, twoRow: number): void {
    this.rows[oneRow] = twoRow;
    this.rows[twoRow] = oneRow;
  }
  public SwapColumns(oneColumn: number, twoColumn: number): void {
    this.cols[oneColumn] = twoColumn;
    this.cols[twoColumn] = oneColumn;
  }
  constructor(mtrx: IMATRIX) {
    super(mtrx);
  }
}
