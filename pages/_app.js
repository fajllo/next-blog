import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/contex";
import { useUserData } from "../lib/hooks";

function MyApp({ Component, pageProps }) {
  const { user, username } = useUserData();

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
