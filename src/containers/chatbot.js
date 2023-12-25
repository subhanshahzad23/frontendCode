import React, { useState, useEffect, useRef } from "react";
import arrow from "../image/up-arrow.png";
import emailjs from "emailjs-com";

import { useNavigate } from "react-router-dom";

import {
  Button,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import ProfileCard from "../components/profileCard";
import avatar from "../image/profile_pic.jpg";
import usa from "../image/USA.png";
import cad from "../image/canada.png";
import aus from "../image/Australia.png";
import chi from "../image/china.png";
import { WhatsAppOutlined } from "@ant-design/icons";
import { FaTelegram } from "react-icons/fa";
import OnlineStatus from "../components/online";
import axios from "axios";
import CountContainer from "./countdownContainer";
import TopContainer from "./topContainer";
import CardComponent from "./card";
import Card from "./bottomCard";
import photo from "../image/oldman.jpg";
import { Modal } from "antd";

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessagingOption, setSelectedMessagingOption] = useState(null);

  const [targetDate, setTargetDate] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [email, setEmail] = useState("");
  const messagesEndRef = useRef(null);
  const [loadings, setLoadings] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleParagraphClick = async () => {
    if (email) {
      // Generate a token or unique identifier
      const token = Math.random().toString(36).substr(2, 9);

      // Generate the verification link
      const verificationLink = `http://localhost:3000/verify-email?token=${token}`;

      // EmailJS template parameters
      const templateParams = {
        to_email: email,
        verification_link: verificationLink,
      };

      // Send email using EmailJS
      try {
        const response = await emailjs.send(
          "service_fyj8s3g", // Replace with your EmailJS service ID
          "template_segd4f2", // Replace with your EmailJS template ID
          templateParams,
          "Xjayr8x7rGXS1ditD" // Replace with your EmailJS user ID
        );

        if (response.status === 200) {
          console.log("Verification email sent");
          // setIsLoading(true); // Keep loading state active
        } else {
          console.error("Failed to send verification email");
        }
      } catch (error) {
        console.error("Error sending email:", error);
      }
    } else {
      console.error("Email not provided");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Additional actions on OK
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { Option } = Select;

  const user = {
    name: "Helena",
    profileImage: avatar,
    date: "Dec 14",
    time: "12:30 PM",
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const prefixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 100,
        }}
        className="mx-auto"
        defaultValue="USD"
      >
        <Option value="USD">
          <span
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <img src={usa} className="h-4 w-4 mr-1 rounded-full object-cover" />
            <span>USA, $</span>
          </span>
        </Option>
        <Option value="CAD">
          <span
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <img src={cad} className="h-4 w-4 mr-1 rounded-full object-cover" />
            <span>CAD, $</span>
          </span>
        </Option>
        <Option value="AUS">
          <span
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <img src={aus} className="h-4 w-4 mr-1 rounded-full object-cover" />
            <span>AUS, $</span>
          </span>
        </Option>
        <Option value="CNY">
          <span
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <img src={chi} className="h-4 w-4 mr-1 rounded-full object-cover" />
            <span>CNY, ¥</span>
          </span>
        </Option>
      </Select>
    </Form.Item>
  );

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    setShowCard(false);
    const delay = 500;
    const chatSequence = [
      { type: "name", content: "" },
      { type: "bot", content: "Hi 👋" },
      { type: "bot", content: "I'm Helena from Traders Lab." },
      {
        type: "bot",
        content:
          "Do you want to find out how you could unlock the $10,000 profit trading digital currencies?",
      },
      { type: "button", content: "Yes" },
    ];

    const addMessageWithDelay = (message, index) => {
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, message]);
      }, index * delay);
    };

    const runChatSequence = async () => {
      for (let i = 0; i < chatSequence.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        addMessageWithDelay(chatSequence[i], i);
      }
    };

    runChatSequence();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("getTargetDate");
        const { targetDate } = response.data;
        console.log(targetDate);
        setTargetDate(targetDate);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (messageArray) => {
    messageArray.forEach((message, index) => {
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, message]);
      }, index * 1000);
    });
  };

  const renderMessageContent = (message) => {
    switch (message.type) {
      case "email&phone":
        return (
          <div className="user-inputs">
            <Form.Item
              className="mb-3"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Name required!",
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email required!",
                },
              ]}
              style={{ marginBottom: "30px" }}
            >
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Button
              className="bg-blue-500 text-white -mt-3"
              onClick={() =>
                handleButtonClick([
                  { type: "name", content: "" },
                  {
                    type: "bot",
                    content:
                      "Acknowledged! Lets get started with 3 Quick Question",
                  },
                  {
                    type: "bot",
                    content: "1. Are you familiar with cryptocurrency trading?",
                  },
                  { type: "YesNo", content: "" },
                ])
              }
            >
              Send
            </Button>
          </div>
        );

      case "YesNo":
        return (
          <Row gutter={8}>
            <Col>
              {" "}
              <Button
                className="bg-blue-500 text-white"
                onClick={() =>
                  handleButtonClick([
                    { type: "name", content: "" },
                    {
                      type: "bot",
                      content:
                        "2. How much money would you estimate you have invested in cryptocurrencies?",
                    },
                    { type: "currency", content: "" },
                  ])
                }
              >
                Yes 💰
              </Button>
            </Col>
            <Col>
              {" "}
              <Button
                className="bg-blue-500 text-white"
                onClick={() =>
                  handleButtonClick([
                    { type: "name", content: "" },
                    {
                      type: "bot",
                      content:
                        "2. How much money would you estimate you have invested in cryptocurrencies?",
                    },
                    { type: "currency", content: "" },
                  ])
                }
              >
                No
              </Button>
            </Col>
          </Row>
        );

      case "currency":
        return (
          <div className="user-inputs">
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please input amount!",
                },
              ]}
              style={{ marginBottom: "30px" }}
            >
              <Input
                placeholder="Enter the amount"
                addonBefore={
                  <Form.Item name="currency" noStyle>
                    <Select
                      style={{
                        width: 100,
                      }}
                      defaultValue="USD"
                    >
                      <Option value="USD">
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "Roboto, sans-serif",
                          }}
                        >
                          <img
                            src={usa}
                            className="h-4 w-4 mr-1 rounded-full object-cover"
                          />
                          <span>USA, $</span>
                        </span>
                      </Option>
                      <Option value="CAD">
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "Roboto, sans-serif",
                          }}
                        >
                          <img
                            src={cad}
                            className="h-4 w-4 mr-1 rounded-full object-cover"
                          />
                          <span>CAD, $</span>
                        </span>
                      </Option>
                      <Option value="AUS">
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "Roboto, sans-serif",
                          }}
                        >
                          <img
                            src={aus}
                            className="h-4 w-4 mr-1 rounded-full object-cover"
                          />
                          <span>AUS, $</span>
                        </span>
                      </Option>
                      <Option value="CNY">
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "Roboto, sans-serif",
                          }}
                        >
                          <img
                            src={chi}
                            className="h-4 w-4 mr-1 rounded-full object-cover"
                          />
                          <span>CNY, ¥</span>
                        </span>
                      </Option>
                    </Select>
                  </Form.Item>
                }
              />
            </Form.Item>
            <Button
              className="bg-blue-500 text-white -mt-3"
              onClick={() =>
                handleButtonClick([
                  { type: "name", content: "" },
                  {
                    type: "bot",
                    content: "3. When do you intend to start profiting?",
                  },
                  { type: "date", content: "" },
                ])
              }
            >
              Send
            </Button>
          </div>
        );

      case "date":
        return (
          <div className="user-inputs">
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: "Input required!",
                },
              ]}
              style={{ marginBottom: "30px" }}
            >
              {/* <Input placeholder="Date" /> */}
              <DatePicker placeholder="yyyy-mm-dd" className="w-full" />
            </Form.Item>

            <Button
              className="bg-blue-500 text-white -mt-3 "
              onClick={() =>
                handleButtonClick([
                  { type: "name", content: "" },
                  {
                    type: "bot",
                    content:
                      "How do we show , share and send the profit from your copied traders back to you.",
                  },
                  { type: "card", content: "Mobile Number" },
                  { type: "card", content: "WhatsApp" },
                  { type: "card", content: "Telegram" },
                  { type: "telegram&whatsapp", content: "" },
                ])
              }
            >
              Send
            </Button>
          </div>
        );
      case "card":
        return (
          <div
            onClick={() =>
              handleButtonClick([
                { type: "name", content: "" },
                { type: `${message.content}`, content: "" },
              ])
            }
            className="bg-blue-100 text-blue-700 font-semibold p-2 mb-1 items-center w-48 rounded-lg flex items-center justify-center"
          >
            {message.content}
          </div>
        );

      case "Mobile Number":
        return (
          <div>
            <Form.Item
              className="mb-2"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Input required!",
                },
              ]}
            >
              <Input placeholder="Mobile Number" />
            </Form.Item>
            <div className="flex mt-5 justify-center">
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  className="bg-blue-500 text-white"
                  htmlType="submit"
                  loading={loadings}
                  onClick={showModal}
                  style={{ cursor: "pointer" }} // Add this line
                >
                  Confirm
                </Button>
              </Form.Item>
            </div>{" "}
          </div>
        );
      case "Telegram":
        return (
          <div>
            <Form.Item
              className="mb-2"
              name="telegram"
              rules={[
                {
                  required: true,
                  message: "Input required!",
                },
              ]}
            >
              <Input placeholder="Telegram" prefix={<FaTelegram />} />
            </Form.Item>
            <div className="flex mt-5 justify-center">
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  className="bg-blue-500 text-white"
                  htmlType="submit"
                  loading={loadings}
                  onClick={showModal}
                  style={{ cursor: "pointer" }} // Add this line
                >
                  Confirm
                </Button>
              </Form.Item>
            </div>{" "}
          </div>
        );
      case "WhatsApp":
        return (
          <div>
            <Form.Item
              className="mb-2"
              name="whatsapp"
              rules={[
                {
                  required: true,
                  message: "Input required!",
                },
              ]}
            >
              <Input placeholder="WhatsApp" prefix={<WhatsAppOutlined />} />
            </Form.Item>
            <div className="flex mt-5 justify-center">
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  className="bg-blue-500 text-white"
                  htmlType="submit"
                  loading={loadings}
                  onClick={showModal}
                  style={{ cursor: "pointer" }} // Add this line
                >
                  Confirm
                </Button>
              </Form.Item>
            </div>
          </div>
        );

      case "name":
        return <ProfileCard {...user} />;

      default:
        return (
          <div className={`chat-message font-semibold mb-3 ${message.type}`}>
            {message.content}
          </div>
        );
    }
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoadings(true);
    setEmail(values.email);
    try {
      const apiUrl = "https://backend6-apyu.onrender.com/verify";
      const response = await axios.post(apiUrl, values);
      setShowCard(true);
      setLoadings(false);
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const handleNoButton = () => {
    window.location.reload();
  };

  const onclose = () => {
    setShowCard(false);
  };
  return (
    <>
      <TopContainer />
      {showCard && (
        <div className="fixed top-0 z-10 left-0 w-full h-full bg-black opacity-50"></div>
      )}
      {showCard && <CardComponent onClose={onclose} email={email} />}
      <div
        className={`flex items-center justify-center mb-5 bg-gradient-to-b from-sky via-white to-white border-b border-gray-300 `}
      >
        <CountContainer targetDate={`${targetDate}`} />
      </div>

      <div className="flex items-center justify-center mb-5">
        <div className="flex border w-48 rounded-full h-8 items-center my-3">
          <OnlineStatus />
          <span className="ml-4 font-bold">Helena is Online</span>
        </div>
      </div>
      <div className="flex  mb-20">
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="mx-auto w-2/6 text-md mobile:w-4/6"
          initialValues={{
            suffix: "USD",
          }}
        >
          {messages.map((message, index) => (
            <div key={index}>
              {message.type === "button" ? (
                <Button
                  className="bg-blue-500 text-white"
                  onClick={() =>
                    handleButtonClick([
                      { type: "name", content: "" },
                      {
                        type: "bot",
                        content:
                          "Before we get started, what is your Name and Email address",
                      },
                      { type: "email&phone", content: "" },
                    ])
                  }
                >
                  {message.content} 💰
                </Button>
              ) : (
                renderMessageContent(message)
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Form>
      </div>
      <div className="mobile:hidden">
        <Card />
      </div>

      <Modal
        title={null}
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="50%"
        className="custom-modal-class" // Use this class to override styles
      >
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="fixed rounded-lg z-10 w-3/6 mobile:w-full h-4/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 border border-gray-300 shadow-md">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={handleCancel}
            ></button>
            <div className="flex flex-col items-center md:items-start justify-center space-y-4 mt-12">
              <p
                className="w-full md:w-2/4 text-center font-bold text-2xl "
                style={{ fontFamily: "Inter" }}
              >
                One more step...
              </p>
              <p className="w-full md:w-2/4 text-center text-lg">
                We have sent a verification link to:
              </p>
              <p className="w-full md:w-2/4 text-center">{email}</p>
              <p className="w-full md:w-3/4 text-center">
                Please check your inbox (or spam inbox) and click the
                verification link in it.
              </p>
            </div>

            <div
              className="flex items-center ml-80 mobile:ml-40 mt-5 "
              style={{ marginLeft: "270px" }}
            >
              <img
                src={arrow}
                alt="Profile"
                className="h-12 w-12 mobile:h-9 mobile:w-9  object-cover -rotate-45 scale-y-[-1]  "
              />
              <img
                src={arrow}
                alt="Profile"
                className="h-12 w-12 mobile:h-9 mobile:w-9  object-cover rotate-180"
              />
              <img
                src={arrow}
                alt="Profile"
                className="h-12 w-12 mobile:h-9 mobile:w-9  object-cover rotate-45 scale-y-[-1] scale-x-[-1]"
              />
            </div>

            <div className="border-t-2 border-b-2 border-black flex w-full md:mt-0 mt-2 -p-2">
              <p className="w-full md:w-1/3 p-1 font-semibold">
                Jack Raintbolt
              </p>

              <p
                className="w-full md:w-2/3 p-1"
                onClick={handleParagraphClick}
                style={{ cursor: "pointer" }}
                loading={loadings}
              >
                [Action Needed] Please Verify Your Email
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChatbotComponent;
