import React from "react";

function Input({
  id,
  label,
  name,
  type,
  value,
  onChange,
  className = "",
  error,
}) {
  return (
    <>
      <div className={`inputComponent ${className}`}>
        {label && <label htmlFor={id}>{label} </label>}

        <input
          className="input"
          name={name}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
        />
        <p> {error}</p>
      </div>
    </>
  );
}

export const TextArea = ({
  label,
  id,
  name,
  className = "",
  value,
  onChange,
}) => {
  return (
    <>
      <div className={`textArea ${className}`}>
        {label && <label htmlFor={id}>{label} </label>}

        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        ></textarea>
      </div>
    </>
  );
};

export default Input;
