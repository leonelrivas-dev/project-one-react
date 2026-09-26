interface HeaderProps {
  onLogout: () => Promise<void>;
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-[#e8e8f0] bg-white px-6 lg:px-8">
      <div>
        <p className="text-sm text-[#8a8da8]">Administración</p>
        <h1 className="text-lg font-bold text-[#11175f]">Invítame</h1>
      </div>

      <button
        type="button"
        onClick={() => void onLogout()}
        className="rounded-xl px-4 py-2 text-sm font-semibold text-[#5428e5] transition-colors hover:bg-[#5428e5]/5"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
