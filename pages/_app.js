import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/contex";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "../lib/firebase";

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    // turn of realtime subscription
    let unsubscribe;
    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot(doc => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
    return unsubscribe;
  }, [user]);
  return (
    <>
      <UserContext.Provider value={{ user, username }}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster /*position="top-left"*/ />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
