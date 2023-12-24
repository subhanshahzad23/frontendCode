import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Form, Input, notification, Upload, Image } from "antd";
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const openNotificationWithIconRole = (type, description) => {
  notification.destroy();
  notification[type]({
    message: type === 'success' ? 'Operation Successful' : 'Operation Failed',
    description: description,
  });
};

const Links = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [currentAction, setCurrentAction] = useState('insert');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/links");
        const options = response.data.map(link => ({
          key: link.id,
          id: link.id,
          picture: link.picture,
          nameOrLink: link.nameOrLink,
          link: link.link, // Add link to the dataSource
          title1: link.title1,
          title2: link.title2,
        }));
        setDataSource(options);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleModal = (actionType, selected = null) => {
    if (actionType === 'update' && selected) {
      form.setFieldsValue({
        id: selected.id,
        picture: selected.picture,
        nameOrLink: selected.nameOrLink,
        title1: selected.title1,
        title2: selected.title2,
        link: selected.link, // Add link to the form fields
      });
    } else {
      form.resetFields();
    }
    setCurrentAction(actionType);
    setModalVisible(!modalVisible);
  };

  const handleRecord = async (actionType, values) => {
    try {
      switch (actionType) {
        case 'insert':
          const formData = new FormData();
          formData.append('picture', values.picture.fileList[0].originFileObj);
          formData.append('nameOrLink', values.nameOrLink);
          formData.append('title1', values.title1);
          formData.append('title2', values.title2);
          formData.append('link', values.link); // Add link to the formData
          await axios.post('/links', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          break;
        case 'update':
          const formDataUpdate = new FormData();
          if (values.picture.fileList) {
            formDataUpdate.append('picture', values.picture.fileList[0].originFileObj);
          } else {
            formDataUpdate.append('picture', values.picture);
          }
          formDataUpdate.append('nameOrLink', values.nameOrLink);
          formDataUpdate.append('title1', values.title1);
          formDataUpdate.append('title2', values.title2);
          formDataUpdate.append('link', values.link); // Add link to the formData
          await axios.put(`/links/${values.id}`, formDataUpdate, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          break;
        case 'delete':
          await axios.delete(`/links/${values.id}`);
          break;
        default:
          break;
      }

      const response = await axios.get('/links');
      const updatedOptions = response.data.map(link => ({
        key: link.id,
        id: link.id,
        picture: link.picture,
        nameOrLink: link.nameOrLink,
        link: link.link,
        title1: link.title1,
        title2: link.title2,
      }));

      setDataSource(updatedOptions);

      openNotificationWithIconRole('success', 'Operation Successful');
    } catch (error) {
      console.error(error);
      openNotificationWithIconRole('error', 'Operation Failed');
    }
  };

  const handleOk = (values) => {
    handleRecord(currentAction, values);
    setModalVisible(false);
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const columns = [
    {
      title: 'Picture',
      dataIndex: 'picture',
      key: 'picture',
      render: (picture) => (
        <div style={{ width: '50px', height: '50px' }}>
          <Image width={50} height={50} src={`https://backend6-apyu.onrender.com/${picture}`} alt="Link Picture" />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'nameOrLink',
      key: 'nameOrLink',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: 'Title 1',
      dataIndex: 'title1',
      key: 'title1',
    },
    {
      title: 'Title 2',
      dataIndex: 'title2',
      key: 'title2',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleModal('update', record)} href="#"><EditOutlined /></a>
          <a onClick={() => handleRecord('delete', record)} href="#"><DeleteOutlined style={{ color: 'red' }} /></a>
        </Space>
      ),
    }
  ];

  return (
    <>
      <Button 
        className="addButton"
        onClick={() => handleModal('insert')}>
        Add Link
      </Button>
      <Modal
        open={modalVisible}
        title={currentAction === 'insert' ? 'Add New Link' : 'Update Link'}
        okText={currentAction === 'insert' ? 'Add Link' : 'Update'}
        onCancel={() => handleModal(currentAction)}
        footer={[
          <Button key="cancel" onClick={() => handleModal(currentAction)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={() => form.submit()}
          >
            {currentAction === 'insert' ? 'Add Link' : 'Update'}
          </Button>,
        ]}
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={handleOk}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="id"
            style={{ display: 'none' }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Upload"
            name="picture"
            valuePropName="picture"
          >
            <Upload maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Name/Link"
            name="nameOrLink"
            rules={[
              {
                required: true,
                message: 'Please enter the link!',
              },
            ]}
          >
            <Input placeholder="Enter Name/Link" />
          </Form.Item>

          <Form.Item
            label="Link"
            name="link"
          >
            <Input placeholder="Enter Link" />
          </Form.Item>

          <Form.Item
            label="Title 1"
            name="title1"
            rules={[
              {
                required: true,
                message: 'Please enter title 1!',
              },
            ]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            label="Title 2"
            name="title2"
            rules={[
              {
                required: true,
                message: 'Please enter title 2!',
              },
            ]}
          >
            <Input placeholder="Enter title 2" />
          </Form.Item>
        </Form>
      </Modal>
      <Table 
        dataSource={dataSource} 
        columns={columns}  
        pagination={{
          defaultPageSize: 10,
        }} 
        scroll={{ x: "100%" }} 
      />
    </>
  );
};

export default Links;
