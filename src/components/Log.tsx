import { GameTurns } from "../App";

// Komponen Log digunakan untuk menampilkan log giliran permainan.
// Menerima prop "turns" yang berisi array objek GameTurns.
export default function Log({ turns }: { turns: GameTurns[] }) {
  return (
    // Menggunakan elemen <ol> (ordered list) untuk menampilkan log dengan urutan giliran.
    <ol id="log">
      {/* Menggunakan metode map untuk membuat setiap item log berdasarkan giliran yang terjadi */}
      {turns.map((turn) => (
        // Setiap log memiliki kunci unik berdasarkan posisi baris dan kolom untuk membantu React dalam identifikasi elemen
        <li key={`${turn.square.row}${turn.square.col}`}>
          {/* Menampilkan informasi pemain dan kotak yang dipilih pada setiap giliran */}
          {turn.player} selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
