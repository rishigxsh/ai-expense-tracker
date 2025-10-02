import React from 'react';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 FinSight. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Track smarter. Spend wiser.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
