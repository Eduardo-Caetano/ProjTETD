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

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export default function Dashboard() {
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [drawer, setDrawer] = useState(null);
  const [editingIncome, setEditingIncome] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  const { income, addIncome, updateIncome, deleteIncome, loadIncome } = useIncome();
  const { expenses, addExpense, updateExpense, deleteExpense, loadExpenses } = useExpense();
  const { summary, insights, loadDashboard } = useDashboard();

  const refreshAll = async () => {
    await Promise.all([loadIncome(), loadExpenses(), loadDashboard()]);
  };

  const handleAddIncome = async (payload) => {
    if (editingIncome) {
      await updateIncome(editingIncome.id, { type: payload.type, value: payload.value, description: payload.description });
      setEditingIncome(null);
    } else {
      await addIncome(payload);
    }
    await loadDashboard();
  };

  const handleAddExpense = async (payload) => {
    if (editingExpense) {
      await updateExpense(editingExpense.id, { category: payload.category, value: payload.value, description: payload.description });
      setEditingExpense(null);
    } else {
      await addExpense(payload);
    }
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

  const handleEditIncome = (item) => {
    setEditingIncome(item);
    setIncomeModalOpen(true);
  };

  const handleEditExpense = (item) => {
    setEditingExpense(item);
    setExpenseModalOpen(true);
  };

  const handleCloseIncomeModal = () => {
    setIncomeModalOpen(false);
    setEditingIncome(null);
  };

  const handleCloseExpenseModal = () => {
    setExpenseModalOpen(false);
    setEditingExpense(null);
  };

  const incomeTotal = income.reduce((sum, item) => sum + Number(item.value), 0);
  const expenseTotal = expenses.reduce((sum, item) => sum + Number(item.value), 0);

  const handlePrint = () => {
    const printWindow = window.open("", "print", "height=600,width=800");
    const now = new Date();
    const monthYear = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(now);

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Relatório MoneyScope - ${monthYear}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; padding: 20px; background: white; color: #333; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #0a7fb4; padding-bottom: 15px; }
          .header h1 { font-size: 28px; color: #0a7fb4; margin-bottom: 5px; }
          .header p { color: #666; font-size: 14px; }
          .summary { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 30px; }
          .summary-box { border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; }
          .summary-box.positive { background: #f0fdf4; border-color: #16a34a; }
          .summary-box.negative { background: #fef2f2; border-color: #dc2626; }
          .summary-box.neutral { background: #f8fafc; border-color: #0a7fb4; }
          .summary-box label { display: block; font-size: 12px; color: #666; margin-bottom: 8px; font-weight: bold; text-transform: uppercase; }
          .summary-box .value { font-size: 22px; font-weight: bold; color: #333; }
          .summary-box.positive .value { color: #16a34a; }
          .summary-box.negative .value { color: #dc2626; }
          .summary-box.neutral .value { color: #0a7fb4; }
          .section { margin-bottom: 30px; page-break-inside: avoid; }
          .section-title { font-size: 18px; font-weight: bold; color: #0a7fb4; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          table th { background: #f3f4f6; padding: 10px; text-align: left; font-weight: bold; font-size: 12px; border: 1px solid #ddd; }
          table td { padding: 10px; border: 1px solid #ddd; font-size: 13px; }
          table tr:nth-child(even) { background: #f9fafb; }
          .insights { display: flex; flex-direction: column; gap: 10px; }
          .insight-item { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 4px; font-size: 13px; }
          .total-row { font-weight: bold; background: #f3f4f6; }
          .indicator { display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 8px; vertical-align: middle; }
          .indicator.green { background: #16a34a; }
          .indicator.yellow { background: #eab308; }
          .indicator.red { background: #dc2626; }
          .footer { margin-top: 40px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 15px; }
          @media print { body { padding: 0; } .footer { margin-top: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 MoneyScope</h1>
          <p>Relatório Financeiro - ${monthYear.charAt(0).toUpperCase() + monthYear.slice(1)}</p>
          <p style="font-size: 12px; margin-top: 8px;">Gerado em ${formatDate(now)}</p>
        </div>

        <div class="summary">
          <div class="summary-box positive">
            <label>Total de Receitas</label>
            <div class="value">${formatCurrency(incomeTotal)}</div>
          </div>
          <div class="summary-box negative">
            <label>Total de Despesas</label>
            <div class="value">${formatCurrency(expenseTotal)}</div>
          </div>
          <div class="summary-box ${summary?.indicator === "green" ? "positive" : summary?.indicator === "yellow" ? "negative" : "negative"}">
            <label>Saldo Disponível</label>
            <div class="value">${formatCurrency(summary?.remainingBalance || 0)}</div>
            <div style="font-size: 12px; margin-top: 8px;">
              <span class="indicator ${summary?.indicator || "neutral"}"></span>
              Saúde: <strong>${summary?.indicator === "green" ? "Ótima" : summary?.indicator === "yellow" ? "Atenção" : "Crítica"}</strong>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">💰 Receitas</div>
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Descrição</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              ${income.length > 0 ? income.map(item => `
                <tr>
                  <td>${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</td>
                  <td>${formatCurrency(item.value)}</td>
                  <td>${item.description || "-"}</td>
                  <td>${new Intl.DateTimeFormat("pt-BR").format(new Date(item.createdAt))}</td>
                </tr>
              `).join("") : '<tr><td colspan="4" style="text-align: center; color: #999;">Nenhuma receita registrada</td></tr>'}
              <tr class="total-row">
                <td colspan="1">TOTAL</td>
                <td colspan="3">${formatCurrency(incomeTotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">💸 Despesas</div>
          <table>
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Descrição</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              ${expenses.length > 0 ? expenses.map(item => `
                <tr>
                  <td>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</td>
                  <td>${formatCurrency(item.value)}</td>
                  <td>${item.description || "-"}</td>
                  <td>${new Intl.DateTimeFormat("pt-BR").format(new Date(item.createdAt))}</td>
                </tr>
              `).join("") : '<tr><td colspan="4" style="text-align: center; color: #999;">Nenhuma despesa registrada</td></tr>'}
              <tr class="total-row">
                <td colspan="1">TOTAL</td>
                <td colspan="3">${formatCurrency(expenseTotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        ${insights && insights.length > 0 ? `
          <div class="section">
            <div class="section-title">💡 Insights e Recomendações</div>
            <div class="insights">
              ${insights.map(insight => `<div class="insight-item">• ${insight}</div>`).join("")}
            </div>
          </div>
        ` : ""}

        <div class="footer">
          <p>Relatório gerado automaticamente pelo MoneyScope</p>
          <p style="margin-top: 8px;">Mantenha seus registros financeiros sempre atualizados!</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="min-h-screen">
      <Navbar onPrint={handlePrint} />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <DashboardCards summary={summary} />

        <div className="grid gap-6 lg:grid-cols-2">
          <IncomeChart income={income} onAdd={() => setIncomeModalOpen(true)} onOpenDetails={() => setDrawer("income")} />
          <ExpenseChart expenses={expenses} onAdd={() => setExpenseModalOpen(true)} onOpenDetails={() => setDrawer("expenses")} />
        </div>

        <InsightCards insights={insights} />
      </main>

      <IncomeModal open={incomeModalOpen} onClose={handleCloseIncomeModal} onSubmit={handleAddIncome} editingItem={editingIncome} />
      <ExpenseModal open={expenseModalOpen} onClose={handleCloseExpenseModal} onSubmit={handleAddExpense} editingItem={editingExpense} />

      <DetailsDrawer
        open={drawer === "income"}
        title="Detalhamento de rendas"
        items={income}
        labelKey="type"
        total={incomeTotal}
        onClose={() => setDrawer(null)}
        onEdit={handleEditIncome}
        onDelete={handleDeleteIncome}
      />
      <DetailsDrawer
        open={drawer === "expenses"}
        title="Detalhamento de gastos"
        items={expenses}
        labelKey="category"
        total={expenseTotal}
        onClose={() => setDrawer(null)}
        onEdit={handleEditExpense}
        onDelete={handleDeleteExpense}
      />
    </div>
  );
}
