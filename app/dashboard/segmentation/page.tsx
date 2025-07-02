"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { mockUsers } from '@/lib/mock-data';
import {
  Target,
  Users,
  Filter,
  Plus,
  Search,
  MapPin,
  ShoppingCart,
  DollarSign,
  Calendar,
  TrendingUp,
  Mail,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Textarea } from '@/components/ui/textarea';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function SegmentationPage() {
  const [segments, setSegments] = useState([
    {
      id: '1',
      name: 'Premium Customers',
      description: 'High-value customers with multiple purchases',
      criteria: 'Total spent > $500 AND Orders > 5',
      userCount: mockUsers.filter(u => u.segment === 'premium').length,
      color: '#8B5CF6',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Regular Customers',
      description: 'Consistent customers with moderate spending',
      criteria: 'Total spent $100-$500 AND Orders 2-5',
      userCount: mockUsers.filter(u => u.segment === 'regular').length,
      color: '#3B82F6',
      createdAt: new Date('2024-01-10'),
    },
    {
      id: '3',
      name: 'New Customers',
      description: 'Recently registered customers',
      criteria: 'Registration date < 30 days',
      userCount: mockUsers.filter(u => u.segment === 'new').length,
      color: '#10B981',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '4',
      name: 'At-Risk Customers',
      description: 'Customers who haven\'t purchased recently',
      criteria: 'Last order > 90 days ago',
      userCount: mockUsers.filter(u => u.segment === 'churned').length,
      color: '#EF4444',
      createdAt: new Date('2024-01-05'),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredSegments = segments.filter(segment =>
    segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const segmentData = segments.map(segment => ({
    name: segment.name,
    value: segment.userCount,
    color: segment.color,
  }));

  const locationData = [
    { location: 'New York', users: 1250 },
    { location: 'California', users: 980 },
    { location: 'Texas', users: 750 },
    { location: 'Florida', users: 620 },
    { location: 'Illinois', users: 450 },
  ];

  const behaviorData = [
    { behavior: 'High Spenders', users: 234 },
    { behavior: 'Frequent Buyers', users: 567 },
    { behavior: 'Mobile Users', users: 890 },
    { behavior: 'Email Subscribers', users: 1200 },
    { behavior: 'Social Media', users: 678 },
  ];

  const totalUsers = segments.reduce((sum, segment) => sum + segment.userCount, 0);

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
              User Segmentation
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Analyze and target specific customer groups for better engagement
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Segment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Segment</DialogTitle>
                <DialogDescription>
                  Define criteria to create a new customer segment
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Segment name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="criteria" className="text-right">
                    Criteria
                  </Label>
                  <Textarea 
                    id="criteria" 
                    placeholder="e.g., Total spent > $100 AND Orders > 2"
                    className="col-span-3" 
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Create Segment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Segments',
              value: segments.length,
              icon: Target,
              color: 'text-blue-600',
            },
            {
              title: 'Total Users',
              value: totalUsers,
              icon: Users,
              color: 'text-green-600',
            },
            {
              title: 'Premium Users',
              value: segments.find(s => s.name === 'Premium Customers')?.userCount || 0,
              icon: DollarSign,
              color: 'text-purple-600',
            },
            {
              title: 'At-Risk Users',
              value: segments.find(s => s.name === 'At-Risk Customers')?.userCount || 0,
              icon: TrendingUp,
              color: 'text-red-600',
            },
          ].map((stat, index) => (
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Segment Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle>Segment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={segmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {segmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Geographic Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={locationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="location" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search segments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-50/80 dark:bg-gray-800/80"
                  />
                </div>
                
                <Select>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                    <SelectItem value="created">Created Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Segments List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSegments.map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: segment.color }}
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {segment.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {segment.userCount} users
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {segment.description}
                    </p>

                    {/* Criteria */}
                    <div className="p-3 bg-gray-50/80 dark:bg-gray-800/80 rounded-lg">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Criteria
                      </span>
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mt-1">
                        {segment.criteria}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {segment.userCount}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Users
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {((segment.userCount / totalUsers) * 100).toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          of Total
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Created
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {segment.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Campaign
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Users
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Behavior Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle>Behavior Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {behaviorData.map((behavior, index) => (
                  <div
                    key={behavior.behavior}
                    className="p-4 bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80 rounded-lg border border-gray-200/50 dark:border-gray-600/50 text-center"
                  >
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {behavior.users}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {behavior.behavior}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Empty State */}
        {filteredSegments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No segments found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria
            </p>
            <Button variant="outline">Clear Search</Button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}