export interface IMATRIX {
  Read(indexRow: number, indexColumn: number): number;
  Write(indexRow: number, indexColumn: number, val: number): void;
  DrawMatrix(): void;
  readonly SIZE_ROW: number;
  readonly SIZE_COLUMN: number;
}
