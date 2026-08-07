export const ROUTES = {
  LOGIN: "/login",

  DASHBOARD: "/",

  PRODUCTS: "/products",
  PRODUCT_CREATE: "/products/new",
  PRODUCT_EDIT: "/products/:id/edit",
  PRODUCT_DETAILS:"/products/:id",

  CATEGORIES: "/categories",
  CATEGORY_CREATE: "/categories/new",
  CATEGORY_EDIT: "/categories/:id/edit",

  ORDERS: "/orders",
  ORDER_DETAILS:"/orders/:id",

  SETTINGS: "/settings",
} as const;