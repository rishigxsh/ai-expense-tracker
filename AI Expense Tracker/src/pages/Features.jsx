import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../services/firebase';

function Features() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleGetStarted = async () => {
    if (currentUser) {
      navigate('/');
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error('Sign-in failed:', error);
      navigate('/');
    }
  };

  const features = [
    {
      icon: '📊',
      title: 'Expense Analytics',
      description: 'Visualize your spending across categories and time with beautiful interactive charts.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: '⏱',
      title: 'Real-time Sync',
      description: 'All expenses and limits update instantly across devices with Firebase cloud sync.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🎯',
      title: 'Smart Recommendations',
      description: 'AI helps you stay under budget with personalized tips and spending insights.',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with Google sign-in authentication.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: '🌍',
      title: 'Cross-Platform',
      description: 'Access your expenses from any device, anywhere - mobile, tablet, or desktop.',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: '📈',
      title: 'Forecasting',
      description: 'Predict future expenses based on your spending habits with AI-powered predictions.',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FinSight</span>
            </div>
            
            {/* Nav Links */}
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => navigate('/features')}
                className="text-blue-600 dark:text-blue-400 font-semibold"
              >
                Features
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => navigate('/')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                {currentUser ? 'Dashboard' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FinSight?
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            AI-powered tools to help you track smarter and spend wiser.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* AI Features Section */}
        <div className="mt-24 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
              ✨ AI-POWERED
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Intelligent Financial Assistant
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              FinSight leverages cutting-edge AI algorithms to transform your expense data into actionable insights.
              Here's how our AI technology works for you:
            </p>
          </div>

          {/* AI Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Auto-Categorization */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl p-8 border-2 border-blue-200 dark:border-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
                🏷️
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Smart Auto-Categorization
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Our AI automatically categorizes your expenses using intelligent keyword pattern matching.
              </p>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">▸</span>
                  <span><strong>Technology:</strong> Keyword-based Pattern Matching Algorithm</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">▸</span>
                  <span><strong>Categories:</strong> 7 pre-trained categories (Grocery, Transportation, Entertainment, Utilities, Healthcare, Shopping, Food)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">▸</span>
                  <span><strong>How it works:</strong> Analyzes expense descriptions and matches them against 100+ merchant keywords</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">▸</span>
                  <span><strong>Benefit:</strong> Saves time by eliminating manual categorization</span>
                </div>
              </div>
            </div>

            {/* Expense Prediction */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-3xl p-8 border-2 border-purple-200 dark:border-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
                🔮
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Expense Forecasting
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Predict your future spending with machine learning-powered linear regression analysis.
              </p>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start space-x-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">▸</span>
                  <span><strong>Technology:</strong> Linear Regression (Least Squares Method)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">▸</span>
                  <span><strong>Metrics:</strong> Calculates R² (goodness of fit) and confidence levels</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">▸</span>
                  <span><strong>How it works:</strong> Groups expenses by month, identifies spending trends, and extrapolates future values</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">▸</span>
                  <span><strong>Confidence Levels:</strong> High (3+ months, R² > 0.7), Medium (2+ months, R² > 0.3), Low (limited data)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-0.5">▸</span>
                  <span><strong>Benefit:</strong> Plan ahead and avoid budget surprises</span>
                </div>
              </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-3xl p-8 border-2 border-pink-200 dark:border-pink-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
                💡
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Smart Recommendations
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Get personalized financial advice based on your unique spending patterns and budget goals.
              </p>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start space-x-2">
                  <span className="text-pink-600 dark:text-pink-400 mt-0.5">▸</span>
                  <span><strong>Technology:</strong> Behavioral Pattern Analysis & Rule-Based AI</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-pink-600 dark:text-pink-400 mt-0.5">▸</span>
                  <span><strong>Analysis Types:</strong> Budget compliance, category dominance, month-over-month trends</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-pink-600 dark:text-pink-400 mt-0.5">▸</span>
                  <span><strong>How it works:</strong> Analyzes spending distribution, compares against budget limits, and identifies concerning patterns</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-pink-600 dark:text-pink-400 mt-0.5">▸</span>
                  <span><strong>Recommendations:</strong> Budget warnings, category balance suggestions, spending trend alerts</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-pink-600 dark:text-pink-400 mt-0.5">▸</span>
                  <span><strong>Benefit:</strong> Proactive financial guidance tailored to your habits</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Technology Stack Info */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                🧠
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Why Our AI Approach?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We've implemented lightweight, efficient AI algorithms that run entirely in your browser—no data sent to third-party AI services. 
                  This means <strong>faster responses</strong>, <strong>complete privacy</strong>, and <strong>no additional costs</strong>. 
                  Our keyword-based categorization achieves high accuracy for common merchants, while linear regression provides reliable predictions 
                  without the complexity of deep learning models. The result? Intelligent features that work instantly, even offline.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 lg:p-16 shadow-2xl animate-fade-in" style={{ animationDelay: '1s' }}>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Start your smarter spending journey today.
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have taken control of their finances with FinSight.
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center space-x-3 bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="text-2xl">🚀</span>
            <span>Get Started with Google</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © 2025 FinSight. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Features;
