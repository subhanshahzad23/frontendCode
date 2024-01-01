import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { messageArray, messageArraySequence } from "../containers/botChat";
import { firestore } from "../firebase";
import { addDoc, collection, getDocs } from "@firebase/firestore";
const Temp = () => {
  const ref = collection(firestore, "Messages");
  const [MessagesArr, setMessagesArr] = useState(null);
  const addData = async () => {};
  useEffect(() => {
    const getMessages = async () => {
      const { docs } = await getDocs(ref);
      const arr = docs.map(
        (doc) =>
          ({...doc.data().message})
      );
      setMessagesArr(arr);
    };
    getMessages();
    console.log(MessagesArr);
  }, [MessagesArr]);
  return (
    <div>
      <Button onClick={addData}>Add Data</Button>
    </div>
  );
};

export default Temp;
// const messageArrayRef = collection(firestore, 'Messages');
// const messageArray1Ref = collection(firestore, 'Messages1');
// const messageArray2Ref = collection(firestore, 'Messages2');
// const messageArray3Ref = collection(firestore, 'Messages3');
// const messageArray4Ref = collection(firestore, 'Messages4');
// const messageArraySeqRef = collection(firestore, 'MessagesSeq');
// const [messageArray, setMessageArray] = useState([]);
// const [messageArray1, setMessageArray1] = useState([]);
// const [messageArray2, setMessageArray2] = useState([]);
// const [messageArray3, setMessageArray3] = useState([]);
// const [messageArray4, setMessageArray4] = useState([]);
// const [messageArraySequence, setMessageArraySequence] = useState([]);

// useEffect(() => {
//   const getMessagesArray = async () => {
//     const { docs } = await getDocs(messageArrayRef);
//     const arr = docs.map(
//       (doc) =>
//         ({...doc.data().message})
//     );
//     setMessageArray(arr);
//   };
//   getMessagesArray();
// }, [messageArray]);

// useEffect(() => {
//   const getMessages1Array = async () => {
//     const { docs } = await getDocs(messageArray1Ref);
//     const arr = docs.map(
//       (doc) =>
//         ({...doc.data().message})
//     );
//     setMessageArray1(arr);
//   };
//   getMessages1Array();
// }, [messageArray1]);

// useEffect(() => {
//   const getMessagesArray2 = async () => {
//     const { docs } = await getDocs(messageArray2Ref);
//     const arr = docs.map(
//       (doc) =>
//         ({...doc.data().message})
//     );
//     setMessageArray2(arr);
//   };
//   getMessagesArray2();
// }, [messageArray2]);

// useEffect(() => {
//   const getMessagesArray3 = async () => {
//     const { docs } = await getDocs(messageArray3Ref);
//     const arr = docs.map(
//       (doc) =>
//         ({...doc.data().message})
//     );
//     setMessageArray3(arr);
//   };
//   getMessagesArray3();
// }, [messageArray3]);

// useEffect(() => {
//   const getMessagesArray4 = async () => {
//     const { docs } = await getDocs(messageArray4Ref);
//     const arr = docs.map(
//       (doc) =>
//         ({...doc.data().message})
//     );
//     setMessageArray4(arr);
//   };
//   getMessagesArray4();
// }, [messageArray4]);

// useEffect(() => {
//   const getMessagesArraySeq = async () => {
//     const { docs } = await getDocs(messageArraySeqRef);
//     const arr = docs.map(
//       (doc) =>
//         ({...doc.data().message})
//     );
//     setMessageArraySequence(arr);
//   };
//   getMessagesArraySeq();
// }, [messageArraySequence]);