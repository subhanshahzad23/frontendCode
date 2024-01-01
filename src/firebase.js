import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCDv-6LjpxQ_9PNKSeNaUwwRCtNuvcG9ig",
  authDomain: "messagedata-37154.firebaseapp.com",
  databaseURL: "https://messagedata-37154-default-rtdb.firebaseio.com",
  projectId: "messagedata-37154",
  storageBucket: "messagedata-37154.appspot.com",
  messagingSenderId: "429525642603",
  appId: "1:429525642603:web:869a9ff114fadaabbff02e"
};


const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);