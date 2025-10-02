import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChartSkeleton, ChartSkeleton } from './SkeletonLoader';

function ExpenseCharts({ expenses = [], loading = false }) {
  // Transform expenses into category totals
  const getCategoryTotals = () => {
    const categoryTotals = {};
    
    expenses.forEach(expense => {
      const category = expense.category;
      if (categoryTotals[category]) {
        categoryTotals[category] += expense.amount;
      } else {
        categoryTotals[category] = expense.amount;
      }
    });

    // Convert to array format for Recharts
    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2))
    }));
  };

  const pieData = getCategoryTotals();

  // Colors for pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

  // Transform expenses into daily totals
  const getDailyTotals = () => {
    const dailyTotals = {};
    
    expenses.forEach(expense => {
      // Extract date from ISO string (YYYY-MM-DD format)
      const date = expense.date.split('T')[0];
      if (dailyTotals[date]) {
        dailyTotals[date] += expense.amount;
      } else {
        dailyTotals[date] = expense.amount;
      }
    });

    // Convert to array format and sort by date
    return Object.entries(dailyTotals)
      .map(([date, amount]) => ({
        date,
        amount: parseFloat(amount.toFixed(2)),
        displayDate: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const lineData = getDailyTotals();

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg transition-colors duration-200">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Expense Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 text-center">Spending by Category</h3>
            <PieChartSkeleton />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 text-center">Spending Over Time</h3>
            <ChartSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg transition-colors duration-200">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Expense Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PieChart */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 text-center">Spending by Category</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`$${value}`, name]}
                  labelFormatter={(label) => `Category: ${label}`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-gray-500 dark:text-gray-400">
              No data available to display charts.
            </div>
          )}
        </div>

        {/* LineChart */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 text-center">Spending Over Time</h3>
          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="displayDate" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`$${value}`, 'Amount']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-gray-500 dark:text-gray-400">
              No data available to display charts.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseCharts;
