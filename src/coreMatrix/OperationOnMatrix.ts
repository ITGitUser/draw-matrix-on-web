import { IMATRIX } from "./IMatrix";

export class MatrixInitiator {
  static FillMatrix(
    matrix: IMATRIX,
    numNonZeroVal: number,
    maxVal: number
  ): void {
    let allCoordinates: number[][] = [];
    // Создаем массив всех возможных координат
    for (let i = 0; i < matrix.SIZE_ROW; i++) {
      for (let j = 0; j < matrix.SIZE_COLUMN; j++) {
        allCoordinates.push([i, j]);
      }
    }
    // Заполняем матрицу случайными значениями без повторений
    for (let k = 0; k < numNonZeroVal; k++) {
      const randomIndex = Math.floor(Math.random() * allCoordinates.length);
      //удаляем одну координату по индексу randomIndex, возращая массив удаленных координат,
      //берем первую по индексу 0 и деструктурирем
      const [row, col] = allCoordinates.splice(randomIndex, 1)[0];
      const randomValue = Math.floor(Math.random() * (maxVal - 1) + 1); // Генерируем случайное целое число от 1 до maxVal
      matrix.Write(row, col, randomValue);
    }
    allCoordinates = [];
  }
}

export class MatrixStatistic {
  constructor(matrix: IMATRIX) {
    for (let indexRow = 0; indexRow < matrix.SIZE_ROW; indexRow++) {
      for (
        let indexColumn = 0;
        indexColumn < matrix.SIZE_COLUMN;
        indexColumn++
      ) {
        let valFromMatrix: number = matrix.Read(indexRow, indexColumn);
        if (valFromMatrix !== undefined) {
          this.sumAllValMatrix += valFromMatrix;
        }

        if (this.maxVal < valFromMatrix) {
          this.maxVal = valFromMatrix;
        }
        if (valFromMatrix > 0) {
          this.numNonZeroVal += 1;
        }
      }
    }

    this.unitVal =
      this.sumAllValMatrix / (matrix.SIZE_ROW * matrix.SIZE_COLUMN);
  }

  public readonly sumAllValMatrix: number = 0;
  public readonly unitVal: number = 0;
  public readonly maxVal: number = 0;
  public readonly numNonZeroVal: number = 0;
}
