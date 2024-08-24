import React, { ReactNode } from "react";
import styles from "./modal.module.css";

export type ModelProps = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
};
const Modal = ({ show, onClose, children }: ModelProps) => {
  if (!show) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
