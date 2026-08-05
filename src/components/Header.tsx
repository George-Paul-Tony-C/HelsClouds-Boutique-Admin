// File: src/components/Header.tsx

import {
  Bell,
  Menu,
  UserCircle2,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">

      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>

          <h1 className="text-lg font-bold">
            HelsClouds Boutique
          </h1>

          <p className="hidden text-sm text-slate-500 sm:block">
            Admin Dashboard
          </p>

        </div>

      </div>

      <div className="flex items-center gap-3">

        <button className="rounded-lg p-2 transition hover:bg-slate-100">
          <Bell
            size={20}
            className="text-slate-600"
          />
        </button>

        <button className="rounded-full transition hover:opacity-80">
          <UserCircle2
            size={36}
            className="text-slate-700"
          />
        </button>

      </div>

    </header>
  );
}