import { useEffect, type CSSProperties } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.body;

export default function Modal({ isOpen, onClose, children } : any) {
  if (!isOpen) return null;

  // Close on ESC key
  useEffect(() => {
    
    const handleEsc = (e: any) => {
        console.log("e ", e)
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const modalContent = (
    <div style={styles.overlay as CSSProperties } onClick={onClose}>
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()} // prevent overlay close
      >
        {children}
      </div>
    </div>
  );

  // ✅ PORTAL USAGE
  return ReactDOM.createPortal(modalContent, modalRoot);
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(197, 43, 43, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    padding: "24px",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90%"
  }
};
