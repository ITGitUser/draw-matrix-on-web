import { IVECTOR } from "../IVector";
export interface dataRender {
  data: string[];
}
export interface IVisualisation {
  BeginDraw(numRow: number, numCol: number): void;
  EndDraw(): void;
  DrawElement(indexRow: number, indexCol: number, value: string): void;
  DrawBorder(numRow: number, numCol: number): void;
}
