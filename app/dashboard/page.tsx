"use client";

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { StatsCard } from '@/components/dashboard/stats-card';
import { mockStats, mockAIInsights, generateSparklineData } from '@/lib/mock-data';
import {
  ShoppingCart,
  Users,
  DollarSign,
  RefreshCcw,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Target,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const statsData = [
  {
    title: 'Total Orders',
    value: mockStats.totalOrders,
    change: mockStats.ordersGrowth,
    icon: ShoppingCart,
  },
  {
    title: 'Total Users',
    value: mockStats.totalUsers,
    change: mockStats.usersGrowth,
    icon: Users,
  },
  {
    title: 'Total Revenue',
    value: `$${mockStats.totalRevenue.toLocaleString()}`,
    change: mockStats.revenueGrowth,
    icon: DollarSign,
  },
  {
    title: 'Refunds',
    value: `$${mockStats.totalRefunds.toLocaleString()}`,
    change: mockStats.refundsGrowth,
    icon: RefreshCcw,
  },
];

const getInsightIcon = (type: string) => {
  switch (type) {
    case 'recommendation':
      return Lightbulb;
    case 'alert':
      return AlertTriangle;
    case 'prediction':
      return TrendingUp;
    case 'optimization':
      return Target;
    default:
      return Lightbulb;
  }
};

const getInsightColor = (impact: string) => {
  switch (impact) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's what's happening with your store today.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            View Full Report
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatsCard
              key={stat.title}
              {...stat}
              index={index}
              sparklineData={generateSparklineData()}
            />
          ))}
        </div>

        {/* AI Insights */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span>AI Insights & Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockAIInsights.slice(0, 4).map((insight, index) => {
                const Icon = getInsightIcon(insight.type);
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80 rounded-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                            {insight.title}
                          </h4>
                          <Badge className={getInsightColor(insight.impact)}>
                            {insight.impact}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                          {insight.description}
                        </p>
                        {insight.actionable && (
                          <Button size="sm" variant="outline" className="text-xs">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Add Product', icon: '📦', href: '/dashboard/products' },
                { title: 'View Orders', icon: '🛒', href: '/dashboard/orders' },
                { title: 'Create Coupon', icon: '🎫', href: '/dashboard/coupons' },
                { title: 'User Analytics', icon: '📊', href: '/dashboard/analytics' },
              ].map((action, index) => (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80 rounded-lg border border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {action.title}
                  </div>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}