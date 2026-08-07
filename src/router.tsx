// File: src/router.tsx

import {
  createBrowserRouter,
} from "react-router-dom";

import ProtectedLayout from "@/components/ProtectedLayout";

import AdminLayout from "@/layouts/AdminLayout";

import { ROUTES } from "@/constants/routes";

import Dashboard from "@/pages/Dashboard";

import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

import Products from "@/pages/Products";
import ProductCreate from "@/pages/ProductCreate";
import ProductEdit from "@/pages/ProductEdit";
import ProductDetails from "@/pages/ProductDetails";

import Categories from "@/pages/Categories";
import CategoryCreate from "@/pages/CategoryCreate";
import CategoryEdit from "@/pages/CategoryEdit";

import Orders from "@/pages/Orders";
import OrderDetails from "@/pages/OrderDetails";

import Settings from "@/pages/Settings";

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

            /*
             * Products
             */

            {
              path: ROUTES.PRODUCTS,

              element: <Products />,
            },

            {
              path: ROUTES.PRODUCT_CREATE,

              element: <ProductCreate />,
            },

            {
              path: ROUTES.PRODUCT_DETAILS,

              element: <ProductDetails />,
            },

            {
              path: ROUTES.PRODUCT_EDIT,

              element: <ProductEdit />,
            },

            /*
             * Categories
             */

            {
              path: ROUTES.CATEGORIES,

              element: <Categories />,
            },

            {
              path: ROUTES.CATEGORY_CREATE,

              element: <CategoryCreate />,
            },

            {
              path: ROUTES.CATEGORY_EDIT,

              element: <CategoryEdit />,
            },

            /*
             * Orders
             */

            {
              path: ROUTES.ORDERS,

              element: <Orders />,
            },

            {
              path: ROUTES.ORDER_DETAILS,

              element: <OrderDetails />,
            },

            /*
             * Settings
             */

            {
              path: ROUTES.SETTINGS,

              element: <Settings />,
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