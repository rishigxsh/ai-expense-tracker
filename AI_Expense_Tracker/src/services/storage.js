// Storage utility functions for localStorage

const EXPENSES_KEY = 'expenses';
const LIMIT_KEY = 'spendLimit';

export function loadExpenses() {
  try {
    const data = localStorage.getItem(EXPENSES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading expenses:', error);
    return [];
  }
}

export function saveExpenses(expenses) {
  try {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
  }
}

export function loadLimit() {
  try {
    const data = localStorage.getItem(LIMIT_KEY);
    return data ? parseFloat(data) : 0;
  } catch (error) {
    console.error('Error loading limit:', error);
    return 0;
  }
}

export function saveLimit(limit) {
  try {
    localStorage.setItem(LIMIT_KEY, limit.toString());
  } catch (error) {
    console.error('Error saving limit:', error);
  }
}
