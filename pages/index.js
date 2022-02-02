import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { UserContext } from "../lib/contex";
import { firestore, postToJSON, fromMillis } from "../lib/firebase";
import Loader from "../components/Loader";
import PostFeed from "../components/PostFeed";
import { Button } from "@nextui-org/react";

const LIMIT = 10;
export async function getServerSideProps() {
  // collectionGroup allows to query nestes colection posts is in users
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return { props: { posts } };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const { user } = useContext(UserContext);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;
    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map(doc => doc.data());
    console.log(newPosts);

    setPosts(posts.concat(newPosts));
    setLoading(false);
    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };
  return (
    <>
      <div className=" px-2 md:px-12">
        <button
          onClick={() =>
            toast.custom(t => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
              >
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.photoURL}
                        alt="user.jpeg"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        user name
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        created new post!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-gray-200">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-rose-600 hover:text-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-red-100"
                  >
                    Close
                  </button>
                </div>
              </div>
            ))
          }
        >
          click me
        </button>
        <PostFeed posts={posts} />
        {!loading && !postsEnd && (
          <Button shadow color="warning" auto onClick={getMorePosts}>
            Load More
          </Button>
        )}
        <Loader show={loading} />
        {postsEnd && "you have reached the end!"}
      </div>
    </>
  );
}
