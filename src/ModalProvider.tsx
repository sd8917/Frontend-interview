import { createPortal } from "react-dom";
import { ModalContext  } from "./ModalContext";
import  { useState } from "react";
import { type Modal } from "./ModalContext";
export function ModalProvider({ children }: any) {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = (content: any) => {
    setModals((prev) => [
      ...prev,
      { id: crypto.randomUUID(), content },
    ]);
  };

  const closeModal = (id: any) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {createPortal(
        <div className="modal-root">
          {modals.map((modal, index) => (
            <div key={modal.id} className="modal-overlay">
              <div className="modal">
                {modal.content}
                <button onClick={() => closeModal(modal.id)}>Close</button>
              </div>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ModalContext.Provider>
  );
}
