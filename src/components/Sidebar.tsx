import {
  LayoutDashboard,
  ShoppingBag,
  Shapes,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { signOut } from "@/lib/auth";

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

export default function Sidebar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut();

      navigate(ROUTES.LOGIN, { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <aside className="flex w-64 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">
          HelsClouds
        </h2>

        <p className="text-sm text-gray-500">
          Boutique Admin
        </p>
      </div>

      <nav className="flex-1 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              <span>{menu.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}