import { Lightbulb } from "lucide-react";

export default function InsightCards({ insights }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="text-amber" size={22} />
        <h2 className="text-lg font-semibold text-ink">Insights automáticos</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {insights.map((insight) => (
          <article key={insight} className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
            {insight}
          </article>
        ))}
      </div>
    </section>
  );
}
