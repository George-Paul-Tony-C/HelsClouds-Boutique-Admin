export const ROUTES = {
  LOGIN: "/login",

  DASHBOARD: "/",

  PRODUCTS: "/products",
  PRODUCT_CREATE: "/products/new",
  PRODUCT_EDIT: "/products/:id/edit",

  CATEGORIES: "/categories",
  CATEGORY_CREATE: "/categories/new",
  CATEGORY_EDIT: "/categories/:id/edit",

  ORDERS: "/orders",

  SETTINGS: "/settings",
} as const;