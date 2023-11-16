// Import tipe data PlayerSymbol dari file App
import { PlayerSymbol } from "../App";

// Definisikan tipe data props untuk komponen GameBoard
type GameBoardProps = {
  onSelectSquare: (rowIndex: number, colIndex: number) => void; // Fungsi yang akan dipanggil ketika suatu kotak dipilih
  board: PlayerSymbol[][]; // Papan permainan yang akan ditampilkan
};

// Komponen GameBoard
export default function GameBoard({ onSelectSquare, board }: GameBoardProps) {
  // Render papan permainan dalam bentuk elemen <ol>
  return (
    <ol id="game-board">
      {/* Map setiap baris pada papan permainan */}
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          {/* Render setiap kotak pada baris dalam bentuk elemen <ol> */}
          <ol>
            {/* Map setiap simbol pemain pada suatu kotak */}
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* Tombol yang merepresentasikan suatu kotak pada papan permainan */}
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)} // Panggil fungsi onSelectSquare saat tombol ditekan
                  disabled={playerSymbol !== null} // Nonaktifkan tombol jika kotak sudah terisi
                >
                  {playerSymbol} {/* Tampilkan simbol pemain pada kotak */}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
