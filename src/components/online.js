import React from 'react';

const OnlineStatus = () => {
  return (
    <span className="relative flex h-3 w-3 ml-4">
         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      {/* <div className="w-3 h-3 rounded-full bg-green-300 opacity-75 absolute animate-ping"></div>
      <div className="w-2 h-2 rounded-full bg-green-400 absolute animate-pulse" style={{ top: '3px', left: '3px' }}></div> */}
    </span>
  );
};

export default OnlineStatus;
