import React from "react";

export default function Modal({ children, className }) {
  return (
    <div className="modal-overlay">
      <div className={`modal-content ${className}`}>{children}</div>
    </div>
  );
}
