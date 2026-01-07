import React from "react";
import "./Modal.css";

export default function Modal({ children, className = "" }) {
  return (
    <div className="modal-overlay">
      <div className={`modal-content ${className}`}>{children}</div>
    </div>
  );
}
