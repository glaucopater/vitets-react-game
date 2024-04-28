import "./Modal.css";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-wrapper">
      <div className="modal">{children}</div>
    </div>
  );
};

export default Modal;
