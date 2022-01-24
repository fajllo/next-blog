import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestorage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCp8-OH9USwd089hJ3m3CW3lRyRJyT5eKI",

  authDomain: "next-blog-85914.firebaseapp.com",

  projectId: "next-blog-85914",

  storageBucket: "next-blog-85914.appspot.com",

  messagingSenderId: "315471204331",

  appId: "1:315471204331:web:3dc8ffc936b80e344cd3ae",
};

if (!firebase.getApps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
