import FinanceModal from "./FinanceModal.jsx";
import { expenseCategories } from "../types/options";

export default function ExpenseModal({ open, onClose, onSubmit, editingItem }) {
  return (
    <FinanceModal
      open={open}
      title={editingItem ? "Editar gasto" : "Adicionar gasto"}
      labelName="Categoria"
      options={expenseCategories}
      onClose={onClose}
      onSubmit={(payload) => onSubmit({ id: payload.id, category: payload.name, value: payload.value, description: payload.description })}
      editingItem={editingItem}
    />
  );
}
