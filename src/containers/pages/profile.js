import React,{useState,useEffect} from 'react';
import { Button, Form, Input,notification } from 'antd';
import './style.css';
import axios from 'axios';

const Profile = () => {
    const [form] = Form.useForm();
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const fetchUserData = async () => {
            try {
              const response = await axios.get('user'); // Replace with your API endpoint to fetch user data
              const user = response.data;
              setUserData(user);
              form.setFieldsValue({
                id:user.id,
                username: user.username,
              });
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchUserData();
      }, []);

    const openNotificationWithIconRole = (type, description) => {
        notification.destroy();
        notification[type]({
          message: type === 'success' ? 'Operation Successful' : 'Operation Failed',
          description: description,
        });
      };
    const onFinish = async (values) => {
        try {
            // Make an Axios request to update the username and password
            await axios.post('updateUser', values);
      
            openNotificationWithIconRole('success', 'Password changed successfully');
          } catch (error) {
            console.error(error);
            openNotificationWithIconRole('error', 'Failed to change password');
          }

      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return(
        <Form
        name="profile"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        style={{color:'black'}}
      >

        <Form.Item
          label="Username"
          name="username"
        >
          <Input />
        </Form.Item>
    
        <Form.Item
          label="Update Password"
          name="password"
        >
          <Input />
        </Form.Item>
    
        
    
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="button" className='bg-blue-500 text-white' htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )

};
export default Profile;