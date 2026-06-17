import FinanceModal from "./FinanceModal.jsx";
import { incomeTypes } from "../types/options";

export default function IncomeModal({ open, onClose, onSubmit, editingItem }) {
  return (
    <FinanceModal
      open={open}
      title={editingItem ? "Editar renda" : "Adicionar renda"}
      labelName="Tipo"
      options={incomeTypes}
      onClose={onClose}
      onSubmit={(payload) => onSubmit({ id: payload.id, type: payload.name, value: payload.value, description: payload.description })}
      editingItem={editingItem}
    />
  );
}
