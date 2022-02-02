import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/contex";
import { useUserData } from "../lib/hooks";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const { user, username } = useUserData();

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <UserContext.Provider value={{ user, username }}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster /*position="top-left"*/ />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
