import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTransactionField } from "../store/slices/transaction/transactionSlice";

export default function SelectMenu({
  id,
  label,
  name,
  onChange,
  className = "",
  value,
  defaultOption,
  options,
  error,
}) {
  // get data from redux store
  const transactionField = useSelector(selectTransactionField);

  // state variables
  const [transactionData, setTransactionData] = useState(transactionField);
  useEffect(() => {
    setTransactionData(transactionField);
  }, [transactionField]);

  return (
    <>
      <div className={`${className}`}>
        <label htmlFor={id}>{label} </label>
        <select
          id={id}
          name={name.toLowerCase()}
          value={value}
          onChange={onChange}
        >
          <option value={""} hidden>
            {defaultOption}{" "}
          </option>
          {options.map((option) => {
            return (
              <option key={option} value={option}>
                {option}{" "}
              </option>
            );
          })}
        </select>
        <p>{error}</p>
      </div>
    </>
  );
}
