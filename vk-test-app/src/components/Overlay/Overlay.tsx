import React from 'react';
import "./Overlay.scss"
type OverlayProps = {
  openOverlay: boolean;
  closeOverlay: Function
};
const Overlay = ({ openOverlay, closeOverlay }: OverlayProps) => {
  const overlayClassName = `overlay ${openOverlay ? "open" : "close"}`

  return (
    <div className={overlayClassName} onClick={() => closeOverlay()}></div>
  )
}

export default Overlay;
