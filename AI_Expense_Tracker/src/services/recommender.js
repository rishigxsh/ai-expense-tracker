/**
 * Personalized recommendations service based on user spending patterns
 * Analyzes expenses and budget limits to provide actionable insights
 */

/**
 * Groups expenses by category and calculates totals
 * @param {Array} expenses - Array of expense objects
 * @returns {Object} - Object with category totals
 */
function groupExpensesByCategory(expenses) {
  const categoryTotals = {};
  
  expenses.forEach(expense => {
    const category = expense.category || 'Other';
    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }
    categoryTotals[category] += expense.amount;
  });
  
  return categoryTotals;
}

/**
 * Groups expenses by month and calculates totals
 * @param {Array} expenses - Array of expense objects with date
 * @returns {Array} - Array of {month, total} objects sorted by month
 */
function groupExpensesByMonth(expenses) {
  const monthlyData = {};
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = 0;
    }
    monthlyData[monthKey] += expense.amount;
  });
  
  // Convert to array and sort by month
  return Object.entries(monthlyData)
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * Gets the top spending category
 * @param {Object} categoryTotals - Object with category totals
 * @returns {string} - Top category name or null if no data
 */
function getTopCategory(categoryTotals) {
  if (Object.keys(categoryTotals).length === 0) return null;
  
  return Object.entries(categoryTotals)
    .reduce((max, [category, total]) => 
      total > max.total ? { category, total } : max, 
      { category: null, total: 0 }
    ).category;
}

/**
 * Calculates month-over-month spending change
 * @param {Array} monthlyData - Array of {month, total} objects
 * @returns {Object} - {percentage, direction, hasChange}
 */
function calculateMonthOverMonthChange(monthlyData) {
  if (monthlyData.length < 2) {
    return { percentage: 0, direction: 'stable', hasChange: false };
  }
  
  const lastMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  
  const change = ((lastMonth.total - previousMonth.total) / previousMonth.total) * 100;
  const percentage = Math.abs(change);
  const direction = change > 0 ? 'increase' : change < 0 ? 'decrease' : 'stable';
  
  return {
    percentage: Math.round(percentage * 10) / 10, // Round to 1 decimal place
    direction,
    hasChange: Math.abs(change) > 5 // Only consider significant changes (>5%)
  };
}

/**
 * Generates personalized recommendations based on spending patterns
 * @param {Array} expenses - Array of expense objects
 * @param {number} limit - Monthly spending limit
 * @returns {Array} - Array of recommendation strings
 */
export function generateRecommendations(expenses, limit = 0) {
  const recommendations = [];
  
  // Handle edge case: no expenses
  if (!expenses || expenses.length === 0) {
    return ["Not enough data for recommendations."];
  }
  
  const categoryTotals = groupExpensesByCategory(expenses);
  const monthlyData = groupExpensesByMonth(expenses);
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Budget-based recommendations (only if limit is set and > 0)
  if (limit > 0) {
    const budgetPercentage = (totalSpent / limit) * 100;
    
    if (totalSpent > limit) {
      const overBudget = totalSpent - limit;
      const topCategory = getTopCategory(categoryTotals);
      
      if (topCategory) {
        recommendations.push(
          `You are over budget by $${overBudget.toFixed(2)}. Consider cutting back on ${topCategory}.`
        );
      } else {
        recommendations.push(
          `You are over budget by $${overBudget.toFixed(2)}. Consider reducing your spending.`
        );
      }
    } else if (budgetPercentage >= 80) {
      const topCategory = getTopCategory(categoryTotals);
      
      if (topCategory) {
        recommendations.push(
          `You are close to your budget (${budgetPercentage.toFixed(0)}%). Be careful with ${topCategory}.`
        );
      } else {
        recommendations.push(
          `You are close to your budget (${budgetPercentage.toFixed(0)}%). Consider monitoring your spending.`
        );
      }
    }
  }
  
  // Category dominance analysis
  const topCategory = getTopCategory(categoryTotals);
  if (topCategory) {
    const topCategoryPercentage = (categoryTotals[topCategory] / totalSpent) * 100;
    
    if (topCategoryPercentage > 50) {
      recommendations.push(
        `Most of your spending is in ${topCategory} (${topCategoryPercentage.toFixed(0)}%). Consider balancing your budget.`
      );
    }
  }
  
  // Month-over-month change analysis
  const monthChange = calculateMonthOverMonthChange(monthlyData);
  if (monthChange.hasChange) {
    const changeText = monthChange.direction === 'increase' ? 'increased' : 'decreased';
    recommendations.push(
      `Your spending ${changeText} by ${monthChange.percentage}% compared to last month.`
    );
  }
  
  // Positive reinforcement (only if no other recommendations)
  if (recommendations.length === 0) {
    if (limit > 0 && totalSpent < limit * 0.8) {
      recommendations.push("Great job! You are well under your budget.");
    } else {
      recommendations.push("You are on track with your spending.");
    }
  }
  
  return recommendations;
}

/**
 * Gets spending insights summary
 * @param {Array} expenses - Array of expense objects
 * @param {number} limit - Monthly spending limit
 * @returns {Object} - Summary object with key metrics
 */
export function getSpendingInsights(expenses, limit = 0) {
  if (!expenses || expenses.length === 0) {
    return {
      totalSpent: 0,
      categoryTotals: {},
      topCategory: null,
      budgetPercentage: 0,
      isOverBudget: false,
      monthChange: { percentage: 0, direction: 'stable', hasChange: false }
    };
  }
  
  const categoryTotals = groupExpensesByCategory(expenses);
  const monthlyData = groupExpensesByMonth(expenses);
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const topCategory = getTopCategory(categoryTotals);
  const budgetPercentage = limit > 0 ? (totalSpent / limit) * 100 : 0;
  const monthChange = calculateMonthOverMonthChange(monthlyData);
  
  return {
    totalSpent,
    categoryTotals,
    topCategory,
    budgetPercentage,
    isOverBudget: limit > 0 && totalSpent > limit,
    monthChange
  };
}
