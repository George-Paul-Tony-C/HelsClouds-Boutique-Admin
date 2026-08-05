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
import ProductCreate from "@/pages/ProductCreate";
import ProductEdit from "@/pages/ProductEdit";
import Settings from "@/pages/Settings";

import { ROUTES } from "@/constants/routes";
import CategoryCreate from "./pages/CategoryCreate";
import CategoryEdit from "./pages/CategoryEdit";

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

              element: <Dashboard />,
            },

            {
              path: ROUTES.PRODUCTS,

              element: <Products />,
            },

            {
              path: ROUTES.PRODUCT_CREATE,

              element: <ProductCreate />,
            },

            {
              path: ROUTES.PRODUCT_EDIT,

              element: <ProductEdit />,
            },

            {
              path: ROUTES.CATEGORIES,

              element: <Categories />,
            },

            {
              path: ROUTES.ORDERS,

              element: <Orders />,
            },

            {
              path: ROUTES.SETTINGS,

              element: <Settings />,
            },
            {
              path: ROUTES.CATEGORY_CREATE,
              element: <CategoryCreate />,
            },

            {
              path: ROUTES.CATEGORY_EDIT,
              element: <CategoryEdit />,
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