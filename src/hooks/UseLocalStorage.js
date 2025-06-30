import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/slices/transaction/transactionSlice";

export default function UseLocalStorage(key, initialValue) {
  const [data, setData] = useState(initialValue);
  const dispatch = useDispatch();

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem(key));
    if (existingData) {
      setData(existingData);
      dispatch(addTransaction(existingData));
    } else {
      localStorage.setItem(key, JSON.stringify(initialValue));
    }
  }, []);

  const upDateLocalStorage = (newData) => {
    if (typeof newData === "function") {
      localStorage.setItem(key, JSON.stringify(newData(data)));
    } else {
      localStorage.setItem(key, JSON.stringify(newData));
      dispatch(addTransaction(newData));
    }

    setData(newData);
  };

  return [data, upDateLocalStorage];
}
