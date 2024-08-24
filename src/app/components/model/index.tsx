// import React from "react";
// import styles from "./modal.module.css";

// const Modal = ({ show, onClose, children }: any) => {
//   if (!show) return null;

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modal}>
//         <button className={styles.closeButton} onClick={onClose}>
//           &times;
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

const Modal = ({ show, onClose, children }: any) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
