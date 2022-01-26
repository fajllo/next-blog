import Link from "next/link";
import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/contex";
import { useRouter } from "next/router";

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
    <nav className="Navbar w-screen h-16 bg-neutral-100 border-b-2  flex items-center text-2xl shadow-lg ">
      <ul className="flex justify-between w-full mx-4 md:mx-12">
        <li>
          {" "}
          <Link href="/">
            <button className="text-white bg-gray-800 py-2 px-4 rounded-lg">
              Fsdr
            </button>
          </Link>
        </li>
        {!username && (
          <li>
            <button
              className="bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-2 text-white rounded-xl"
              onClick={singInWithGoogle}
            >
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
                className=" mx-2 bg-gradient-to-r from-pink-400 to-rose-500 px-4 py-2 text-white rounded-xl "
              >
                {" "}
                sign out
              </button>
            </li>

            <li>
              <Link href="/admin">
                <button className="text-white bg-emerald-500 py-2 px-4 rounded-lg">
                  new
                </button>
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
                <img
                  className="w-12 h-12 ml-2 rounded-full "
                  src={user?.photoURL}
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
