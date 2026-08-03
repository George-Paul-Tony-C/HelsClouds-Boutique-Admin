// File: src/types/dashboard.ts

export interface DashboardCounts {
  totalProducts: number;

  totalCategories: number;

  totalCustomers: number;

  totalOrders: number;

  pendingOrders: number;
}

export interface DashboardAnalytics {
  today: number;

  week: number;

  month: number;

  year: number;
}

export interface RecentOrder {
  id: string;

  order_number: string;

  customer_name: string;

  total: number;

  status: string;

  created_at: string;
}

export interface TopProduct {
  product_id: string;

  product_name: string;

  product_code: string;

  featured_image_url: string | null;

  quantity_sold: number;

  revenue: number;

  profit: number;
}

export interface TopCategory {
  category_id: string;

  category_name: string;

  quantity_sold: number;

  revenue: number;
}

export interface DashboardData {
  counts: DashboardCounts;

  revenue: DashboardAnalytics;

  profit: DashboardAnalytics;

  recentOrders: RecentOrder[];

  topProducts: TopProduct[];

  topCategories: TopCategory[];
}