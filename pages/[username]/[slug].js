import { getUserWithUsername, postToJSON, firestore } from "../../lib/firebase";
export async function getStaticProps({ params }) {
  const { username, slug } = params;

  const userDoc = await getUserWithUsername(username);
  // JSON serializable data
  let post = null;
  let path = null;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }
  return {
    props: { post, path },
    revalidate: 5000,
  };
}
export async function getStaticPaths() {
  const snapshot = await firestore.collection("posts").get();
  const paths = snapshot.docs.map(doc => {
    const { slug, username } = doc.data();
    return { params: { username, slug } };
  });
  return {
    paths,
    fallback: "blocking",
  };
}

export default function PostPage({}) {
  return (
    <main>
      {" "}
      <h1>admin page </h1>
    </main>
  );
}
