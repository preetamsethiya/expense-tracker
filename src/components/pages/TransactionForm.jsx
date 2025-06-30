import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import {
  clearRowId,
  clearTransactionData,
  selectRowId,
  selectTransactionField,
} from "../../store/slices/transaction/transactionSlice";
import { nanoid } from "@reduxjs/toolkit";
import UseHandleChange from "../../hooks/UseHandleChange";
import UseLocalStorage from "../../hooks/UseLocalStorage";
import Input, { TextArea } from "../Input";
import SelectMenu from "../SelectMenu";
import { useNavigate } from "react-router";
import { errorConfig } from "../../error_config/errorConfig";

const categoryList = ["Grosary", "Bills", "Education"];

function TransactionForm() {
  //  state variables
  const [errors, setErrors] = useState({});

  const transactionData = useSelector(selectTransactionField);
  const rowId = useSelector(selectRowId);

  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = UseHandleChange();
  const [transactions, setTransactions] = UseLocalStorage("transactions", []);

  // functions

  const validate = (formData) => {
    const errorData = {};

    Object.entries(formData).forEach(([key, value]) => {
      errorConfig[key]?.some((rule) => {
        if (rule.required && !value) {
          errorData[key] = rule.message;
          return true;
        }

        if (rule.minLength && value.length < 5) {
          errorData[key] = rule.message;
          return true;
        }
      });
    });
    setErrors(errorData);
    return errorData;
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const errorResult = validate(transactionData);
    if (Object.keys(errorResult).length) return;
    navigate("/");
    if (rowId) {
      setTransactions((prevState) => {
        return prevState.map((prevTransaction) => {
          if (prevTransaction.id === rowId) {
            return { ...transactionData, id: rowId };
          }
          return prevTransaction;
        });
      });
      dispatch(clearTransactionData());
      dispatch(clearRowId(""));
      return;
    }
    const data = { ...transactionData, id: nanoid() };
    setTransactions((prev) => {
      return [...prev, data];
    });

    dispatch(clearTransactionData());
  };

  return (
    <>
      <div className="formContainer widthFull heightFull bgLightBlue flex itemsCenter justifyCenter padding1remX">
        <form
          onSubmit={HandleSubmit}
          // style={{ backgroundColor: "black", height: "100vh", color: "white" }}
          className="transactionForm maxWidth500 minHeight600  flex itemsCenter justifyCenter flexColumn padding2rem gap2Rem "
        >
          <Input
            id={"titleField"}
            label={"Title"}
            name={"title"}
            className={"titleField width100"}
            value={transactionData.title}
            onChange={handleChange}
            error={errors.title}
          />
          <SelectMenu
            id={"categoryField"}
            label={"Category"}
            name={"category"}
            className={" selectField width100"}
            defaultOption={"All"}
            options={categoryList}
            onChange={handleChange}
            error={errors.category}
          />
          <Input
            id={"amountField"}
            label={"Amount"}
            name={"amount"}
            className={" amountField width100"}
            type={"number"}
            value={transactionData.amount}
            onChange={handleChange}
            error={errors.amount}
          />
          <TextArea
            label={"Description"}
            id={"descriptionField"}
            name={"description"}
            className={"textField width100"}
            value={transactionData.description}
            onChange={handleChange}
          />

          <Button
            name={"submitButton"}
            className={"submitBtn"}
            text={"Submit"}
          />
        </form>
      </div>
    </>
  );
}

export default TransactionForm;
