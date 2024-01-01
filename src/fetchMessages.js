import { firestore } from "./firebase";
import { collection, getDocs } from "@firebase/firestore";
const getMessages = async () => {
  const messageArrayRef = collection(firestore, "Messages");
  try {
    const { docs } = await getDocs(messageArrayRef);
    return docs.map((doc) => ({ ...doc.data().message }));
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
const getMessages1 = async () => {
  const messageArrayRef = collection(firestore, "Messages1");
  try {
    const { docs } = await getDocs(messageArrayRef);
    return docs.map((doc) => ({ ...doc.data().message }));
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
const getMessages2 = async () => {
  const messageArrayRef = collection(firestore, "Messages2");
  try {
    const { docs } = await getDocs(messageArrayRef);
    return docs.map((doc) => ({ ...doc.data().message }));
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
const getMessages3 = async () => {
  const messageArrayRef = collection(firestore, "Messages3");
  try {
    const { docs } = await getDocs(messageArrayRef);
    return docs.map((doc) => ({ ...doc.data().message }));
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
const getMessages4 = async () => {
  const messageArrayRef = collection(firestore, "Messages4");
  try {
    const { docs } = await getDocs(messageArrayRef);
    return docs.map((doc) => ({ ...doc.data().message }));
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
const getMessagesSeq = async () => {
  const messageArrayRef = collection(firestore, "MessagesSeq");
  try {
    const { docs } = await getDocs(messageArrayRef);
    return docs.map((doc) => ({ ...doc.data().message }));
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
const fetchMessagesForChatBot = async () => {
  try {
    const messageArray = await getMessages();
    const messageArray1 = await getMessages1();
    const messageArray2 = await getMessages2();
    const messageArray3 = await getMessages3();
    const messageArray4 = await getMessages4();
    const messageArraySequence = await getMessagesSeq();
    return {
      messageArray,
      messageArray1,
      messageArray2,
      messageArray3,
      messageArray4,
      messageArraySequence,
    };
  } catch (err) {
    console.log(err.message);
  }
};
export default fetchMessagesForChatBot;
