import React from 'react';
import styles from "./Overlay.module.css"
type OverlayProps = {
  openOverlay: boolean;
  closeOverlay: Function
};
const Overlay = ({ openOverlay, closeOverlay }: OverlayProps) => {
  const overlayClassName = `${styles.overlay} ${openOverlay ? `${styles.open}` : `${styles.close}`}`
  return (
    <div className={overlayClassName} onClick={() => closeOverlay()}></div>
  )
}

export default Overlay;
