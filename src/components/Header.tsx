import { Bell, UserCircle2 } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-lg font-semibold">
        HelsClouds Boutique Admin
      </h1>

      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5 text-gray-600" />

        <UserCircle2 className="h-8 w-8 text-gray-700" />
      </div>
    </header>
  );
}