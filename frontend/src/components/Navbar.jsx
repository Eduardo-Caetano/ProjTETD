import { WalletCards } from "lucide-react";

export default function Navbar() {
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
      </div>
    </header>
  );
}
