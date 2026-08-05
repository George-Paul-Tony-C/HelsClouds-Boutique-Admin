// File: src/components/Sidebar.tsx

import {
  LayoutDashboard,
  ShoppingBag,
  Shapes,
  Package,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { signOut } from "@/lib/auth";

interface SidebarProps {
  open: boolean;

  onClose: () => void;
}

const menus = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: ROUTES.DASHBOARD,
  },
  {
    label: "Products",
    icon: ShoppingBag,
    path: ROUTES.PRODUCTS,
  },
  {
    label: "Categories",
    icon: Shapes,
    path: ROUTES.CATEGORIES,
  },
  {
    label: "Orders",
    icon: Package,
    path: ROUTES.ORDERS,
  },
  {
    label: "Settings",
    icon: Settings,
    path: ROUTES.SETTINGS,
  },
];

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut();

      navigate(ROUTES.LOGIN, {
        replace: true,
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {/* Mobile Overlay */}

      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white transition-transform duration-300 lg:translate-x-0 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}

        <div className="flex h-16 items-center justify-between border-b px-6">

          <div>

            <h2 className="text-2xl font-bold">
              HelsClouds
            </h2>

            <p className="text-sm text-slate-500">
              Boutique Admin
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* Menu */}

        <nav className="flex-1 overflow-y-auto p-4">

          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                    isActive
                      ? "bg-black text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />

                {menu.label}
              </NavLink>
            );
          })}

        </nav>

        {/* Logout */}

        <div className="border-t p-4">

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={20} />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
}