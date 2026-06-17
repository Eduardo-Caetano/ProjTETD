import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function FinanceModal({ open, title, labelName, options, onClose, onSubmit, editingItem }) {
  const [form, setForm] = useState({ name: options[0], value: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingItem) {
      setForm({
        name: editingItem[labelName === "Tipo" ? "type" : "category"],
        value: editingItem.value.toString(),
        description: editingItem.description || "",
      });
    } else {
      setForm({ name: options[0], value: "", description: "" });
    }
  }, [editingItem, labelName, options]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await onSubmit({
        id: editingItem?.id,
        name: form.name,
        value: Number(form.value),
        description: form.description.trim() || null
      });
      setForm({ name: options[0], value: "", description: "" });
      onClose();
    } catch (requestError) {
      const message =
        requestError?.response?.data?.title ||
        requestError?.response?.data?.message ||
        "Não foi possível salvar. Verifique se o backend está rodando em http://localhost:10000.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/50 p-4" onClick={onClose}>
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-ink dark:text-slate-100">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" aria-label="Fechar modal">
            <X size={20} />
          </button>
        </div>

        <label className="mb-4 block">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{labelName}</span>
          <select
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            required
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="mb-4 block">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Valor</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={form.value}
            onChange={(event) => setForm((current) => ({ ...current, value: event.target.value }))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            required
          />
        </label>

        <label className="mb-5 block">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Descrição</span>
          <textarea
            value={form.description}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            rows="3"
            className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </label>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            Cancelar
          </button>
          <button type="submit" disabled={saving} className="rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {saving ? "Salvando..." : editingItem ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
