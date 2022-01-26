import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContex } from "../lib/contex";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserContex.Provider value={{ user: {}, username: "filip" }}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster /*position="top-left"*/ />
      </UserContex.Provider>
    </>
  );
}

export default MyApp;
