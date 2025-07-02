"use client";

import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  index: number;
  sparklineData?: { date: Date; value: number }[];
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  index,
  sparklineData = [] 
}: StatsCardProps) {
  const isPositive = change > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative group"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20 shadow-xl">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={cn(
              "p-3 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110",
              "bg-gradient-to-br from-blue-500 to-purple-600"
            )}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            
            {/* Mini Sparkline */}
            {sparklineData.length > 0 && (
              <div className="flex items-end space-x-0.5 h-8">
                {sparklineData.slice(-7).map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${(point.value / Math.max(...sparklineData.map(d => d.value))) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full opacity-60"
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            
            <div className="flex items-center space-x-2">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  isPositive
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {isPositive ? '+' : ''}{change}%
              </motion.span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                vs last month
              </span>
            </div>
          </div>
        </CardContent>
        
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-full transition-all duration-700"
          style={{ transform: 'skewX(-25deg)' }}
        />
      </Card>
    </motion.div>
  );
}