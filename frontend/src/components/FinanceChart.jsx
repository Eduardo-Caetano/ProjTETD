import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { chartColors } from "../types/options";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function groupItems(items, keyName) {
  const totals = items.reduce((acc, item) => {
    const name = item[keyName];
    acc[name] = (acc[name] || 0) + Number(item.value);
    return acc;
  }, {});

  return Object.entries(totals).map(([name, value]) => ({ name, value }));
}

export default function FinanceChart({ title, items, nameKey, actionLabel, onAdd, onOpenDetails }) {
  const data = groupItems(items, nameKey);
  const total = items.reduce((sum, item) => sum + Number(item.value), 0);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink dark:text-slate-100">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{items.length} lançamento(s)</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-teal-600 dark:hover:bg-teal-500"
        >
          {actionLabel}
        </button>
      </div>

      <button
        type="button"
        onClick={onOpenDetails}
        className="relative h-72 w-full rounded-md border border-slate-100 bg-slate-50 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
        aria-label={`Abrir detalhes de ${title}`}
      >
        {data.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={72} outerRadius={106} paddingAngle={2}>
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => currency.format(value)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center">
                <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Total</span>
                <strong className="block text-xl text-ink dark:text-slate-100">{currency.format(total)}</strong>
              </div>
            </div>
          </>
        ) : (
          <div className="grid h-full place-items-center px-4 text-center text-sm text-slate-500 dark:text-slate-400">
            Nenhum lançamento cadastrado.
          </div>
        )}
      </button>
    </section>
  );
}
