import FinanceChart from "./FinanceChart.jsx";

export default function IncomeChart({ income, onAdd, onOpenDetails }) {
  return (
    <FinanceChart
      title="Rendas"
      items={income}
      nameKey="type"
      actionLabel="Adicionar renda"
      onAdd={onAdd}
      onOpenDetails={onOpenDetails}
    />
  );
}
