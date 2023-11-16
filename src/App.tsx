// Import komponen yang diperlukan dari file eksternal
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

// Definisikan tipe untuk giliran permainan dan simbol pemain
export type GameTurns = {
  square: {
    row: number;
    col: number;
  };
  player: PlayerSymbol;
};

export type PlayerSymbol = "X" | "O" | null;

// Konstanta untuk nama pemain
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

// Array untuk status awal papan permainan
const INITIAL_GAME_BOARD: PlayerSymbol[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Fungsi untuk menentukan pemain yang sedang aktif
function deriveActivePlayer(gameTurns: GameTurns[]) {
  let currentPlayer: PlayerSymbol = "X";

  // Jika ada giliran sebelumnya dan pemain yang terakhir bermain adalah 'X', ganti ke pemain 'O'
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

// Fungsi untuk mendapatkan papan permainan berdasarkan giliran
function deriveGameBoard(gameTurns: GameTurns[]) {
  // Buat salinan papan permainan awal
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  // Isi papan permainan dengan giliran yang telah terjadi
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

// Fungsi untuk menentukan pemenang berdasarkan papan permainan
function deriveWinner(
  gameBoard: PlayerSymbol[][],
  players: { X: string; O: string }
) {
  let winner = null;

  // Periksa setiap kombinasi yang mungkin untuk menemukan pemenang
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    // Jika semua tiga kotak memiliki simbol yang sama, maka pemain tersebut adalah pemenang
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

// Komponen utama aplikasi
function App() {
  // State untuk pemain dan giliran permainan
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState<GameTurns[]>([]);

  // Mendapatkan pemain yang sedang aktif
  const activePlayer = deriveActivePlayer(gameTurns);

  // Mendapatkan papan permainan berdasarkan giliran
  const gameBoard = deriveGameBoard(gameTurns);

  // Menentukan pemenang berdasarkan papan permainan
  const winner = deriveWinner(gameBoard, players);

  // Menentukan apakah permainan berakhir seri
  const hasDraw = gameTurns.length === 9 && !winner;

  // Fungsi untuk menangani pemilihan kotak pada papan permainan
  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      // Menambahkan giliran baru ke dalam array giliran
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  // Fungsi untuk merestart permainan
  function handleRestart() {
    setGameTurns([]);
  }

  // Fungsi untuk mengubah nama pemain
  function handlePlayerNameChange(symbol: string, newName: string) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  // Render tampilan aplikasi
  return (
    <main>
      <div id="game-container">
        {/* Render komponen pemain */}
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/* Render komponen akhir permainan jika ada pemenang atau seri */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        {/* Render papan permainan */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      {/* Render log giliran permainan */}
      <Log turns={gameTurns} />
    </main>
  );
}

// Ekspor komponen App sebagai default
export default App;
