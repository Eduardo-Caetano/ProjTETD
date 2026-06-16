import { ArrowDownCircle, ArrowUpCircle, Gauge, PiggyBank } from "lucide-react";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const indicatorStyles = {
  green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  yellow: "bg-amber-100 text-amber-700 border-amber-200",
  red: "bg-red-100 text-red-700 border-red-200"
};

export default function DashboardCards({ summary }) {
  const data = summary || {
    totalIncome: 0,
    totalExpenses: 0,
    remainingBalance: 0,
    committedPercentage: 0,
    indicator: "green"
  };

  const cards = [
    { label: "Renda total", value: currency.format(data.totalIncome), icon: ArrowUpCircle, color: "text-ocean" },
    { label: "Gastos totais", value: currency.format(data.totalExpenses), icon: ArrowDownCircle, color: "text-coral" },
    { label: "Saldo restante", value: currency.format(data.remainingBalance), icon: PiggyBank, color: "text-blue-700" },
    { label: "Comprometido", value: `${Number(data.committedPercentage).toFixed(2)}%`, icon: Gauge, color: "text-amber" }
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article key={card.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <strong className="mt-2 block text-2xl font-semibold text-ink">{card.value}</strong>
              </div>
              <Icon className={card.color} size={26} />
            </div>
            {card.label === "Comprometido" && (
              <span className={`mt-4 inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${indicatorStyles[data.indicator]}`}>
                {data.indicator === "green" ? "Saudável" : data.indicator === "yellow" ? "Atenção" : "Crítico"}
              </span>
            )}
          </article>
        );
      })}
    </section>
  );
}
