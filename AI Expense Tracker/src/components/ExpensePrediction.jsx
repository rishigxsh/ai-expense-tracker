import React from 'react';
import { predictNextMonth, getNextMonthString } from '../services/predictor';

function ExpensePrediction({ expenses }) {
  const prediction = predictNextMonth(expenses);
  const nextMonth = getNextMonthString();
  
  // Format the next month for display
  const nextMonthDisplay = new Date(nextMonth + '-01').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  const getConfidenceText = (confidence) => {
    switch (confidence) {
      case 'high':
        return 'High confidence';
      case 'medium':
        return 'Medium confidence';
      case 'low':
        return 'Low confidence';
      default:
        return 'No confidence';
    }
  };

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'high':
        return 'text-green-600 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-orange-600 dark:text-orange-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  const getMethodText = (method) => {
    switch (method) {
      case 'linear_regression':
        return 'Based on spending trend';
      case 'same_month':
        return 'Based on last month';
      case 'average':
        return 'Based on average spending';
      case 'insufficient_data':
        return 'Not enough data';
      default:
        return 'Unknown method';
    }
  };

  if (prediction.method === 'insufficient_data') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Expense Forecast</h3>
        <div className="text-center py-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Not enough data to predict next month's spending.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Add more expenses to see predictions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Expense Forecast</h3>
      
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Predicted spending for {nextMonthDisplay}:
        </p>
        
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          ${prediction.predictedAmount.toLocaleString()}
        </div>
        
        <div className="space-y-1">
          <p className={`text-xs ${getConfidenceColor(prediction.confidence)}`}>
            {getConfidenceText(prediction.confidence)}
          </p>
          
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {getMethodText(prediction.method)}
          </p>
        </div>
        
        {/* Show trend indicator if we have regression data */}
        {prediction.method === 'linear_regression' && prediction.regression && (
          <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              {prediction.regression.slope > 10 && (
                <span className="flex items-center">
                  📈 Trending up
                </span>
              )}
              {prediction.regression.slope < -10 && (
                <span className="flex items-center">
                  📉 Trending down
                </span>
              )}
              {Math.abs(prediction.regression.slope) <= 10 && (
                <span className="flex items-center">
                  ➡️ Stable trend
                </span>
              )}
              <span className="text-gray-400 dark:text-gray-500">
                (R² = {(prediction.regression.rSquared * 100).toFixed(0)}%)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpensePrediction;
