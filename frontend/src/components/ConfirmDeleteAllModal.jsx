import { X, AlertTriangle } from "lucide-react";

export default function ConfirmDeleteAllModal({ open, onClose, onConfirm, isDeleting }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle size={24} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink dark:text-slate-100">Apagar tudo?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Esta ação não pode ser desfeita</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6 rounded-md bg-red-50 p-4 dark:bg-red-950/40">
          <p className="text-sm text-red-800 dark:text-red-200">
            Você está prestes a deletar <strong>todas as receitas e despesas</strong> registradas. 
            Este processo é <strong>irreversível</strong>.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isDeleting ? "Deletando..." : "Deletar tudo"}
          </button>
        </div>
      </div>
    </div>
  );
}
