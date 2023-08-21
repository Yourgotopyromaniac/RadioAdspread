import React from "react";
import "./style.css"

const Modal = ({open, children}) => {
  return (
    
    <div className="overlay-modal">
<div className="modal-wrapper">
  {children}
</div>
    </div>
  )

}

export default Modal;