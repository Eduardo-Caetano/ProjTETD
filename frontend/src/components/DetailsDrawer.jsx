import { Trash2, X, Edit2 } from "lucide-react";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function DetailsDrawer({ open, title, items, labelKey, total, onClose, onDelete, onEdit }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 bg-slate-950/40" onClick={onClose}>
      <aside className="ml-auto flex h-full w-full max-w-xl flex-col bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            <p className="text-sm text-slate-500">Total: {currency.format(total)}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-2 text-slate-500 hover:bg-slate-100" aria-label="Fechar detalhes">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhum lançamento para exibir.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const percentage = total <= 0 ? 0 : (Number(item.value) / total) * 100;
                return (
                  <article key={item.id} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold capitalize text-ink">{item[labelKey]}</h3>
                        <p className="text-sm text-slate-500">{item.description || "Sem descrição"}</p>
                      </div>
                      <div className="flex gap-2">
                        {onEdit && (
                          <button
                            type="button"
                            onClick={() => onEdit(item)}
                            className="rounded-md p-2 text-blue-600 hover:bg-blue-50"
                            aria-label="Editar lançamento"
                          >
                            <Edit2 size={18} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onDelete(item.id)}
                          className="rounded-md p-2 text-red-600 hover:bg-red-50"
                          aria-label="Excluir lançamento"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                      <span className="rounded-md bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">{currency.format(item.value)}</span>
                      <span className="rounded-md bg-ocean/10 px-2.5 py-1 font-semibold text-ocean">{percentage.toFixed(2)}%</span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
