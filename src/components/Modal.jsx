const Modal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default Modal;
