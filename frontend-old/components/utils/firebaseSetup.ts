import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD2fU227wwW8p0u8E3H6EsD6yq58fRyBho",
  authDomain: "next-role.firebaseapp.com",
  projectId: "next-role",
  storageBucket: "next-role.appspot.com",
  messagingSenderId: "746237339558",
  appId: "1:746237339558:web:4b2997ed3e4e90c0ded167",
  measurementId: "G-X2VDHB1N38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analyticsByEnv = process.env.NODE_ENV !== 'production' ? null :  isSupported().then(yes => yes ? getAnalytics(app) : null)
export const analytics =  analyticsByEnv
