import React from "react";

function Button({ id, className, text, onClick }) {
  return (
    <button id={id} className={`btn ${className}`} onClick={onClick}>
      {" "}
      {text}{" "}
    </button>
  );
}

export default Button;
