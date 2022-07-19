import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCdOLAo4cqn4AD4PUlMOwqANtLKtN5qm3A",
  authDomain: "crwn-clothing-db-b00dc.firebaseapp.com",
  projectId: "crwn-clothing-db-b00dc",
  storageBucket: "crwn-clothing-db-b00dc.appspot.com",
  messagingSenderId: "512156786946",
  appId: "1:512156786946:web:06424d32dd220ad411e21b",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log("error creating user", err);
    }
  }

  return userDocRef;
};
