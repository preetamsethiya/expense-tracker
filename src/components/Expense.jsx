import React, { useEffect, useState } from "react";
import "../App.css";
import "../Expense.css";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addRowId,
  clearRowId,
  selectTransactions,
} from "../store/slices/transaction/transactionSlice";
import UseHandleChange from "../hooks/UseHandleChange";
import { setMenuPosition } from "../store/slices/transaction/transactionSlice";
import ContextMenu from "./ContextMenu";
import SelectMenu from "./SelectMenu";
import UseFilter from "../hooks/UseFilter";

const categoryList = ["Grosary", "Bills", "Education"];

function Expense() {
  // variables
  // state variables
  const [isSort, setIsSort] = useState(false);

  const [sortCallback, setSortCallback] = useState(() => () => {});
  // hooks
  const transactionList = useSelector(selectTransactions);
  const handleChange = UseHandleChange();
  const dispatch = useDispatch();
  const [filterCategory, setFilterCategory] = UseFilter(
    transactionList,
    (transaction) => transaction.category
  );

  const total = filterCategory.reduce(
    (accumulator, current) => accumulator + parseInt(current.amount),
    0
  );

  return (
    <>
      <ContextMenu />

      <div className="mainExpenseContainer bgLightBlue  mxAuto minHeight100svh flex  textCenter">
        <div
          className={` expenseContainer  maxWidth800 mxAuto  flex flexColumn  itemsCenter ${
            !transactionList.length ? "justifyCenter" : ""
          }  `}
        >
          <div className="btnContainer">
            <div className="addTransactionBtn decorationNone font2Rem  brown500 ">
              {" "}
              + Add transaction{" "}
            </div>
            <NavLink to={"transactionForm"} className="decorationNone ">
              {" "}
              <input
                type="text"
                name="transactionType"
                value="Income"
                readOnly
                onClick={(e) => {
                  handleChange(e);
                  dispatch(clearRowId(""));
                }}
                className="btn maxWidth9rem radiusFull Income pointer"
              />
            </NavLink>
            <NavLink to={"transactionForm"} className="decorationNone ">
              {" "}
              <input
                type="text"
                name="transactionType"
                value="Expense"
                readOnly
                onClick={(e) => {
                  handleChange(e);
                  dispatch(clearRowId(""));
                }}
                className="btn maxWidth9rem radiusFull Expense pointer"
              />
            </NavLink>
          </div>
          <table
            className={`width100 ${
              !transactionList.length ? "displayNone" : ""
            }`}
            onClick={() => {
              dispatch(setMenuPosition({}));
            }}
          >
            <thead>
              <tr>
                <th>Description</th>
                <th>
                  <SelectMenu
                    id={"categoryFilterMenu"}
                    name={"categcategoryFilterMenuory"}
                    className="categoryFilterMenu"
                    defaultOption={"All"}
                    options={categoryList}
                    onChange={(e) => {
                      setFilterCategory(e.target.value);
                    }}
                  />
                </th>
                <th className="amountHeading">
                  {" "}
                  <div>
                    {" "}
                    <span>Amount</span>{" "}
                    <span
                      style={{
                        cursor: "pointer",
                        marginLeft: "2rem",
                        userSelect: "none",
                      }}
                      onClick={() => {
                        isSort
                          ? setSortCallback(() => (a, b) => a.amount - b.amount)
                          : setSortCallback(
                              () => (a, b) => b.amount - a.amount
                            );
                        setIsSort((prev) => !prev);
                      }}
                    >
                      {isSort ? " ⬇️ " : " ⬆️"}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filterCategory?.sort(sortCallback).map((transaction) => {
                return (
                  <tr
                    key={transaction.id}
                    // context menu
                    onContextMenu={(e) => {
                      e.preventDefault();

                      dispatch(
                        setMenuPosition({
                          left: e.pageX + 4,
                          top: e.pageY,
                        })
                      );
                      dispatch(addRowId(transaction.id));
                    }}
                    className={`${transaction.transactionType}`}
                  >
                    <td>
                      {" "}
                      <b>{transaction.title}:</b> {transaction.description}{" "}
                    </td>
                    <td> {transaction.category} </td>
                    <td> {transaction.amount} </td>
                  </tr>
                );
              })}
              <tr>
                <td>
                  <b>Total</b>
                </td>
                <td></td>
                <td>
                  <b> {total} Rs. </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Expense;
