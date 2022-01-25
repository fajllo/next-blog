import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCp8-OH9USwd089hJ3m3CW3lRyRJyT5eKI",
  authDomain: "next-blog-85914.firebaseapp.com",
  projectId: "next-blog-85914",
  storageBucket: "next-blog-85914.appspot.com",
  messagingSenderId: "315471204331",
  appId: "1:315471204331:web:3dc8ffc936b80e344cd3ae",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
