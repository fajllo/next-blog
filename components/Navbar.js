import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../lib/contex";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="Navbar w-screen h-16 bg-neutral-100 border-b-2 md:m-2 flex items-center text-2xl ">
      <ul className="flex justify-between w-full mx-4 md:mx-12">
        <li>
          {" "}
          <Link href="/">
            <button className="text-white bg-gray-800 py-2 px-4 rounded-lg">
              Fsdr_Blog
            </button>
          </Link>
        </li>
        {/* {user is signed in and has user name} */}
        {user && (
          <div className="flex items-center">
            <li>
              <Link href="/admin">
                <button className="text-white bg-emerald-500 py-2 px-4 rounded-lg">
                  write post
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
                  className="w-12 h-12 mx-4 rounded-full "
                  src={user?.photoURL}
                />
              </Link>
            </li>
          </div>
        )}
        {/* {user is NOT signed or has not created user name} */}
        {!user && (
          <>
            <li>
              <Link href="/enter">
                <button className="text-white bg-violet-500 py-2 px-4 rounded-lg">
                  sign in
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
