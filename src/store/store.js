import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slices/transaction/transactionSlice";

export const store = configureStore({
  reducer: transactionReducer,
});
