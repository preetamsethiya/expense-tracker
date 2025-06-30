import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    transactionField: {
      transactionType: "",
      title: "",
      category: "",
      amount: "",
      description: "",
    },
    menuPosition: {},
    rowId: undefined,
  },
  reducers: {
    addTransaction(state, action) {
      state.transactions = action.payload;
    },

    // transactionField

    upDateTransactionData(state, action) {
      const { name, value } = action.payload;
      state.transactionField = { ...state.transactionField, [name]: value };
    },

    upDateEditValue(state, action) {
      state.transactionField = action.payload;
    },
    clearTransactionData(state) {
      Object.keys(state.transactionField).map((key) => {
        state.transactionField = { ...state.transactionField, [key]: "" };
      });
    },

    //  menuPosition
    setMenuPosition(state, action) {
      state.menuPosition = action.payload;
    },

    // rowId
    addRowId(state, action) {
      state.rowId = action.payload;
    },
    clearRowId(state, action) {
      state.rowId = action.payload;
    },
  },
});

export const selectTransactionField = (state) => state.transactionField;
export const selectTransactions = (state) => state.transactions;
export const selectMenuPosition = (state) => state.menuPosition;
export const selectRowId = (state) => state.rowId;

export const {
  addTransaction,
  upDateTransactionData,
  upDateEditValue,
  clearTransactionData,
  setMenuPosition,
  addRowId,
  clearRowId,
} = transactionSlice.actions;

export default transactionSlice.reducer;
