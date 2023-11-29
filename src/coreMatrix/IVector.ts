export interface IVECTOR {
  Read(index: number): number;
  Write(index: number, val: number): void;
  readonly SIZE_VECTOR: number;
}
