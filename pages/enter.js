import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/contex";

export default function EnterPage(props) {
  const { user, username } = useContext(UserContext);
  // 1. user singed out -> render sing in button
  // 2. user singe in but missing castom user name -> render  user name form
  // 3. user singed in and has a user name -> render sing out button
  return (
    <main>
      {user ? !user ? <UsernameForm /> : <SingOutButton /> : <SignInButton />}
    </main>
  );
}

function SignInButton() {
  const singInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <button
      className="m-4 bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-2 text-white rounded-xl"
      onClick={singInWithGoogle}
    >
      Google SignIn
    </button>
  );
}
function SingOutButton() {
  return (
    <button
      className="m-4 bg-gradient-to-r from-pink-400 to-rose-500 px-4 py-2 text-white rounded-xl "
      onClick={() => auth.signOut()}
    >
      sign out
    </button>
  );
}
function UsernameForm() {
  return null;
}
