import React from 'react';
import { TableSkeleton } from './SkeletonLoader';

function ExpenseList({ expenses, onDeleteExpense, loading = false }) {
  // Format date from ISO to readable format (e.g., "Sep 29, 2025")
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Format amount with $ and 2 decimal places
  const formatAmount = (amount) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  // Get category icon and color
  const getCategoryInfo = (category) => {
    const categoryMap = {
      'Food': { icon: '🍔', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' },
      'Transportation': { icon: '🚗', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
      'Entertainment': { icon: '🎬', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' },
      'Utilities': { icon: '💡', color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' },
      'Healthcare': { icon: '🏥', color: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' },
      'Shopping': { icon: '🛍️', color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400' },
      'Grocery': { icon: '🛒', color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' },
      'Other': { icon: '❓', color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' }
    };
    return categoryMap[category] || categoryMap['Other'];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 animate-fade-in transition-colors duration-200">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Expenses</h2>
      </div>
      
      {loading ? (
        <TableSkeleton rows={5} />
      ) : !expenses || expenses.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">No expenses yet</p>
          <p className="text-gray-400 text-sm mt-1">Add your first expense to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300 text-sm rounded-tl-lg">Date</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300 text-sm">Category</th>
                <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300 text-sm">Description</th>
                <th className="text-right py-3 px-4 font-bold text-gray-700 dark:text-gray-300 text-sm">Amount</th>
                <th className="text-center py-3 px-4 font-bold text-gray-700 dark:text-gray-300 text-sm rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => {
                const categoryInfo = getCategoryInfo(expense.category);
                return (
                  <tr 
                    key={expense.id} 
                    className={`border-b border-gray-100 dark:border-gray-700 transition-all duration-200 ${
                      index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-700/30' : 'bg-white dark:bg-gray-800'
                    } hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-[1.01]`}
                  >
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300 text-sm">
                      {formatDate(expense.date)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{categoryInfo.icon}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{expense.category}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300 text-sm">
                      {expense.description}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatAmount(expense.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => onDeleteExpense(expense.id)}
                        className="inline-flex w-8 h-8 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-lg items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                        title="Remove Expense"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
