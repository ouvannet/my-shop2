import firebase from 'firebase/compat/app';
import { getDatabase } from "firebase/database";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCyn6Fx1HY_E3TFhgRdjYiE1dWUOamjCxg",
  authDomain: "react-shop-vannet.firebaseapp.com",
  projectId: "react-shop-vannet",
  storageBucket: "react-shop-vannet.appspot.com",
  messagingSenderId: "391195415968",
  appId: "1:391195415968:web:220d212d4192696fb7c0c5"
};

const fireDb=firebase.initializeApp(firebaseConfig);
export const storage=getStorage(fireDb);
export default fireDb.database().ref();