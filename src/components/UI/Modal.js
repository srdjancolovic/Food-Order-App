import React from "react";

import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.scss";
const DarkOverlay = ({ onClick }) => {
  return <div className={classes.overlay} onClick={onClick}></div>;
};

const ModalContent = ({ children }) => {
  return <div className={classes.modal}>{children} </div>;
};

const portalLocation = document.getElementById("modal-portal");

const Modal = ({ onClick, children }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<DarkOverlay onClick={onClick} />, portalLocation)}
      {ReactDOM.createPortal(
        <ModalContent>{children} </ModalContent>,
        portalLocation
      )}
    </Fragment>
  );
};

export default Modal;
