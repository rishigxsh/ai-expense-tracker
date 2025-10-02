/**
 * Expense prediction service using simple linear regression
 * Predicts next month's spending based on historical data
 */

/**
 * Groups expenses by month and calculates totals
 * @param {Array} expenses - Array of expense objects with amount and date
 * @returns {Array} - Array of {month, total, count} objects sorted by month
 */
function groupExpensesByMonth(expenses) {
  const monthlyData = {};
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        total: 0,
        count: 0
      };
    }
    
    monthlyData[monthKey].total += expense.amount;
    monthlyData[monthKey].count += 1;
  });
  
  // Convert to array and sort by month
  return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * Calculates linear regression coefficients for predicting next month
 * @param {Array} monthlyData - Array of {month, total} objects
 * @returns {Object} - {slope, intercept, rSquared} or null if insufficient data
 */
function calculateLinearRegression(monthlyData) {
  const n = monthlyData.length;
  
  if (n < 2) return null;
  
  // Convert months to numeric values (months since first month)
  const data = monthlyData.map((item, index) => ({
    x: index, // months since start
    y: item.total
  }));
  
  // Calculate means
  const meanX = data.reduce((sum, item) => sum + item.x, 0) / n;
  const meanY = data.reduce((sum, item) => sum + item.y, 0) / n;
  
  // Calculate slope and intercept
  let numerator = 0;
  let denominator = 0;
  
  data.forEach(item => {
    const xDiff = item.x - meanX;
    const yDiff = item.y - meanY;
    numerator += xDiff * yDiff;
    denominator += xDiff * xDiff;
  });
  
  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = meanY - slope * meanX;
  
  // Calculate R-squared for goodness of fit
  let ssRes = 0; // Sum of squares of residuals
  let ssTot = 0; // Total sum of squares
  
  data.forEach(item => {
    const predicted = slope * item.x + intercept;
    ssRes += Math.pow(item.y - predicted, 2);
    ssTot += Math.pow(item.y - meanY, 2);
  });
  
  const rSquared = ssTot === 0 ? 1 : 1 - (ssRes / ssTot);
  
  return { slope, intercept, rSquared };
}

/**
 * Predicts next month's spending based on historical expense data
 * @param {Array} expenses - Array of expense objects with amount and date
 * @returns {Object} - {predictedAmount, confidence, method, monthlyData}
 */
export function predictNextMonth(expenses) {
  if (!expenses || expenses.length === 0) {
    return {
      predictedAmount: 0,
      confidence: 'none',
      method: 'insufficient_data',
      monthlyData: []
    };
  }
  
  const monthlyData = groupExpensesByMonth(expenses);
  
  if (monthlyData.length === 0) {
    return {
      predictedAmount: 0,
      confidence: 'none',
      method: 'insufficient_data',
      monthlyData: []
    };
  }
  
  // If only 1 month of data, predict the same amount
  if (monthlyData.length === 1) {
    return {
      predictedAmount: monthlyData[0].total,
      confidence: 'low',
      method: 'same_month',
      monthlyData: monthlyData
    };
  }
  
  // If 2+ months, use linear regression
  const regression = calculateLinearRegression(monthlyData);
  
  if (!regression) {
    // Fallback to average if regression fails
    const average = monthlyData.reduce((sum, item) => sum + item.total, 0) / monthlyData.length;
    return {
      predictedAmount: average,
      confidence: 'medium',
      method: 'average',
      monthlyData: monthlyData
    };
  }
  
  // Predict next month (monthlyData.length months from start)
  const nextMonthIndex = monthlyData.length;
  const predictedAmount = Math.max(0, regression.slope * nextMonthIndex + regression.intercept);
  
  // Determine confidence based on R-squared and data points
  let confidence = 'low';
  if (monthlyData.length >= 3 && regression.rSquared > 0.7) {
    confidence = 'high';
  } else if (monthlyData.length >= 2 && regression.rSquared > 0.3) {
    confidence = 'medium';
  }
  
  return {
    predictedAmount: Math.round(predictedAmount * 100) / 100, // Round to 2 decimal places
    confidence: confidence,
    method: 'linear_regression',
    monthlyData: monthlyData,
    regression: regression
  };
}

/**
 * Gets the next month string (YYYY-MM format)
 * @returns {string} - Next month in YYYY-MM format
 */
export function getNextMonthString() {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}`;
}
