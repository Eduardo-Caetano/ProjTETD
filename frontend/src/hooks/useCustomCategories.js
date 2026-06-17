import { useEffect, useState } from "react";

const STORAGE_KEY = "moneyscope_custom_categories";

export function useCustomCategories() {
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeTypes, setIncomeTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar categorias customizadas do localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { expenses, income } = JSON.parse(stored);
        setExpenseCategories(expenses || []);
        setIncomeTypes(income || []);
      } catch (e) {
        console.error("Erro ao carregar categorias customizadas:", e);
      }
    }
    setLoading(false);
  }, []);

  const addExpenseCategory = (category) => {
    const normalized = category.trim().toLowerCase();
    if (!expenseCategories.includes(normalized)) {
      const updated = [...expenseCategories, normalized];
      setExpenseCategories(updated);
      saveToStorage(updated, incomeTypes);
    }
  };

  const addIncomeType = (type) => {
    const normalized = type.trim().toLowerCase();
    if (!incomeTypes.includes(normalized)) {
      const updated = [...incomeTypes, normalized];
      setIncomeTypes(updated);
      saveToStorage(expenseCategories, updated);
    }
  };

  const removeExpenseCategory = (category) => {
    const updated = expenseCategories.filter((c) => c !== category);
    setExpenseCategories(updated);
    saveToStorage(updated, incomeTypes);
  };

  const removeIncomeType = (type) => {
    const updated = incomeTypes.filter((t) => t !== type);
    setIncomeTypes(updated);
    saveToStorage(expenseCategories, updated);
  };

  const saveToStorage = (expenses, income) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ expenses, income }));
  };

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setExpenseCategories([]);
    setIncomeTypes([]);
  };

  return {
    expenseCategories,
    incomeTypes,
    loading,
    addExpenseCategory,
    addIncomeType,
    removeExpenseCategory,
    removeIncomeType,
    resetAll,
  };
}
