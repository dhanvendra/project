export interface DashboardStats {
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  totalRefunds: number;
  ordersGrowth: number;
  usersGrowth: number;
  revenueGrowth: number;
  refundsGrowth: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  stock: number;
  image: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: Date;
  updatedAt: Date;
  sales: number;
  rating: number;
  reviewCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'customer' | 'manager';
  status: 'active' | 'inactive' | 'banned';
  registrationDate: Date;
  lastLogin: Date;
  totalOrders: number;
  totalSpent: number;
  location: string;
  segment: 'premium' | 'regular' | 'new' | 'churned';
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minimumAmount?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  expirationDate: Date;
  status: 'active' | 'inactive' | 'expired';
  applicableProducts?: string[];
  applicableCategories?: string[];
  createdAt: Date;
}

export interface AnalyticsData {
  salesTrend: {
    date: string;
    sales: number;
    orders: number;
  }[];
  revenueByCategory: {
    category: string;
    revenue: number;
    percentage: number;
  }[];
  userGrowth: {
    month: string;
    newUsers: number;
    activeUsers: number;
  }[];
  topProducts: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }[];
}

export interface AIInsight {
  id: string;
  type: 'recommendation' | 'alert' | 'prediction' | 'optimization';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'sales' | 'inventory' | 'marketing' | 'customer';
  actionable: boolean;
  createdAt: Date;
  data?: any;
}