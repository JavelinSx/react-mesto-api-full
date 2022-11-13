import React from "react";

const InfoTooltip = ({ isOpen, onClose, icon, message }) => {
  return (
    <div className={`popup popup__type_tooltip ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__container tooltip-container">
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="tooltip-icon" src={icon} alt="иконка"></img>
        <h2 className="tooltip-message">{message}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
