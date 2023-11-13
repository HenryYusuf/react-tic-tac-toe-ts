import { ChangeEvent, useState } from "react";

function Player({
  initialName,
  symbol,
  isActive,
}: {
  initialName: string;
  symbol: string;
  isActive: boolean;
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleButton() {
    setIsEditing((editing) => !editing);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleButton}>{btnCaption}</button>
    </li>
  );
}

export default Player;
