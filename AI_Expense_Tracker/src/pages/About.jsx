import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../services/firebase';

function About() {
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

  const values = [
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We leverage AI to provide smarter financial insights and predictions.',
      color: 'blue'
    },
    {
      icon: '🛡',
      title: 'Security',
      description: 'Your data is private, secure, and always under your control.',
      color: 'green'
    },
    {
      icon: '🤝',
      title: 'Simplicity',
      description: 'We focus on a clean design that makes finance easy and accessible.',
      color: 'purple'
    },
    {
      icon: '🌍',
      title: 'Accessibility',
      description: 'Built for everyone, across all devices and platforms.',
      color: 'pink'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      pink: 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
    };
    return colors[color] || colors.blue;
  };

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
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="text-blue-600 dark:text-blue-400 font-semibold"
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
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FinSight
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our mission is to make personal finance simple, smart, and accessible.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Why We Built FinSight
            </h2>
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                FinSight was born from a simple observation: managing personal finances shouldn't be complicated. 
                Whether you're a student tracking your first budget, a professional managing multiple expenses, 
                or a family planning for the future, everyone deserves smart, simple tools.
              </p>
              <p>
                We combined the power of artificial intelligence with an intuitive design to create an expense 
                tracker that not only records your spending but actively helps you make better financial decisions. 
                Our AI analyzes your patterns, predicts future expenses, and provides personalized recommendations.
              </p>
              <p>
                Today, FinSight serves thousands of users worldwide, helping them take control of their finances 
                with confidence and clarity.
              </p>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 dark:border-gray-700">
              {/* Illustration placeholder - Finance teamwork style */}
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center relative overflow-hidden">
                {/* Abstract finance illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Center circle */}
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                      <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    
                    {/* Orbiting elements */}
                    <div className="absolute -top-12 -left-12 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div className="absolute -top-8 -right-16 w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div className="absolute -bottom-8 -left-16 w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div className="absolute -bottom-12 -right-12 w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl">✨</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-24 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at FinSight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center animate-fade-in"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-20 h-20 ${getColorClasses(value.color)} rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto shadow-lg`}>
                  {value.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 lg:p-16 shadow-2xl animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to take control of your expenses?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join FinSight today and experience smarter financial management.
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center space-x-3 bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Join FinSight Today</span>
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

export default About;
