import React from 'react';
import { CardSkeleton } from './SkeletonLoader';

function ExpenseSummary({ expenses = [], limit = 0, loading = false }) {
  // Calculate the sum of all expense amounts
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate percentage of limit used
  const percentage = limit > 0 ? Math.min((total / limit) * 100, 100) : 0;
  
  // Determine status color based on percentage
  const getStatusColor = () => {
    if (percentage >= 90) return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800';
    if (percentage >= 75) return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200 dark:border-orange-800';
    return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800';
  };

  const getProgressColor = () => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    return 'bg-green-500';
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 animate-fade-in transition-colors duration-200">
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 animate-fade-in transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Spend Summary</h2>
        </div>
        {percentage >= 75 && (
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
            {percentage >= 90 ? '⚠️ Over Limit' : '⚠️ Near Limit'}
          </div>
        )}
      </div>

      {/* Total Spent */}
      <div className="mb-6">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">total spent</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {expenses.length} {expenses.length === 1 ? 'transaction' : 'transactions'} this month
        </p>
      </div>

      {/* Monthly Limit Progress */}
      {limit > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Limit</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ${total.toFixed(2)} / ${limit.toFixed(2)}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {percentage.toFixed(1)}% of limit used
            </span>
            {percentage < 100 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ${(limit - total).toFixed(2)} remaining
              </span>
            )}
          </div>
        </div>
      )}

      {/* No Limit Set */}
      {limit === 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">No spending limit set</span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Set a monthly limit to track your spending goals
          </p>
        </div>
      )}
    </div>
  );
}

export default ExpenseSummary;
