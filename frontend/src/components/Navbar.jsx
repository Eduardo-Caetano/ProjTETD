import { WalletCards, Printer, Trash2, Settings } from "lucide-react";

export default function Navbar({ onPrint, onDeleteAll, onManageCategories }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-ocean text-white">
            <WalletCards size={22} />
          </span>
          <div>
            <h1 className="text-xl font-semibold tracking-normal text-ink">MoneyScope</h1>
            <p className="text-sm text-slate-500">Controle financeiro pessoal</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onManageCategories && (
            <button
              onClick={onManageCategories}
              className="flex items-center gap-2 rounded-lg bg-slate-200 px-3 py-2 text-slate-700 hover:bg-slate-300 transition-colors"
              title="Gerenciar categorias"
            >
              <Settings size={18} />
              <span className="hidden sm:inline text-sm">Categorias</span>
            </button>
          )}
          {onPrint && (
            <button
              onClick={onPrint}
              className="flex items-center gap-2 rounded-lg bg-ocean px-3 py-2 text-white hover:bg-blue-700 transition-colors"
              title="Imprimir relatório mensal"
            >
              <Printer size={18} />
              <span className="hidden sm:inline text-sm">Imprimir</span>
            </button>
          )}
          {onDeleteAll && (
            <button
              onClick={onDeleteAll}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700 transition-colors"
              title="Apagar todas as entradas"
            >
              <Trash2 size={18} />
              <span className="hidden sm:inline text-sm">Limpar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
