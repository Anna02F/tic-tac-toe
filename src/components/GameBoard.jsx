import { useState } from "react";
import Cell from "./Cell";
import Modal from "./Modal";

const GameBoard = () => {
  const cells = Array(9).fill(null);
  const [board, setBoard] = useState(cells);
  const [xIsPlaying, setXIsPlaying] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const CELL_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const turn = xIsPlaying ? "X" : "O";

  const handleCellClick = (index) => {
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    setXIsPlaying(!xIsPlaying);
  };

  const determinWinner = (board) => {
    for (let line of CELL_LINES) {
      const [x, y, z] = line;
      if (board[x] !== null && board[x] === board[y] && board[y] === board[z])
        return board[x];
    }
    // No winner yet
    return null;
  };
  const winner = determinWinner(board);

  const getStatusMessage = () => {
    if (winner !== null) return `Player ${winner} wins!`;

    // All cells are filled, no winner
    if (!board.includes(null)) return `It's a draw, try again!`;

    return `Now is playing ${turn}`;
  };

  const handleReset = () => {
    if (board.every((cell) => cell === null)) return;
    if (board.includes(null) && winner === null) {
      setShowModal(true);
    } else {
      resetGame();
    }
  };

  const resetGame = () => {
    setBoard(cells);
    setXIsPlaying(true);
    setShowModal(false);
  };

  return (
    <div className="board">
      <h2>{getStatusMessage()}</h2>
      <div className="board-container">
        {board.map((_, index) => {
          return (
            <Cell
              key={index}
              index={index}
              onClick={handleCellClick}
              board={board}
              mark={board[index]}
              turn={turn}
              disabled={board[index] !== null || winner !== null}
            />
          );
        })}
        <button onClick={handleReset}>Reset</button>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={resetGame}
        message={"The game isn't finished yet. Are you sure you want to reset?"}
      />
    </div>
  );
};

export default GameBoard;
