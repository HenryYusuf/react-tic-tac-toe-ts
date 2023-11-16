import { ChangeEvent, useState } from "react";

// Definisikan tipe properti yang akan diterima oleh komponen Player
type Props = {
  initialName: string;
  symbol: string;
  isActive: boolean;
  onChangeName: (symbol: string, playerName: string) => void;
};

// Komponen Player yang akan menampilkan informasi pemain dan memungkinkan pengeditan nama
function Player({ initialName, symbol, isActive, onChangeName }: Props) {
  // State untuk menyimpan nama pemain dan status pengeditan
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  // Fungsi yang akan dipanggil ketika tombol Edit/Save diklik
  function handleButton() {
    // Toggle status pengeditan
    setIsEditing((editing) => !editing);

    // Jika sedang dalam mode pengeditan, panggil fungsi onChangeName untuk menyimpan nama pemain
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // Fungsi yang akan dipanggil ketika nilai input nama pemain berubah
  // ChangeEvent<HTMLInputElement> berguna untuk attribut onChange=""
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    // Perbarui state nama pemain sesuai dengan nilai input
    setPlayerName(event.target.value);
  }

  // Variabel untuk menyimpan elemen yang akan ditampilkan sebagai nama pemain
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  // Variabel untuk menyimpan teks pada tombol
  let btnCaption = "Edit";

  // Jika sedang dalam mode pengeditan, tampilkan input untuk mengedit nama pemain
  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );

    // Ganti teks tombol menjadi "Save" saat dalam mode pengeditan
    btnCaption = "Save";
  }

  // Render komponen Player
  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {/* Tampilkan nama pemain yang dapat diubah (atau input nama pemain saat pengeditan) */}
        {editablePlayerName}
        {/* Tampilkan simbol pemain */}
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* Tombol untuk memulai/mengakhiri pengeditan nama pemain */}
      <button onClick={handleButton}>{btnCaption}</button>
    </li>
  );
}

// Ekspor komponen Player sebagai default
export default Player;
