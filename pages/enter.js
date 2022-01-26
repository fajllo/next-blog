import { auth, googleAuthProvider, firestore } from "../lib/firebase";
import { useContext, useEffect, useCallback, useState } from "react";
import { UserContext } from "../lib/contex";

import debounce from "lodash.debounce";

export default function EnterPage(props) {
  const { user, username } = useContext(UserContext);

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
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useContext(UserContext);

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async username => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usersnames/${username}`);

        const { exists } = await ref.get();

        setIsValid(!exists);
        setLoading(false);
      }
    }, 300),
    []
  );
  const handleSubmit = async e => {
    e.preventDefault();
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usersnames/${formValue}`);
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const handleChange = e => {
    // force input value to match correct format => lowercase, regex
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/; //

    // min 3 char to make name valid
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
    // checking username with regex
    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };
  return (
    !username && (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Choose your user name</label>
          <input
            type="text"
            name="username "
            id="username"
            placeholder="username..."
            value={formValue}
            onChange={handleChange}
          />
          <UsernameChecking
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button
            type="submit"
            className="m-4 bg-green-400  px-4 py-2 text-white rounded-xl "
            disabled={!isValid}
          >
            choose this name{" "}
          </button>
        </form>
        <h1>debugger</h1>
        <div>
          Username:{formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </div>
      </div>
    )
  );
}
function UsernameChecking({ username, isValid, loading }) {
  if (loading) {
    return <p>checking username...</p>;
  } else if (isValid) {
    return <p className = "text-green-500"> {username} is available</p>;
  } else if (username && !isValid) {
    return <p className = "text-rose-500">{username} is already taken </p>;
  } else {
    return <p></p>;
  }
}
