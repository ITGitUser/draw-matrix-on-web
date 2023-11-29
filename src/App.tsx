import { useEffect, useState } from "react";
import { NormalMatrix, SomeMatrix, SparseMatrix } from "./coreMatrix/Matrixs";
import { VisualisationFrontend } from "./coreMatrix/Visual/VisualisationFrontend";
import { MatrixInitiator } from "./coreMatrix/OperationOnMatrix";
import { VisualisationConsole } from "./coreMatrix/Visual/VisualisationConsole";
import styles from "./App.module.scss";
import { Decorator } from "./coreMatrix/Decorator/Decorator";
import { RenumberingDecorator } from "./coreMatrix/Decorator/RenumberingDecorator";

let currentMatrix: SomeMatrix;
const App = () => {
  const [isBorder, setIsBorder] = useState<boolean>(false);

  //обработчик нажатия кнопки Генерация обычной матрицы
  function handleClickNormal(): void {
    currentMatrix = new NormalMatrix(5, 4, new VisualisationConsole());
    MatrixInitiator.FillMatrix(currentMatrix, 12, 50);
    currentMatrix.setFlagBorder(isBorder);
    currentMatrix.DrawMatrix();
    currentMatrix.SetTypeVisualisation(new VisualisationFrontend());
    currentMatrix.DrawMatrix();
    // let decorM: RenumberingDecorator = new RenumberingDecorator(currentMatrix);
    // decorM.Write(4, 3, 111);
    // currentMatrix.DrawMatrix();
    //currentMatrix.Read(4, 3);
  }
  //обработчик нажатия кнопки Генерация разреженной матрицы
  function handleClickSparse(): void {
    currentMatrix = new SparseMatrix(4, 5, new VisualisationConsole());
    MatrixInitiator.FillMatrix(currentMatrix, 5, 70);
    currentMatrix.setFlagBorder(isBorder);
    currentMatrix.DrawMatrix();

    currentMatrix.SetTypeVisualisation(new VisualisationFrontend());
    currentMatrix.DrawMatrix();
  }

  function handleClickSwap(): void {
    let decorMatrix: RenumberingDecorator = new RenumberingDecorator(
      currentMatrix
    );
    decorMatrix.SwapRows(2, 3);
    decorMatrix.SwapColumns(1, 3);
    currentMatrix.SetTypeVisualisation(new VisualisationConsole());
    decorMatrix.DrawMatrix();
  }
  function handleClickRestore(): void {
    currentMatrix.SetTypeVisualisation(new VisualisationConsole());
    currentMatrix.DrawMatrix();
    //currentMatrix.SetTypeVisualisation(new VisualisationConsole);
  }
  //при изменении чекбокса перерисовываем содержимое матрицы
  useEffect(() => {
    if (currentMatrix) {
      currentMatrix.setFlagBorder(isBorder);
      currentMatrix.SetTypeVisualisation(new VisualisationFrontend());
      currentMatrix.DrawMatrix();

      currentMatrix.SetTypeVisualisation(new VisualisationConsole());
      currentMatrix.DrawMatrix();
    }
  }, [isBorder]);
  return (
    <div className={styles.AppContainer}>
      <div className={styles.menu}>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => {
              handleClickNormal();
            }}
          >
            Генерация обычной матрицы
          </button>
          <button
            onClick={() => {
              handleClickSparse();
            }}
          >
            Генерация разреженной матрицы
          </button>
          <button
            onClick={() => {
              handleClickSwap();
            }}
          >
            Перенумеровать
          </button>
          <button
            onClick={() => {
              handleClickRestore();
            }}
          >
            Восстановить
          </button>
        </div>

        <div className={styles.checkBoxContainer}>
          <input
            id="checkBorder"
            type="checkbox"
            name="scales"
            onChange={() => setIsBorder(!isBorder)}
          />
          <label htmlFor="checkBorder">Отображение границы матрицы</label>
        </div>
      </div>

      <div className={styles.matrixContainer} id="matrix"></div>
    </div>
  );
};

export default App;
