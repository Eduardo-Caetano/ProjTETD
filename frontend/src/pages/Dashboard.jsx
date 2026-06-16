import { useState } from "react";
import DashboardCards from "../components/DashboardCards.jsx";
import DetailsDrawer from "../components/DetailsDrawer.jsx";
import ExpenseChart from "../components/ExpenseChart.jsx";
import ExpenseModal from "../components/ExpenseModal.jsx";
import IncomeChart from "../components/IncomeChart.jsx";
import IncomeModal from "../components/IncomeModal.jsx";
import InsightCards from "../components/InsightCards.jsx";
import Navbar from "../components/Navbar.jsx";
import { useDashboard } from "../hooks/useDashboard";
import { useExpense } from "../hooks/useExpense";
import { useIncome } from "../hooks/useIncome";

export default function Dashboard() {
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [drawer, setDrawer] = useState(null);

  const { income, addIncome, deleteIncome, loadIncome } = useIncome();
  const { expenses, addExpense, deleteExpense, loadExpenses } = useExpense();
  const { summary, insights, loadDashboard } = useDashboard();

  const refreshAll = async () => {
    await Promise.all([loadIncome(), loadExpenses(), loadDashboard()]);
  };

  const handleAddIncome = async (payload) => {
    await addIncome(payload);
    await loadDashboard();
  };

  const handleAddExpense = async (payload) => {
    await addExpense(payload);
    await loadDashboard();
  };

  const handleDeleteIncome = async (id) => {
    await deleteIncome(id);
    await refreshAll();
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    await refreshAll();
  };

  const incomeTotal = income.reduce((sum, item) => sum + Number(item.value), 0);
  const expenseTotal = expenses.reduce((sum, item) => sum + Number(item.value), 0);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <DashboardCards summary={summary} />

        <div className="grid gap-6 lg:grid-cols-2">
          <IncomeChart income={income} onAdd={() => setIncomeModalOpen(true)} onOpenDetails={() => setDrawer("income")} />
          <ExpenseChart expenses={expenses} onAdd={() => setExpenseModalOpen(true)} onOpenDetails={() => setDrawer("expenses")} />
        </div>

        <InsightCards insights={insights} />
      </main>

      <IncomeModal open={incomeModalOpen} onClose={() => setIncomeModalOpen(false)} onSubmit={handleAddIncome} />
      <ExpenseModal open={expenseModalOpen} onClose={() => setExpenseModalOpen(false)} onSubmit={handleAddExpense} />

      <DetailsDrawer
        open={drawer === "income"}
        title="Detalhamento de rendas"
        items={income}
        labelKey="type"
        total={incomeTotal}
        onClose={() => setDrawer(null)}
        onDelete={handleDeleteIncome}
      />
      <DetailsDrawer
        open={drawer === "expenses"}
        title="Detalhamento de gastos"
        items={expenses}
        labelKey="category"
        total={expenseTotal}
        onClose={() => setDrawer(null)}
        onDelete={handleDeleteExpense}
      />
    </div>
  );
}
