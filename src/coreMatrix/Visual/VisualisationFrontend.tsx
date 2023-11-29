import ReactDOM from "react-dom";
import { IVisualisation } from "./IVisualisation";
import styles from "./visualFrontend.module.scss";

export class VisualisationFrontend implements IVisualisation {
  private matrix: string[][] = [];
  private isBorder: boolean = false;
  BeginDraw(numRow: number, numCol: number): void {
    this.matrix = [];
    for (let index_row = 0; index_row < numRow; index_row++) {
      this.matrix.push([]);
      for (let index_col = 0; index_col < numCol; index_col++) {
        this.matrix[index_row].push("*");
      }
    }
  }
  EndDraw(): void {
    const drawContainer = document.getElementById("matrix") as HTMLElement;
    if (drawContainer) {
      ReactDOM.render(
        <div
          className={
            this.isBorder ? styles.divWithBorder : styles.divWithoutBorder
          }
        >
          {this.matrix.map((vector, index_m) => {
            return (
              <div className={styles.vectorSpans} key={index_m}>
                {vector.map((element, index_v) => {
                  return (
                    <span className={styles.matrixSpan} key={index_v}>
                      {element}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>,
        drawContainer
      );
    }
  }

  DrawElement(indexRow: number, indexCol: number, value: string): void {
    if (value === " ") {
      this.matrix[indexRow][indexCol] = " -\t";
    } else {
      this.matrix[indexRow][indexCol] = "   " + value + "\t";
    }
  }
  DrawBorder(): void {
    this.isBorder = !this.isBorder;
  }
}
