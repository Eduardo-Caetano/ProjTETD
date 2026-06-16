import FinanceChart from "./FinanceChart.jsx";

export default function ExpenseChart({ expenses, onAdd, onOpenDetails }) {
  return (
    <FinanceChart
      title="Gastos"
      items={expenses}
      nameKey="category"
      actionLabel="Adicionar gasto"
      onAdd={onAdd}
      onOpenDetails={onOpenDetails}
    />
  );
}
