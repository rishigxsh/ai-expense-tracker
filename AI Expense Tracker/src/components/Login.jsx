import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from '../services/firebase';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google sign-in failed:', error);
      const code = error?.code || 'unknown';
      if (code === 'auth/popup-blocked') {
        try {
          const provider = new GoogleAuthProvider();
          await signInWithRedirect(auth, provider);
          return;
        } catch (redirectError) {
          console.error('Redirect sign-in failed:', redirectError);
        }
      }
      if (code === 'auth/unauthorized-domain') {
        alert('Sign-in blocked: add your domain (localhost) in Firebase Auth > Settings > Authorized domains.');
      } else if (code === 'auth/popup-closed-by-user') {
        alert('Sign-in popup was closed before completing. Please try again.');
      } else {
        alert(`Sign-in failed (${code}). Check console for details.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Abstract SVG Waves */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 text-white/5"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Navbar */}
      <nav className="relative z-20 px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">FinSight</span>
            </div>
            
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigate('/features')}
                className="text-white/90 hover:text-white font-medium transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="text-white/90 hover:text-white font-medium transition-colors"
              >
                About
              </button>
              <button 
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="bg-white/90 backdrop-blur-sm text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-white transition-colors shadow-lg disabled:opacity-50"
              >
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
              <div className="px-4 py-3 space-y-2">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/features');
                  }}
                  className="block w-full text-left px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg font-medium transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/about');
                  }}
                  className="block w-full text-left px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg font-medium transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleGoogleSignIn();
                  }}
                  disabled={isLoading}
                  className="block w-full text-left px-4 py-3 bg-white/90 backdrop-blur-sm text-blue-600 hover:bg-white rounded-lg font-semibold transition-colors shadow-lg disabled:opacity-50"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-200px)]">
          
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium">AI-Powered Insights</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-white">Smarter</span>
              <br />
              <span className="text-white">Expense Tracking</span>
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                with AI
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Get insights, track spending, and stay in control of your budget with FinSight.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="group relative inline-flex items-center justify-center space-x-3 bg-white text-gray-900 px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">🚀</span>
                    <span>Get Started with Google</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70 text-sm font-medium">Free to use</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70 text-sm font-medium">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white/70 text-sm font-medium">AI-Powered</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Illustration/Dashboard Mockup */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Dashboard Mockup Card */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 lg:p-8 transform hover:scale-105 transition-transform duration-500">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20"></div>
              
              <div className="relative space-y-6">
                {/* Mock Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm font-medium">Dashboard</span>
                </div>
                
                {/* Mock Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                    <p className="text-blue-600 text-sm font-medium mb-1">Total Spent</p>
                    <p className="text-2xl font-bold text-blue-900">$2,450</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                    <p className="text-purple-600 text-sm font-medium mb-1">Budget Left</p>
                    <p className="text-2xl font-bold text-purple-900">$550</p>
                  </div>
                </div>
                
                {/* Mock Chart */}
                <div className="space-y-3">
                  <p className="text-gray-700 font-semibold text-sm">Spending Trends</p>
                  <div className="flex items-end justify-between h-32 space-x-2">
                    <div className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-full" style={{ height: '60%' }}></div>
                    <div className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg w-full" style={{ height: '85%' }}></div>
                    <div className="bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-lg w-full" style={{ height: '70%' }}></div>
                    <div className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-full" style={{ height: '90%' }}></div>
                    <div className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg w-full" style={{ height: '75%' }}></div>
                    <div className="bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-lg w-full" style={{ height: '65%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>
                </div>
                
                {/* Mock Categories */}
                <div className="space-y-2">
                  <p className="text-gray-700 font-semibold text-sm">Top Categories</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🍔</span>
                        <span className="text-sm font-medium text-gray-700">Food</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">$850</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🚗</span>
                        <span className="text-sm font-medium text-gray-700">Transport</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">$620</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🎬</span>
                        <span className="text-sm font-medium text-gray-700">Entertainment</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">$380</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-6 -right-6 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold animate-bounce">
              AI Insights ✨
            </div>
            <div className="absolute -bottom-6 -left-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold">
              Real-time Sync 🔄
            </div>
          </div>
          
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-6">
        <p className="text-center text-sm text-white/60 font-medium">
          © 2025 FinSight. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;