import ReactDOM from "react-dom";
import './styles.css'
function Modal({ children }: any) {
  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
}
export default Modal