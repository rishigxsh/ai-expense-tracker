import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );
}

export default Loader;


