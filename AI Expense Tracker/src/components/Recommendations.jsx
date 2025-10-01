import React from 'react';
import { generateRecommendations, getSpendingInsights } from '../services/recommender';

function Recommendations({ expenses, limit }) {
  const recommendations = generateRecommendations(expenses, limit);
  const insights = getSpendingInsights(expenses, limit);
  
  const getRecommendationIcon = (recommendation, index) => {
    const text = recommendation.toLowerCase();
    
    // Over budget warnings
    if (text.includes('over budget')) {
      return '🚨';
    }
    
    // Close to budget warnings
    if (text.includes('close to your budget')) {
      return '⚠️';
    }
    
    // Category dominance
    if (text.includes('most of your spending')) {
      return '⚖️';
    }
    
    // Month-over-month changes
    if (text.includes('increased') || text.includes('decreased')) {
      return text.includes('increased') ? '📈' : '📉';
    }
    
    // Positive messages
    if (text.includes('great job') || text.includes('on track')) {
      return '✅';
    }
    
    // Default icon
    return '💡';
  };

  const getRecommendationColor = (recommendation) => {
    const text = recommendation.toLowerCase();
    
    // Red for over budget
    if (text.includes('over budget')) {
      return 'text-red-600 dark:text-red-400';
    }
    
    // Orange for close to budget
    if (text.includes('close to your budget')) {
      return 'text-orange-600 dark:text-orange-400';
    }
    
    // Blue for category balance
    if (text.includes('most of your spending')) {
      return 'text-blue-600 dark:text-blue-400';
    }
    
    // Green for positive messages
    if (text.includes('great job') || text.includes('on track')) {
      return 'text-green-600 dark:text-green-400';
    }
    
    // Default gray
    return 'text-gray-700 dark:text-gray-300';
  };

  const getRecommendationWeight = (recommendation) => {
    const text = recommendation.toLowerCase();
    
    // Bold for important warnings
    if (text.includes('over budget') || text.includes('close to your budget')) {
      return 'font-semibold';
    }
    
    // Medium weight for other recommendations
    return 'font-medium';
  };

  const hasExpenses = Array.isArray(expenses) && expenses.length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Smart Recommendations</h3>
      
      {!hasExpenses ? (
        <div className="text-gray-500 dark:text-gray-400 italic py-4 text-center">
          Not enough data for recommendations.
        </div>
      ) : recommendations.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No recommendations available at this time.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="text-lg flex-shrink-0 mt-0.5">
                {getRecommendationIcon(recommendation, index)}
              </span>
              <p className={`text-sm leading-relaxed ${getRecommendationColor(recommendation)} ${getRecommendationWeight(recommendation)}`}>
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      )}
      
      {/* Additional insights section (optional) */}
      {insights.totalSpent > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Total spent: ${insights.totalSpent.toLocaleString()}</span>
            {insights.topCategory && (
              <span>Top category: {insights.topCategory}</span>
            )}
            {limit > 0 && (
              <span className={insights.isOverBudget ? 'text-red-500' : insights.budgetPercentage > 80 ? 'text-orange-500' : 'text-green-500'}>
                {insights.budgetPercentage.toFixed(0)}% of budget
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendations;
