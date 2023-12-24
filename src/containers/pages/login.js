import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Input,notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const openNotificationWithIconRole = (type, description) => {
    notification.destroy();
    notification[type]({
      message: type === 'success' ? 'Operation Successful' : 'Operation Failed',
      description: description,
    });
  };

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = (values) => {
    console.log(values)
    axios.post("login", values)
    .then(response => {
      console.log('Login successful:', response.data);
      login(response.data.token)
      
      openNotificationWithIconRole('success', 'Login Successful');
      navigate('/adminPanel');
    })
    .catch(error => {
      console.error('Login failed:', error);
      openNotificationWithIconRole('error', 'Login Failed')
      // Handle login error, show error message, etc.
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 mobile:w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Button className='w-full' htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
