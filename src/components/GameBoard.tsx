import { useState } from "react";

type Props = { onSelectSquare: () => void; activePlayerSymbol: PlayerSymbol };
export type PlayerSymbol = "X" | "O" | null;

const initialGameBoard: PlayerSymbol[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({
  onSelectSquare,
  activePlayerSymbol,
}: Props) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard: PlayerSymbol[][] = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];

      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
