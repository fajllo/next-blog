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
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

// helper functions

/*
* gets a users/{uid} document with username
* @param {string} username

*/
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
