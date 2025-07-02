"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  BarChart3,
  PieChart,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { format, subDays } from 'date-fns';

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedType, setSelectedType] = useState('all');

  const reports = [
    {
      id: '1',
      name: 'Sales Performance Report',
      description: 'Comprehensive analysis of sales trends and performance metrics',
      type: 'sales',
      period: 'Monthly',
      lastGenerated: subDays(new Date(), 1),
      status: 'completed',
      size: '2.4 MB',
      format: 'PDF',
      metrics: ['Revenue', 'Orders', 'Conversion Rate', 'AOV'],
    },
    {
      id: '2',
      name: 'Customer Analytics Report',
      description: 'Detailed insights into customer behavior and segmentation',
      type: 'customers',
      period: 'Weekly',
      lastGenerated: subDays(new Date(), 3),
      status: 'completed',
      size: '1.8 MB',
      format: 'Excel',
      metrics: ['New Customers', 'Retention Rate', 'CLV', 'Churn Rate'],
    },
    {
      id: '3',
      name: 'Inventory Report',
      description: 'Stock levels, turnover rates, and inventory optimization',
      type: 'inventory',
      period: 'Daily',
      lastGenerated: new Date(),
      status: 'generating',
      size: '1.2 MB',
      format: 'CSV',
      metrics: ['Stock Levels', 'Turnover Rate', 'Low Stock Alerts'],
    },
    {
      id: '4',
      name: 'Financial Summary',
      description: 'Revenue, expenses, and profit analysis',
      type: 'financial',
      period: 'Quarterly',
      lastGenerated: subDays(new Date(), 7),
      status: 'completed',
      size: '3.1 MB',
      format: 'PDF',
      metrics: ['Revenue', 'Expenses', 'Profit Margin', 'Tax Summary'],
    },
    {
      id: '5',
      name: 'Marketing Campaign Report',
      description: 'Campaign performance and ROI analysis',
      type: 'marketing',
      period: 'Monthly',
      lastGenerated: subDays(new Date(), 2),
      status: 'failed',
      size: '0 MB',
      format: 'PDF',
      metrics: ['Campaign ROI', 'Click-through Rate', 'Conversion Rate'],
    },
  ];

  const filteredReports = reports.filter(report => {
    const matchesType = selectedType === 'all' || report.type === selectedType;
    return matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'generating':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'generating':
        return Clock;
      case 'failed':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sales':
        return TrendingUp;
      case 'customers':
        return Users;
      case 'inventory':
        return ShoppingCart;
      case 'financial':
        return DollarSign;
      case 'marketing':
        return BarChart3;
      default:
        return FileText;
    }
  };

  const reportStats = [
    {
      title: 'Total Reports',
      value: reports.length,
      icon: FileText,
      color: 'text-blue-600',
    },
    {
      title: 'Completed',
      value: reports.filter(r => r.status === 'completed').length,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      title: 'Generating',
      value: reports.filter(r => r.status === 'generating').length,
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      title: 'Failed',
      value: reports.filter(r => r.status === 'failed').length,
      icon: AlertCircle,
      color: 'text-red-600',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Generate and manage business reports and analytics
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Generate Custom Report</DialogTitle>
                <DialogDescription>
                  Create a custom report with specific metrics and date range
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reportName" className="text-right">
                    Report Name
                  </Label>
                  <Input id="reportName" placeholder="Custom Report" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reportType" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="customers">Customers</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dateRange" className="text-right">
                    Date Range
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                      <SelectItem value="365">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right mt-2">
                    Metrics
                  </Label>
                  <div className="col-span-3 space-y-2">
                    {['Revenue', 'Orders', 'Customers', 'Conversion Rate', 'AOV', 'Refunds'].map((metric) => (
                      <div key={metric} className="flex items-center space-x-2">
                        <Checkbox id={metric} />
                        <Label htmlFor={metric} className="text-sm">{metric}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="format" className="text-right">
                    Format
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Generate Report
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="customers">Customers</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex-1" />
                
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Custom Date
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report, index) => {
            const StatusIcon = getStatusIcon(report.status);
            const TypeIcon = getTypeIcon(report.type);
            
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30`}>
                          <TypeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {report.name}
                            </h3>
                            <Badge className={getStatusColor(report.status)}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {report.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {report.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                            <span>Period: {report.period}</span>
                            <span>•</span>
                            <span>Size: {report.size}</span>
                            <span>•</span>
                            <span>Format: {report.format}</span>
                            <span>•</span>
                            <span>Last generated: {format(report.lastGenerated, 'MMM dd, yyyy HH:mm')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {report.status === 'completed' && (
                          <>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="w-4 h-4 mr-2" />
                              Email
                            </Button>
                          </>
                        )}
                        {report.status === 'failed' && (
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Retry
                          </Button>
                        )}
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <FileText className="w-4 h-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-2">
                          Metrics:
                        </span>
                        {report.metrics.map((metric) => (
                          <Badge key={metric} variant="outline" className="text-xs">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Scheduled Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Scheduled Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Weekly Sales Summary', schedule: 'Every Monday at 9:00 AM', nextRun: 'Tomorrow at 9:00 AM' },
                  { name: 'Monthly Customer Report', schedule: 'First day of each month', nextRun: 'Dec 1, 2024 at 8:00 AM' },
                  { name: 'Daily Inventory Check', schedule: 'Every day at 6:00 AM', nextRun: 'Tomorrow at 6:00 AM' },
                ].map((scheduled, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80 rounded-lg border border-gray-200/50 dark:border-gray-600/50"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {scheduled.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {scheduled.schedule}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Next run: {scheduled.nextRun}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Disable
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No reports found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your filters or generate a new report
            </p>
            <Button variant="outline">Clear Filters</Button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}