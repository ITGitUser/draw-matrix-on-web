import { IVisualisation } from "./IVisualisation";

export class VisualisationConsole implements IVisualisation {
  private matrix: string[][] = [];
  BeginDraw(numRow: number, numCol: number): void {
    console.clear();
    for (let index_row = 0; index_row < numRow; index_row++) {
      this.matrix.push([]);
      for (let index_col = 0; index_col < numCol; index_col++) {
        this.matrix[index_row].push("*");
      }
    }
  }
  EndDraw(): void {
    let str: string = "";
    for (let index_row = 0; index_row < this.matrix.length; index_row++) {
      for (
        let index_col = 0;
        index_col < this.matrix[index_row].length;
        index_col++
      ) {
        str += this.matrix[index_row][index_col];
      }
      console.log(str);
      str = "";
    }
  }
  DrawElement(indexRow: number, indexCol: number, value: string): void {
    //проверка на наличие рамки, если есть то свдигаем на +1 +1
    if (this.matrix[1][0] === "|") {
      this.matrix[indexRow + 1][indexCol + 1] = "   " + value + "\t";
    } else {
      this.matrix[indexRow][indexCol] = "   " + value + "\t";
    }
  }
  DrawBorder(): void {
    let borderHorizont: string = "-";
    for (let index = 0; index < this.matrix[0].length; index++) {
      borderHorizont += "--------";
    }

    for (let index_row = 0; index_row < this.matrix.length; index_row++) {
      this.matrix[index_row].push("|");
      this.matrix[index_row].unshift("|");
    }
    this.matrix.push([borderHorizont]);
    this.matrix.unshift([borderHorizont]);
  }
}
