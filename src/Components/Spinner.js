import React from 'react';
import loading from './Vector.svg';

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={loading} alt="loading" className="w-8 h-8 animate-spin text-blue-500" />
      <p className="mt-2 text-blue-700 font-semibold ">Validating...</p>
    </div>
  );
};

export default Spinner;
