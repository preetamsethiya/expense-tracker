import { useDispatch, useSelector } from "react-redux";
import UseLocalStorage from "../hooks/UseLocalStorage";
import {
  clearRowId,
  selectMenuPosition,
  selectRowId,
  selectTransactions,
  setMenuPosition,
  upDateEditValue,
} from "../store/slices/transaction/transactionSlice";
import { useNavigate } from "react-router";

export default function ContextMenu() {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getLocalStorage, setGetLoacalStorage] = UseLocalStorage(
    "transactions",
    []
  );
  const transactionList = useSelector(selectTransactions);
  const menuPosition = useSelector(selectMenuPosition);
  const rowId = useSelector(selectRowId);
  if (!menuPosition.left) return;

  return (
    <div
      style={{ ...menuPosition, position: "absolute", backgroundColor: "red" }}
    >
      <button
        className="editbtn"
        onClick={() => {
          navigate("/transactionForm");
          const [editValue] = transactionList.filter(
            (transaction) => transaction.id === rowId
          );
          dispatch(upDateEditValue(editValue));
          dispatch(setMenuPosition({}));
        }}
      >
        Edit
      </button>
      <button
        className="deletebtn"
        onClick={() => {
          setGetLoacalStorage(
            transactionList.filter((transaction) => {
              return transaction.id !== rowId;
            })
          );
          dispatch(clearRowId(""));
          dispatch(setMenuPosition({}));
        }}
      >
        Delete
      </button>
    </div>
  );
}
