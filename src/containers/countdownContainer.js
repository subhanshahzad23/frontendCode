import React, { useState, useEffect } from 'react';
import Countdown from './countdown';
import axios from 'axios';

const CountContainer = ({targetDate}) => {
  const [countdownData, setCountdownData] = useState({
    header1: '',
    header2: '',
    targetDate: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('getTargetDate');
        const { header1, header2 } = response.data;
        setCountdownData({ header1, header2 });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className='md:h-64 w-full md:w-3/5 bg-gradient-to-b from-sky-100 to-white p-4'>
      <p className='text-center text-lg text-red-600 font-semibold my-4'>
        {countdownData.header1}
      </p>
      <div className='flex justify-center item-center'>
      <p
                  className='w-4/6 mobile:w-5/6 text-center tracking-wider font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tighter'
                  style={{
                    fontFamily: 'Anton, sans-serif',
                    textShadow: '1px 1px 3px #00FFFF',
                    WebkitTextStroke: '1px white',
                    textStroke: '1px white',
                    fontStretch: 'ultra-expanded',
                  }}
                >
                  {countdownData.header2}
                </p>
      </div>
      <p className='text-center text-lg my-5 md:mt-4 '>Expires On</p>
      <div className='flex items-center justify-center w-full mb-6'>
        <Countdown targetDate={targetDate} />
      </div>
    </div>
  );
};

export default CountContainer;
