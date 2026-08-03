import {
  createBrowserRouter,
} from "react-router-dom";

import ProtectedLayout from "@/components/ProtectedLayout";

import AdminLayout from "@/layouts/AdminLayout";

import Dashboard from "@/pages/Dashboard";
import Categories from "@/pages/Categories";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Orders from "@/pages/Orders";
import Products from "@/pages/Products";
import Settings from "@/pages/Settings";

import { ROUTES } from "@/constants/routes";

export const router =
  createBrowserRouter([
    {
      path: ROUTES.LOGIN,

      element: <Login />,
    },

    {
      element: <ProtectedLayout />,

      children: [
        {
          element: <AdminLayout />,

          children: [
            {
              path: ROUTES.DASHBOARD,

              element:
                <Dashboard />,
            },

            {
              path: ROUTES.PRODUCTS,

              element:
                <Products />,
            },

            {
              path:
                ROUTES.CATEGORIES,

              element:
                <Categories />,
            },

            {
              path: ROUTES.ORDERS,

              element:
                <Orders />,
            },

            {
              path:
                ROUTES.SETTINGS,

              element:
                <Settings />,
            },
          ],
        },
      ],
    },

    {
      path: "*",

      element: <NotFound />,
    },
  ]);