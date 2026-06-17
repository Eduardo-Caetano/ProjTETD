import { X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ManageCategoriesModal({ open, onClose, expenseCategories, incomeTypes, onAddExpense, onAddIncome, onRemoveExpense, onRemoveIncome }) {
  const [newExpenseCategory, setNewExpenseCategory] = useState("");
  const [newIncomeType, setNewIncomeType] = useState("");

  if (!open) {
    return null;
  }

  const handleAddExpense = () => {
    if (newExpenseCategory.trim()) {
      onAddExpense(newExpenseCategory);
      setNewExpenseCategory("");
    }
  };

  const handleAddIncome = () => {
    if (newIncomeType.trim()) {
      onAddIncome(newIncomeType);
      setNewIncomeType("");
    }
  };

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md max-h-96 overflow-y-auto rounded-lg bg-white p-5 shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-ink dark:text-slate-100">Gerenciar categorias</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Categorias de Gasto */}
        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-slate-700 dark:text-slate-300">Categorias de Gasto</h3>
          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={newExpenseCategory}
              onChange={(e) => setNewExpenseCategory(e.target.value)}
              placeholder="Nova categoria..."
              onKeyPress={(e) => e.key === "Enter" && handleAddExpense()}
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="button"
              onClick={handleAddExpense}
              className="rounded-md bg-ocean px-3 py-2 text-white hover:bg-blue-700"
              aria-label="Adicionar categoria"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {expenseCategories.map((category) => (
              <div
                key={category}
                className="flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800 dark:text-slate-200"
              >
                <span className="capitalize">{category}</span>
                <button
                  type="button"
                  onClick={() => onRemoveExpense(category)}
                  className="text-red-600 hover:text-red-700"
                  aria-label="Remover categoria"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tipos de Renda */}
        <div>
          <h3 className="mb-3 font-semibold text-slate-700 dark:text-slate-300">Tipos de Renda</h3>
          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={newIncomeType}
              onChange={(e) => setNewIncomeType(e.target.value)}
              placeholder="Novo tipo..."
              onKeyPress={(e) => e.key === "Enter" && handleAddIncome()}
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="button"
              onClick={handleAddIncome}
              className="rounded-md bg-ocean px-3 py-2 text-white hover:bg-blue-700"
              aria-label="Adicionar tipo"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {incomeTypes.map((type) => (
              <div
                key={type}
                className="flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800 dark:text-slate-200"
              >
                <span className="capitalize">{type}</span>
                <button
                  type="button"
                  onClick={() => onRemoveIncome(type)}
                  className="text-red-600 hover:text-red-700"
                  aria-label="Remover tipo"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
