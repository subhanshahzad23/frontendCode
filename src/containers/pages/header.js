import React,{useState,useEffect} from 'react';
import { Button, Form, Input,DatePicker,notification } from 'antd';
import moment from 'moment';
import './style.css';
import axios from 'axios';

const Header = () => {
    const [targetDate, setTargetDate] = useState(null);
    const [form] = Form.useForm();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/getTargetDate');
            const data = response.data;
            console.log(data)
          if(data){
            form.setFieldsValue({
              header1: data.header1,
              header2: data.header2,
              countdown: data.targetDate ? moment(data.targetDate) : null,
            });
        setTargetDate(targetDate)
        }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
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
            values.targetDate = targetDate;
            console.log('Success:', values);
    
            await axios.post('/updateTargetDate', values);
            openNotificationWithIconRole('success', 'Operation Successful');
          } catch (error) {
            openNotificationWithIconRole('error', 'Operation Failed');
            console.error('Error:', error);
          }
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return(
        <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        style={{color:'black'}}
      >
        <Form.Item
          label="Header 1"
          name="header1"
        >
          <Input />
        </Form.Item>
    
        <Form.Item
          label="Header 2"
          name="header2"
        >
          <Input />
        </Form.Item>
    
        <Form.Item
          label="Countdown"
          name="countdown"
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Target Date"
            value={targetDate ? moment(targetDate) : null}
            onChange={(date, dateString) => setTargetDate(dateString)}
            className='w-full'
            name='targetDate'
          />
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
export default Header;