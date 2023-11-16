// Definisikan tipe Props untuk menerima properti yang diperlukan
type Props = {
  winner: string | null; // Pemenang permainan atau null jika seri
  onRestart: () => void; // Fungsi yang akan dipanggil saat tombol "Rematch" ditekan
};

// Komponen React untuk menampilkan layar akhir permainan
export default function GameOver({ winner, onRestart }: Props) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {/* Tampilkan pesan pemenang jika ada pemenang */}
      {winner && <p>{winner} won!</p>}
      {/* Tampilkan pesan seri jika tidak ada pemenang */}
      {!winner && <p>It's a draw!</p>}
      {/* Tombol untuk memulai pertandingan ulang saat diklik */}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
