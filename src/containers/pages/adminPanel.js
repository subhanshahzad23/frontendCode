import React, { useState, useEffect } from "react";
import { headerText } from "../HeaderText";
import { user } from "../User";
import { Button } from "antd";
import EditableCard from "../../components/EditableCard.jsx";
import { firestore } from "../../firebase.js";
import Alert from "@mui/material/Alert";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

const getInitialTargetDate = () => {
  const savedDate = localStorage.getItem("targetDate");
  if (savedDate) {
    return new Date(savedDate);
  } else {
    const newDate = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
    localStorage.setItem("targetDate", newDate.toISOString());
    return newDate;
  }
};
const AdminPanel = () => {
  const messageArrayRef = collection(firestore, "Messages");
  const messageArray1Ref = collection(firestore, "Messages1");
  const messageArray2Ref = collection(firestore, "Messages2");
  const messageArray3Ref = collection(firestore, "Messages3");
  const messageArray4Ref = collection(firestore, "Messages4");
  const messageArraySeqRef = collection(firestore, "MessagesSeq");
  const [messageArray, setMessageArray] = useState(null);
  const [updateCount, setUpdateCount] = useState(0);
  const [messageArray1, setMessageArray1] = useState(null);
  const [updateCount1, setUpdateCount1] = useState(0);
  const [messageArray2, setMessageArray2] = useState(null);
  const [updateCount2, setUpdateCount2] = useState(0);
  const [messageArray3, setMessageArray3] = useState(null);
  const [updateCount3, setUpdateCount3] = useState(0);
  const [messageArray4, setMessageArray4] = useState(null);
  const [updateCount4, setUpdateCount4] = useState(0);
  const [messageArraySequence, setMessageArraySequence] = useState(null);
  const [updateCountSeq, setUpdateCountSeq] = useState(0);
  const [successLogin, setSuccessLogin] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state) {
      if (location.state.isAuthenticated) {
        setSuccessLogin(true);
        setTimeout(() => {
          setSuccessLogin(null);
        }, 2500);
      }
    } else {
      setSuccessLogin(false);
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    }
  }, []);
  useEffect(() => {
    const getMessagesArray = async () => {
      const { docs } = await getDocs(messageArrayRef);
      let arr = docs.map((doc, i) => ({ ...doc.data().message }));
      docs.forEach((doc, i) => (arr[i].id = doc.id));
      setMessageArray(arr);
    };
    getMessagesArray();
  }, [updateCount]);
  useEffect(() => {
    const getMessages1Array = async () => {
      const { docs } = await getDocs(messageArray1Ref);
      let arr = docs.map((doc, i) => ({ ...doc.data().message }));
      docs.forEach((doc, i) => (arr[i].id = doc.id));
      setMessageArray1(arr);
    };
    getMessages1Array();
  }, [updateCount1]);
  useEffect(() => {
    const getMessagesArray2 = async () => {
      const { docs } = await getDocs(messageArray2Ref);
      let arr = docs.map((doc, i) => ({ ...doc.data().message }));
      docs.forEach((doc, i) => (arr[i].id = doc.id));
      setMessageArray2(arr);
    };
    getMessagesArray2();
  }, [updateCount2]);
  useEffect(() => {
    const getMessagesArray3 = async () => {
      const { docs } = await getDocs(messageArray3Ref);
      let arr = docs.map((doc, i) => ({ ...doc.data().message }));
      docs.forEach((doc, i) => (arr[i].id = doc.id));
      setMessageArray3(arr);
    };
    getMessagesArray3();
  }, [updateCount3]);
  useEffect(() => {
    const getMessagesArray4 = async () => {
      const { docs } = await getDocs(messageArray4Ref);
      let arr = docs.map((doc, i) => ({ ...doc.data().message }));
      docs.forEach((doc, i) => (arr[i].id = doc.id));
      setMessageArray4(arr);
    };
    getMessagesArray4();
  }, [updateCount4]);
  useEffect(() => {
    const getMessagesArraySeq = async () => {
      const { docs } = await getDocs(messageArraySeqRef);
      let arr = docs.map((doc, i) => ({ ...doc.data().message }));
      docs.forEach((doc, i) => (arr[i].id = doc.id));
      setMessageArraySequence(arr);
    };
    getMessagesArraySeq();
  }, [updateCountSeq]);
  const handleMessageArr = async (id, message) => {
    const docRef = doc(firestore, "Messages", id);
    try {
      await updateDoc(docRef, { message: message });
      setUpdateCount((updateCount) => updateCount + 1);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleMessageArr1 = async (id, message) => {
    const docRef = doc(firestore, "Messages1", id);
    try {
      await updateDoc(docRef, { message: message });
      setUpdateCount1((updateCount1) => updateCount1 + 1);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleMessageArr2 = async (id, message) => {
    const docRef = doc(firestore, "Messages2", id);
    try {
      await updateDoc(docRef, { message: message });
      setUpdateCount2((updateCount2) => updateCount2 + 1);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleMessageArr3 = async (id, message) => {
    const docRef = doc(firestore, "Messages3", id);
    try {
      await updateDoc(docRef, { message: message });
      setUpdateCount3((updateCount3) => updateCount3 + 1);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleMessageArr4 = async (id, message) => {
    const docRef = doc(firestore, "Messages4", id);
    try {
      await updateDoc(docRef, { message: message });
      setUpdateCount4((updateCount4) => updateCount4 + 1);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleMessageArrSeq = async (id, message) => {
    const docRef = doc(firestore, "MessagesSeq", id);
    try {
      await updateDoc(docRef, { message: message });
      setUpdateCountSeq((updateCountSeq) => updateCountSeq + 1);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      {successLogin === true && (
        <Alert severity="success">Logged in Successfully</Alert>
      )}
      {successLogin === false && (
        <Alert severity="error">Log in to continue</Alert>
      )}
      {messageArray &&
        messageArray.map((message, i) => (
          <EditableCard
            key={message.id}
            message={message}
            handleMessageArr={handleMessageArr}
          />
        ))}
      {messageArray1 &&
        messageArray1.map((message, i) => (
          <EditableCard
            key={message.id}
            message={message}
            handleMessageArr={handleMessageArr1}
          />
        ))}
      {messageArray2 &&
        messageArray2.map((message, i) => (
          <EditableCard
            key={message.id}
            message={message}
            handleMessageArr={handleMessageArr2}
          />
        ))}
      {messageArray3 &&
        messageArray3.map((message, i) => (
          <EditableCard
            key={message.id}
            message={message}
            handleMessageArr={handleMessageArr3}
          />
        ))}
      {messageArray4 &&
        messageArray4.map((message, i) => (
          <EditableCard
            key={message.id}
            message={message}
            handleMessageArr={handleMessageArr4}
          />
        ))}
      {messageArraySequence &&
        messageArraySequence.map((message, i) => (
          <EditableCard
            key={message.id}
            message={message}
            handleMessageArr={handleMessageArrSeq}
          />
        ))}
    </div>
  );
};
export default AdminPanel;

// const allMsg = [...messageArraySequence, ...messageArray1, ...messageArray2, ...messageArray3, ...messageArray4,...messageArray]
// const AdminPanel = () => {
//   const [header1Text, setHeader1Text] = useState(
//     headerText(getInitialTargetDate()).header1
//   );
//   const [header2Text, setHeader2Text] = useState(
//     headerText(getInitialTargetDate()).header2
//   );

//   const [messageData, setMessageData] = useState(

//     allMsg.map((data) => ({ content: data.content }))
//   );

//   useEffect(() => {
//     // Save the updated header and message data to localStorage whenever they change
//     localStorage.setItem('header1Text', header1Text);
//     localStorage.setItem('header2Text', header2Text);
//     localStorage.setItem('messageData', JSON.stringify(messageData));
//   }, [header1Text, header2Text, messageData]);

//   const handleInputChange = (index, value) => {
//     const updatedMessageData = [...messageData];
//     updatedMessageData[index].content = value;
//     setMessageData(updatedMessageData);
//   };

//   return (
//     <>
//       <div className="p-10">
//         <div className="flex border">
//           <h1 className="bg-red-200">User Name:</h1> <input value={user.name} />
//         </div>
//         <div>
//           <h1>Header Text </h1>
//           <div className="bg-red-200 flex">
//             <h2>Header 1 Text :</h2>
//             <input
//               className="w-full border"
//               type="text"
//               value={header1Text}
//               onChange={(e) => setHeader1Text(e.target.value)}
//             />
//           </div>
//           <br />
//           <div className="bg-red-200 flex">
//             <h2>Header 2 Text :</h2>
//             <input
//               className="w-full border"
//               type="text"
//               value={header2Text}
//               onChange={(e) => setHeader2Text(e.target.value)}
//             />
//           </div>
//           <h1 className="text-xl mt-10">Message Data</h1>
//           <div className="bg-red-200">
//             {messageData.map((data, index) => (
//               <div key={index}>
//                 <h2>{index + 1} Message</h2>
//                 <input
//                   className="w-full border"
//                   type="text"
//                   value={messageData[index].content}
//                   onChange={(e) => handleInputChange(index, e.target.value)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className='text-center p-5'>
//        <Button >Update</Button>
//       </div>
//     </>
//   );
// };

// export default AdminPanel;
