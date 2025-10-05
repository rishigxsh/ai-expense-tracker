import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';

function SpendLimit({ expenses = [], limit: limitProp = 0 }) {
  const { currentUser } = useAuth();
  const [limit, setLimit] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Sync incoming prop into local state for calculations/UI
  useEffect(() => {
    setLimit(typeof limitProp === 'number' ? limitProp : 0);
  }, [limitProp]);

  // Calculate total spent from all expenses
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate remaining budget and percentage used
  const remaining = limit - totalSpent;
  const percentUsed = limit > 0 ? (totalSpent / limit) * 100 : 0;

  // Determine alert status and message
  const getAlertStatus = () => {
    if (limit <= 0) {
      return {
        message: "No limit set.",
        colorClass: "text-gray-500 font-medium",
        progressColor: "bg-gray-400"
      };
    }
    
    if (remaining < 0) {
      return {
        message: `Over limit by $${Math.abs(remaining).toFixed(2)}!`,
        colorClass: "text-red-600 font-bold",
        progressColor: "bg-red-500"
      };
    }
    
    if (percentUsed >= 80) {
      return {
        message: `Warning: You are close to your limit. Remaining: $${remaining.toFixed(2)}`,
        colorClass: "text-yellow-600 font-medium",
        progressColor: "bg-yellow-500"
      };
    }
    
    return {
      message: `You are on track. Remaining: $${remaining.toFixed(2)}`,
      colorClass: "text-green-600 font-medium",
      progressColor: "bg-green-500"
    };
  };

  const alertStatus = getAlertStatus();

  // Handle setting/updating the limit
  const handleSetLimit = async () => {
    const newLimit = parseFloat(inputValue);
    if (isNaN(newLimit) || newLimit < 0) {
      alert('Please enter a valid positive number');
      return;
    }
    if (!currentUser) return;
    try {
      const limitRef = doc(db, 'users', currentUser.uid, 'limit', 'limit');
      await setDoc(limitRef, { value: newLimit }, { merge: true });
      setLimit(newLimit);
      setInputValue('');
    } catch (error) {
      console.error('Error saving limit:', error);
      alert('Failed to save limit.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl transition-all duration-200 hover:shadow-2xl">
      {/* Header with Icon */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Monthly Budget
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Track your spending limit</p>
          </div>
        </div>
      </div>

      {/* Input Section - Modern Design */}
      <div className="mb-6 bg-white dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Set Your Monthly Limit
        </label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-semibold text-lg">
              $
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-semibold"
            />
          </div>
          <button
            onClick={handleSetLimit}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Update</span>
          </button>
        </div>
      </div>

      {/* Budget Overview */}
      {limit > 0 ? (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Budget Limit */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Budget</p>
              </div>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">${limit.toFixed(2)}</p>
            </div>

            {/* Total Spent */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">Spent</p>
              </div>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">${totalSpent.toFixed(2)}</p>
            </div>

            {/* Remaining */}
            <div className={`rounded-xl p-4 border ${
              remaining >= 0 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-center space-x-2 mb-1">
                <svg className={`w-4 h-4 ${remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className={`text-xs font-medium uppercase tracking-wide ${
                  remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {remaining >= 0 ? 'Remaining' : 'Over Budget'}
                </p>
              </div>
              <p className={`text-2xl font-bold ${
                remaining >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
              }`}>
                ${Math.abs(remaining).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Progress Bar with Percentage */}
          <div className="bg-white dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Budget Usage</span>
              <div className="flex items-center space-x-2">
                <span className={`text-2xl font-bold ${
                  percentUsed >= 100 ? 'text-red-600 dark:text-red-400' :
                  percentUsed >= 80 ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-green-600 dark:text-green-400'
                }`}>
                  {percentUsed.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden ${alertStatus.progressColor}`}
                style={{ width: `${Math.min(percentUsed, 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Status Alert */}
          <div className={`rounded-xl p-4 border-2 ${
            remaining < 0 
              ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
              : percentUsed >= 80
              ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700'
              : 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
          }`}>
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                remaining < 0 
                  ? 'bg-red-100 dark:bg-red-800'
                  : percentUsed >= 80
                  ? 'bg-yellow-100 dark:bg-yellow-800'
                  : 'bg-green-100 dark:bg-green-800'
              }`}>
                {remaining < 0 ? (
                  <svg className="w-4 h-4 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : percentUsed >= 80 ? (
                  <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${alertStatus.colorClass}`}>
                  {alertStatus.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">No Budget Set</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Set a monthly spending limit to track your budget</p>
        </div>
      )}
    </div>
  );
}

export default SpendLimit;
