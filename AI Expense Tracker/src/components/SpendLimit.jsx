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
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg transition-colors duration-200">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Monthly Spend Limit
      </h2>
      
      {/* Input section to set limit */}
      <div className="mb-4">
        <input
          type="number"
          step="0.01"
          min="0"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter limit"
          className="border border-gray-200 dark:border-gray-600 rounded px-3 py-2 mr-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSetLimit}
          className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
        >
          Set Limit
        </button>
      </div>

      {/* Display current limit and remaining */}
      <div className="space-y-3">
        {limit > 0 ? (
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Limit:</span> ${limit.toFixed(2)}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Spent:</span> ${totalSpent.toFixed(2)}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Remaining:</span> ${remaining.toFixed(2)}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic py-4">No limit set. Add one to track your budget.</p>
        )}

        {/* Dynamic Alert Message */}
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <p className={alertStatus.colorClass}>
            {alertStatus.message}
          </p>
        </div>

        {/* Progress Bar */}
        {limit > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Progress</span>
              <span>{percentUsed.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${alertStatus.progressColor}`}
                style={{ width: `${Math.min(percentUsed, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpendLimit;
