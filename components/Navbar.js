import Link from "next/link";
import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/contex";
import { useRouter } from "next/router";

import { Avatar } from "@nextui-org/react";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  // console.log(userData.user);
  const router = useRouter();
  const signOut = () => {
    auth.signOut();
    router.reload();
  };
  const singInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <nav className="Navbar w-screen h-16 flex items-center text-xl shadow-md shadow-black">
      <ul className="flex justify-between w-full mx-4 md:mx-12 items-center">
        <li>
          {" "}
          <Link href="/">
            <button className="text-white bg-gray-800 ">Fsdr</button>
          </Link>
        </li>

        {!username && (
          <li>
            <button className="bg-custom_yellow  " onClick={singInWithGoogle}>
              G SignIn
            </button>
          </li>
        )}

        {/* {user is signed in and has user name} */}
        {username && (
          <div className="flex items-center">
            <li>
              <button
                onClick={signOut}
                className=" mx-2  bg-custom_red text-white "
              >
                {" "}
                sign out
              </button>
            </li>

            <li>
              <Link href="/admin">
                <button className=" bg-emerald-500 ">new</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                {/* pierwsze jest dobre tylko trzeba to skonfigurowac jak ju będą jakieś zdjęcia  */}
                {/* <Image src={{user?.photoURL}}></Image>  */}
                {/* <Image
                  src={
                    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2360&q=80"
                  }
                ></Image> */}
                <Avatar
                  size="lg"
                  src={user?.photoURL || "user.jpeg"}
                  color="gradient"
                  bordered
                  squared
                />
              </Link>
            </li>
          </div>
        )}
        {/* {user is NOT signed or has not created user name} */}
      </ul>
    </nav>
  );
}
function MyLink(props) {
  let { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}


