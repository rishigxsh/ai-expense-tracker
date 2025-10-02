import React from 'react';

// Table skeleton loader
export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="animate-pulse">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
        </div>
        
        {/* Rows */}
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex gap-4 py-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Chart skeleton loader
export function ChartSkeleton({ height = "320px" }) {
  return (
    <div className="animate-pulse flex items-end justify-center gap-2" style={{ height }}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 dark:bg-gray-700 rounded-t w-12"
          style={{ height: `${Math.random() * 60 + 40}%` }}
        ></div>
      ))}
    </div>
  );
}

// Card skeleton loader
export function CardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}

// Pie chart skeleton
export function PieChartSkeleton() {
  return (
    <div className="animate-pulse flex items-center justify-center h-64">
      <div className="w-48 h-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );
}

export default {
  TableSkeleton,
  ChartSkeleton,
  CardSkeleton,
  PieChartSkeleton
};
