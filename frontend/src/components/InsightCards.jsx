import { Lightbulb } from "lucide-react";

export default function InsightCards({ insights }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="text-amber" size={22} />
        <h2 className="text-lg font-semibold text-ink dark:text-slate-100">Insights automáticos</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {insights.map((insight) => (
          <article key={insight} className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
            {insight}
          </article>
        ))}
      </div>
    </section>
  );
}
