import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";

export function useIncome() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadIncome = useCallback(async () => {
    setLoading(true);
    const response = await api.get("/income");
    setIncome(response.data);
    setLoading(false);
  }, []);

  const addIncome = async (payload) => {
    await api.post("/income", payload);
    await loadIncome();
  };

  const deleteIncome = async (id) => {
    await api.delete(`/income/${id}`);
    await loadIncome();
  };

  useEffect(() => {
    loadIncome();
  }, [loadIncome]);

  return { income, loading, loadIncome, addIncome, deleteIncome };
}
