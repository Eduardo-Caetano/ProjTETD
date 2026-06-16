import FinanceModal from "./FinanceModal.jsx";
import { incomeTypes } from "../types/options";

export default function IncomeModal({ open, onClose, onSubmit }) {
  return (
    <FinanceModal
      open={open}
      title="Adicionar renda"
      labelName="Tipo"
      options={incomeTypes}
      onClose={onClose}
      onSubmit={(payload) => onSubmit({ type: payload.name, value: payload.value, description: payload.description })}
    />
  );
}
