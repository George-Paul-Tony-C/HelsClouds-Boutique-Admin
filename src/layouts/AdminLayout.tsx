// File: src/layouts/AdminLayout.tsx

import { useState } from "react";

import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="lg:ml-64">

        <Header
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="min-h-[calc(100vh-64px)] p-4 md:p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}