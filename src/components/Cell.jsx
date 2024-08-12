const Cell = ({ index, onClick, mark, turn, disabled }) => {
  return (
    <button
      className="square"
      onClick={() => onClick(index)}
      disabled={disabled}
      aria-label={mark === null ? `Mark cell ${index} as ${turn}` : undefined}
    >
      <span aria-hidden>{mark}</span>
    </button>
  );
};

export default Cell;
