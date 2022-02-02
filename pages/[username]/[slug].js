import { getUserWithUsername, postToJSON, firestore } from "../../lib/firebase";
import PostContent from "../../components/PostContent";
import { useDocumentData } from "react-firebase-hooks/firestore";

export async function getServerSideProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  // JSON serializable data
  let user = null;
  let post = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = firestore
      .collectionGroup("posts")
      .where("slug", "==", slug)
      .where("username", "==", username)
      .limit(1);
    post = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { post },
  };
}

// export async function getStaticPaths() {
//   // Improve my using Admin SDK to select empty docs
//   const snapshot = await firestore.collectionGroup("posts").get();

//   const paths = snapshot.docs.map(doc => {
//     const { slug, username } = doc.data();
//     return {
//       params: { username, slug },
//     };
//   });

//   return {
//     // must be in this format:
//     // paths: [
//     //   { params: { username, slug }}
//     // ],
//     paths,
//     fallback: "blocking",
//   };
// }

export default function PostPage(props) {
  return (
    <main>
      {" "}
      <PostContent post={props.post} />
    </main>
  );
}
