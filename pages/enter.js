import { auth, googleAuthProvider } from "../lib/firebase";

export default function EnterPage(props) {
  const user = null;
  const username = null;
  // 1. user singed out -> render sing in button
  // 2. user singe in but missing castom user name -> render  user name form
  // 3. user singed in and has a user name -> render sing out button
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SingOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

function SignInButton() {
  const singInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return <button onClick={singInWithGoogle}>Google sign in</button>;
}
function SingOutButton() {
  return <button onClick={() => auth.signOut()}>sign out</button>;
}
function UsernameForm() {
  return null;
}
