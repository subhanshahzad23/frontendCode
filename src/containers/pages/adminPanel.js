import React, { useState } from 'react';
import { Collapse, Divider, Button } from 'antd';
import Links from './links';
import Header from './header';
import Profile from './profile';
import { useAuth } from '../../context/AuthContext';

const AdminPanel = () => {
  const [activeKey, setActiveKey] = useState(null);
  const { logout } = useAuth();

  const handleLogout = () => {
    // Implement your logout logic here
    logout()
  };

  const handlePanelChange = (key) => {
    setActiveKey(key);
  };

  return (
    <div className='flex flex-col justify-center items-center bg-gray-100 h-screen p-8 mobile:w-full mobile:p-0'>
      <div className='w-full mobile:w-full max-w-4xl bg-white p-8 rounded-lg shadow-md'>
        <div className='mb-4'>
          <Button type='primary' className='bg-blue-400 text-white hover:bg-blue-500' onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <Divider />
        <Collapse
          size='large'
          activeKey={activeKey}
          onChange={handlePanelChange}
          destroyInactivePanel={true}
          accordion
          items={[
            {
              key: '1',
              label: 'Headers',
              children: <Header />,
            },
          ]}
        />
        <Divider />
        <Collapse
          size='large'
          activeKey={activeKey}
          onChange={handlePanelChange}
          destroyInactivePanel={true}
          accordion
          items={[
            {
              key: '2',
              label: 'Links you may like',
              children: <Links />,
            },
          ]}
        />
        <Divider />
        <Collapse
          size='large'
          activeKey={activeKey}
          onChange={handlePanelChange}
          destroyInactivePanel={true}
          accordion
          items={[
            {
              key: '3',
              label: 'Profile',
              children: <Profile />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminPanel;
