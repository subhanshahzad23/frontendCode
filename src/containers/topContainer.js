// TopContainer.js
import React from 'react';
import logo from '../image/logo.jpg';

const TopContainer = () => {
  return (
    <div className="h-24 flex flex-col items-center justify-center">
  <p className='text-grey-700 pt-2 pb-1 font-medium'>Brought to you by</p>
  <p className="h-8 w-48 flex items-center justify-center py-1">
    <img src={logo} alt="Profile" className="h-8 w-48 object-cover" />
  </p>
</div>

  );
};

export default TopContainer;
