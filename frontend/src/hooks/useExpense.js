import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";

export function useExpense() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    const response = await api.get("/expenses");
    setExpenses(response.data);
    setLoading(false);
  }, []);

  const addExpense = async (payload) => {
    await api.post("/expenses", payload);
    await loadExpenses();
  };

  const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
    await loadExpenses();
  };

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  return { expenses, loading, loadExpenses, addExpense, deleteExpense };
}
