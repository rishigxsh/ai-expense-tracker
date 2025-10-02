import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function SpendingHeatmap({ expenses = [] }) {
  // Transform expenses into weekday totals
  const getWeekdayTotals = () => {
    const weekdayTotals = {
      0: { day: 'Sun', amount: 0, count: 0 }, // Sunday
      1: { day: 'Mon', amount: 0, count: 0 }, // Monday
      2: { day: 'Tue', amount: 0, count: 0 }, // Tuesday
      3: { day: 'Wed', amount: 0, count: 0 }, // Wednesday
      4: { day: 'Thu', amount: 0, count: 0 }, // Thursday
      5: { day: 'Fri', amount: 0, count: 0 }, // Friday
      6: { day: 'Sat', amount: 0, count: 0 }, // Saturday
    };
    
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const weekday = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
      
      if (weekdayTotals[weekday]) {
        weekdayTotals[weekday].amount += expense.amount;
        weekdayTotals[weekday].count += 1;
      }
    });

    // Convert to array and calculate average spending
    return Object.values(weekdayTotals).map(dayData => ({
      ...dayData,
      amount: parseFloat(dayData.amount.toFixed(2)),
      average: dayData.count > 0 ? parseFloat((dayData.amount / dayData.count).toFixed(2)) : 0
    }));
  };

  const weekdayData = getWeekdayTotals();
  
  // Calculate max amount for color intensity scaling
  const maxAmount = Math.max(...weekdayData.map(day => day.amount));
  
  // Get color intensity based on spending amount
  const getBarColor = (amount) => {
    if (maxAmount === 0) return '#E5E7EB'; // Gray for no data
    
    const intensity = amount / maxAmount;
    const baseColor = '#3B82F6'; // Blue base color
    
    // Create gradient effect by adjusting opacity
    const opacity = Math.max(0.3, intensity); // Minimum 30% opacity
    
    return baseColor;
  };

  const getBarOpacity = (amount) => {
    if (maxAmount === 0) return 0.3;
    return Math.max(0.3, amount / maxAmount);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg transition-colors duration-200">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Spending by Day of Week
      </h2>
      
      {weekdayData.some(day => day.amount > 0) ? (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weekdayData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              className="dark:text-gray-300"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              className="dark:text-gray-300"
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value, name) => [`$${value}`, 'Total Spent']}
              labelFormatter={(label) => `${label}day`}
              contentStyle={{
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="amount" 
              radius={[4, 4, 0, 0]}
            >
              {weekdayData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={getBarColor(entry.amount)}
                  fillOpacity={getBarOpacity(entry.amount)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-[250px] text-gray-500 dark:text-gray-400">
          No data available
        </div>
      )}
    </div>
  );
}

export default SpendingHeatmap;
