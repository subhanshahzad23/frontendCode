import React, { useEffect, useState } from 'react';

const ProfileCard = ({ profileImage, name }) => {
  const [timestamp, setTimestamp] = useState(new Date());

  useEffect(() => {
    // Update the timestamp when the component is mounted
    setTimestamp(new Date());

    // Cleanup function (componentWillUnmount)
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = timestamp.toLocaleString('en-US', options);

  return (
    <>
      <div className="absolute -ml-16 mobile:-ml-11 mt-3 flex-shrink-0">
        <img
          src={profileImage}
          alt="Profile"
          className="h-12 w-12 mobile:h-9 mobile:w-9 rounded-full object-cover"
        />
      </div>
      <div className="flex items-center space-x-4 py-4">
        <div className="flex-1">
          <div className="font-bold">{name}</div>
          <div className="text-gray-500 text-xs">
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
