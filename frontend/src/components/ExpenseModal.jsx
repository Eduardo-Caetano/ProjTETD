import FinanceModal from "./FinanceModal.jsx";
import { expenseCategories } from "../types/options";

export default function ExpenseModal({ open, onClose, onSubmit }) {
  return (
    <FinanceModal
      open={open}
      title="Adicionar gasto"
      labelName="Categoria"
      options={expenseCategories}
      onClose={onClose}
      onSubmit={(payload) => onSubmit({ category: payload.name, value: payload.value, description: payload.description })}
    />
  );
}
