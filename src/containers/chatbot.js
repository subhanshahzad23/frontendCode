import React, { useState, useEffect, useRef } from "react";
import arrow from "../image/up-arrow.png";
import emailjs from "emailjs-com";
// import {
//   messageArray,
//   messageArray1,
//   messageArray2,
//   messageArray3,
//   messageArray4,
//   messageArraySequence
// } from "./botChat.js";
import { user } from "./User.js";
import { useLoaderData, useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";

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
import "./card.css";

const ChatbotComponent = () => {
  // const messageArrayRef = collection(firestore, "Messages");
  // const messageArray1Ref = collection(firestore, "Messages1");
  // const messageArray2Ref = collection(firestore, "Messages2");
  // const messageArray3Ref = collection(firestore, "Messages3");
  // const messageArray4Ref = collection(firestore, "Messages4");
  // const messageArraySeqRef = collection(firestore, "MessagesSeq");
  // const [messageArray, setMessageArray] = useState(null);
  // const [messageArray1, setMessageArray1] = useState(null);
  // const [messageArray2, setMessageArray2] = useState(null);
  // const [messageArray3, setMessageArray3] = useState(null);
  // const [messageArray4, setMessageArray4] = useState(null);
  // const [messageArraySequence, setMessageArraySequence] = useState(null);

  // useEffect(() => {
  //   const getMessagesArray = async () => {
  //     const { docs } = await getDocs(messageArrayRef);
  //     const arr = docs.map((doc) => ({ ...doc.data().message }));
  //     setMessageArray(arr);
  //   };
  //   const getMessages1Array = async () => {
  //     const { docs } = await getDocs(messageArray1Ref);
  //     const arr = docs.map((doc) => ({ ...doc.data().message }));
  //     setMessageArray1(arr);
  //   };
  //   const getMessagesArray2 = async () => {
  //     const { docs } = await getDocs(messageArray2Ref);
  //     const arr = docs.map((doc) => ({ ...doc.data().message }));
  //     setMessageArray2(arr);
  //   };
  //   const getMessagesArray3 = async () => {
  //     const { docs } = await getDocs(messageArray3Ref);
  //     const arr = docs.map((doc) => ({ ...doc.data().message }));
  //     setMessageArray3(arr);
  //   };
  //   const getMessagesArray4 = async () => {
  //     const { docs } = await getDocs(messageArray4Ref);
  //     const arr = docs.map((doc) => ({ ...doc.data().message }));
  //     setMessageArray4(arr);
  //   };
  //   const getMessagesArraySeq = async () => {
  //     const { docs } = await getDocs(messageArraySeqRef);
  //     const arr = docs.map((doc) => ({ ...doc.data().message }));
  //     setMessageArraySequence(arr);
  //   };
  //   if (!messageArray) getMessagesArray();
  //   if (!messageArray1) getMessages1Array();
  //   if (!messageArray2) getMessagesArray2();
  //   if (!messageArray3) getMessagesArray3();
  //   if (!messageArray4) getMessagesArray4();
  //   if (!messageArraySequence) getMessagesArraySeq();
  // }, [
  //   messageArray,
  //   messageArray1,
  //   messageArray2,
  //   messageArray3,
  //   messageArray4,
  //   messageArraySequence,
  // ]);
  const {
    messageArray,
    messageArray1,
    messageArray2,
    messageArray3,
    messageArray4,
    messageArraySequence,
  } = useLoaderData();
  useEffect(() => {
    const temp = messageArray4[1];
    messageArray4[1] = messageArray4[0];
    messageArray4[0] = temp;

    console.log(
      messageArray,
      messageArray1,
      messageArray2,
      messageArray3,
      messageArray4,
      messageArraySequence
    );
  }, []);
  const [messages, setMessages] = useState([]);
  const [selectedMessagingOption, setSelectedMessagingOption] = useState(null);

  const [targetDate, setTargetDate] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const messagesEndRef = useRef(null);
  const [loadings, setLoadings] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [mobile, setMobile] = useState("Undefined");
  const [whatsapp, setWhatsapp] = useState("Undefined");
  const [telegram, setTelegram] = useState("Undefined");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleWhatsappChange = (e) => {
    setWhatsapp(e.target.value);
  };

  const handleTelegramChange = (e) => {
    setTelegram(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString); // Store the selected date as a string
  };

  const [emailVerified, setEmailVerified] = useState("");
  const [ContactButtonDisable, setContactDisable] = useState("");

  useEffect(() => {
    if (emailVerified !== "") {
      handleSheet(emailVerified);
    }
  }, [emailVerified]); // Only run when emailVerified changes

  const verifyEmailWithHunter = async (email) => {
    try {
      const response = await fetch(
        `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=2cc0cf1be11faa5dc2727d2ac5c3d966c3972913`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Hunter.io response:", data); // Log the full response

      return data.data.status === "valid";
    } catch (error) {
      console.error("Error verifying email with Hunter.io:", error);
      return false;
    }
  };

  // const verifyEmailWithZeroBounce = async (email) => {
  //   const apiKey = "9e44a32a8d9d43ecb0e5c79cb7cae972"; // Not recommended to expose this in client-side code
  //   const url = `https://api.zerobounce.net/v2/validate?email=${encodeURIComponent(
  //     email
  //   )}&apiKey=${apiKey}`;

  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();

  //     // Add logic based on ZeroBounce's response format
  //     return data.status === "Valid";
  //   } catch (error) {
  //     console.error("Error verifying email with ZeroBounce:", error);
  //     return false;
  //   }
  // };

  const handleParagraphClick = async () => {
    if (email) {
      // Verify the email using ZeroBounce
      const isEmailValid = await verifyEmailWithHunter(email);
      setEmailVerified(isEmailValid ? "Yes" : "No");

      if (!isEmailValid) {
        console.error("Invalid email address.");
        return;
      }
      // Generate a token or unique identifier
      const token = Math.random().toString(36).substr(2, 9);

      // Generate the verification link
      const verificationLink = `https://trade-investing.vercel.app/verify-email?token=${token}`;

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
          // setEmailVerified("Yes");
        } else {
          console.error("Failed to send verification email");
          // setEmailVerified("No");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        if (
          error.message.includes(
            "The email account that you tried to reach does not exist"
          )
        ) {
          // setEmailVerified("No");
        } else {
          // Handle other types of errors here
          // setEmailVerified("No"); // or a different status based on the error
        }
      }
      console.log("hello donkey");
      console.log("Email Verified:", emailVerified);
      // await handleSheet();
    } else {
      console.error("Email not provided");
    }
  };

  const handleSheet = async (emailVerified) => {
    try {
      const data = [
        name,
        email,
        currency,
        amount,
        selectedDate,
        mobile,
        telegram,
        whatsapp,
        emailVerified,
      ];

      // Transform 'undefined' values into the string "undefined"
      const transformedData = data.map((item) =>
        item === undefined ? "undefined" : item
      );

      const response = await fetch(
        "https://v1.nocodeapi.com/subhanshahzad12/google_sheets/lBotLvPuZyQkdTFT?tabId=Sheet1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([transformedData]),
        }
      );

      await response.json();
    } catch (error) {
      console.log(error);
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
    const chatSequence = messageArraySequence;
    const temp = chatSequence.pop();
    chatSequence.unshift(temp);
    const temp2 = chatSequence.pop();
    chatSequence.unshift(temp2);
    const addMessageWithDelay = (message, index) => {
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, message]);
      }, index * delay);
    };

    const runChatSequence = async () => {
      if (chatSequence) {
        for (let i = 0; i < chatSequence.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          addMessageWithDelay(chatSequence[i], i);
        }
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
  const validateMobileAndProceed = () => {
    // Check if the mobile number is not empty
    if (!mobile) {
      alert("Please enter a mobile number.");
      return;
    }

    // Check if the mobile number is an integer
    const isInteger = /^[0-9]+$/.test(mobile);
    if (!isInteger) {
      alert("Please enter a valid mobile number");
      return;
    }

    // If validation passes, proceed with showModal and handleSheet
    showModal();
    // handleSheet();
  };

  const validateTelegramAndProceed = () => {
    // Check if the Telegram input is not empty
    if (!telegram) {
      alert("Please enter your Telegram username or ID.");
      return;
    }

    // If validation passes, proceed with showModal and handleSheet
    showModal();
    // handleSheet();
  };
  const validateWhatsappAndProceed = () => {
    // Check if the WhatsApp input is not empty
    if (!whatsapp) {
      alert("Please enter your WhatsApp number or ID.");
      return;
    }

    // If validation passes, proceed with showModal and handleSheet
    showModal();
    // handleSheet();
  };

  const validateDateAndHandleButtonClick = () => {
    // Check if the date is selected
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    // If validation passes, call handleButtonClick
    handleButtonClick([{ type: "name", content: "" }, ...messageArray4]);
  };

  const validateAmountAndHandleButtonClick = () => {
    // Convert entered amount to a number
    const amountNumber = parseFloat(amount);

    // Check if the amount is a valid number and greater than 0
    if (isNaN(amountNumber) || amountNumber < 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    // If validation passes, call handleButtonClick
    handleButtonClick([{ type: "name", content: "" }, ...messageArray3]);
  };

  const validateAndHandleButtonClick = () => {
    // Basic email regex for validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Validate Name
    if (!name || name.trim() === "") {
      alert("Please enter a valid name.");
      return;
    }

    // Validate Email
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    handleButtonClick([
      { type: "name", content: "" },
      ...messageArray, // Use spread syntax to include the imported messageArray
    ]);
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
              <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
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
              onClick={validateAndHandleButtonClick}
            >
              Send
            </Button>
          </div>
        );

      case "YesNo":
        return (
          <Row gutter={8} style={{ marginBottom: "18px" }}>
            <Col>
              {" "}
              <Button
                className="bg-blue-500 text-white"
                onClick={() =>
                  handleButtonClick([
                    {
                      type: "bot",
                      content:
                        "Acknowldged! Let's get started with 3 Swift Questions",
                    },
                    { type: "name", content: "" },
                    ...messageArray2,
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
                onChange={(e) => setAmount(e.target.value)}
                addonBefore={
                  <Form.Item name="currency" noStyle>
                    <Select
                      style={{
                        width: 100,
                      }}
                      defaultValue="USD"
                      onChange={(value) => setCurrency(value)}
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
              onClick={validateAmountAndHandleButtonClick}
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
              <DatePicker
                placeholder="yyyy-mm-dd"
                className="w-full"
                onChange={handleDateChange} // Attach the event handler here
              />
            </Form.Item>

            <Button
              className="bg-blue-500 text-white -mt-3"
              onClick={validateDateAndHandleButtonClick}
            >
              Send
            </Button>
          </div>
        );
      case "card":
        return (
          <div
            onClick={() => {
              if (ContactButtonDisable === "") {
                handleButtonClick([
                  { type: "name", content: "" },
                  { type: `${message.content}`, content: "" },
                ]);
                setContactDisable(message.content);
              }
            }}
            className={`${
              ContactButtonDisable === message.content ||
              ContactButtonDisable === ""
                ? "bg-blue-100 text-blue-700 cursor-pointer"
                : "bg-gray-100 text-gray-700"
            } font-semibold p-2 mb-3 w-48 rounded-lg flex items-center justify-center`}
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
              <Input
                placeholder="Mobile Number"
                onChange={handleMobileChange}
              />
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
                  onClick={validateMobileAndProceed}
                  style={{ cursor: "pointer" }}
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
              <Input
                placeholder="Telegram"
                prefix={<FaTelegram />}
                onChange={handleTelegramChange}
              />
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
                  onClick={validateTelegramAndProceed}
                  style={{ cursor: "pointer" }}
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
              <Input
                placeholder="WhatsApp"
                prefix={<WhatsAppOutlined />}
                onChange={handleWhatsappChange}
              />
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
                  onClick={validateWhatsappAndProceed}
                  style={{ cursor: "pointer" }}
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
      <div>
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
                        ...messageArray1,
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
                <p className="w-full md:w-1/3 p-1 font-semibold">{name}</p>

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
      </div>
    </>
  );
};

export default ChatbotComponent;
