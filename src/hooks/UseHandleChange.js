import React from "react";
import { upDateTransactionData } from "../store/slices/transaction/transactionSlice";
import { useDispatch } from "react-redux";

export default function UseHandleChange() {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(upDateTransactionData({ name, value }));
  };

  return handleChange;
}
