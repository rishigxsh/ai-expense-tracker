import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseSummary from '../components/ExpenseSummary';
import SpendLimit from '../components/SpendLimit';
import ExpenseList from '../components/ExpenseList';
import ExpenseCharts from '../components/ExpenseCharts';
import SpendingHeatmap from '../components/SpendingHeatmap';
import ExpensePrediction from '../components/ExpensePrediction';
import Recommendations from '../components/Recommendations';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';

function Home() {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [limit, setLimit] = useState(0);
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  const [loadingLimit, setLoadingLimit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Real-time subscriptions for expenses and limit
  useEffect(() => {
    if (!currentUser) {
      setExpenses([]);
      setLimit(0);
      setLoadingExpenses(false);
      setLoadingLimit(false);
      setErrorMessage('');
      return;
    }

    setLoadingExpenses(true);
    setLoadingLimit(true);
    setErrorMessage('');

    const expensesRef = collection(db, 'users', currentUser.uid, 'expenses');
    const q = query(expensesRef, orderBy('date', 'asc'));
    const unsubscribeExpenses = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setExpenses(list);
        setLoadingExpenses(false);
      },
      (error) => {
        console.error('Failed to subscribe to expenses:', error);
        setErrorMessage('We could not load your expenses. Please try again.');
        setLoadingExpenses(false);
      }
    );

    const limitDocRef = doc(db, 'users', currentUser.uid, 'limit', 'limit');
    const unsubscribeLimit = onSnapshot(
      limitDocRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setLimit(typeof data.value === 'number' ? data.value : 0);
        } else {
          setLimit(0);
        }
        setLoadingLimit(false);
      },
      (error) => {
        console.error('Failed to subscribe to limit:', error);
        setErrorMessage('We could not load your spending limit. Please try again.');
        setLoadingLimit(false);
      }
    );

    return () => {
      unsubscribeExpenses();
      unsubscribeLimit();
    };
  }, [currentUser]);

  // Handle adding a new expense to Firestore
  const handleAddExpense = async (newExpense) => {
    if (!currentUser) return;
    try {
      const expense = {
        ...newExpense,
        date: new Date().toISOString(),
      };
      const expensesRef = collection(db, 'users', currentUser.uid, 'expenses');
      await addDoc(expensesRef, expense);
    } catch (error) {
      console.error('Failed to add expense:', error);
      alert('Failed to add expense.');
    }
  };

  // Handle deleting an expense from Firestore
  const handleDeleteExpense = async (id) => {
    if (!currentUser) return;
    try {
      await deleteDoc(doc(db, 'users', currentUser.uid, 'expenses', id));
    } catch (error) {
      console.error('Failed to delete expense:', error);
      alert('Failed to delete expense.');
    }
  };

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar currentUser={currentUser} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(loadingExpenses || loadingLimit) && (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        )}
        
        {!!errorMessage && !loadingExpenses && !loadingLimit && (
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-sm">
              {errorMessage}
            </div>
          </div>
        )}
        
        {!loadingExpenses && !loadingLimit && !errorMessage && (
          <div className="space-y-8">
            {/* Top Row: Add Expense Form + Spend Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-fade-in">
                <ExpenseForm onAddExpense={handleAddExpense} />
              </div>
                    <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                      <ExpenseSummary expenses={expenses} limit={limit} loading={loadingExpenses || loadingLimit} />
                    </div>
            </div>

            {/* Spend Limit Card (if limit is set) */}
            {limit > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <SpendLimit expenses={expenses} limit={limit} />
              </div>
            )}

            {/* Middle Row: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <ExpenseCharts expenses={expenses} loading={loadingExpenses} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <SpendingHeatmap expenses={expenses} />
              </div>
            </div>

            {/* Bottom Row: Recommendations + Expense List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <Recommendations expenses={expenses} limit={limit} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} loading={loadingExpenses} />
              </div>
            </div>

            {/* Full Width: Expense Prediction */}
            <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <ExpensePrediction expenses={expenses} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
