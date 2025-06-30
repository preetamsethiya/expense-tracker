import "./App.css";
import { Route, Routes } from "react-router";
import Expense from "./Components/Expense";
import TransactionForm from "./components/pages/TransactionForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Expense />} />
        <Route path="/transactionform" element={<TransactionForm />} />
      </Routes>
    </>
  );
}

export default App;
