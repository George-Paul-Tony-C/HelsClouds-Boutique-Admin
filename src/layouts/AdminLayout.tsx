import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}