import { Link, Button, Spacer } from "@nextui-org/react";

// next serverside rendering

export default function PostFeed({ posts, admin }) {
  const postItems = posts.map(post => {
    return <PostItem post={post} key={post.slug} admin={admin} />;
  });

  return (
    <div className="flex gap-y-2 flex-wrap w-full  py-12 px-2 justify-around">
      {postItems}
    </div>
  );
}

function PostItem({ post, admin = false }) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  return (
    <div className="md:px-2 flex flex-col w-full md:w-2/5 gap-2 shadow-md shadow-zinc-500 dark:bg-zinc-800 dark:border-slate-50 border-2 p-2 lg:p-4 rounded-lg">
      <header className="flex  items-center">
        <h1>@{post.username} </h1>
        <Spacer x={0.5} />
        <Button bordered color="warning" auto>
          <Link color="warning" href={`/${post.username}`}>
            Viwe Author
          </Link>
        </Button>
      </header>
      <main>{post.slug}</main>
      <footer className="flex justify-between items-center">
        <div className="flex gap-2 ">
          {" "}
          <div className="invisible lg:visible">
            <h1>Words: {wordCount}. </h1>
            <h1> Read time: {minutesToRead} min.</h1>
          </div>
        </div>
        <div className="flex items-center">
          {" "}
          <h1>♥️ {post.heartCount} hearts </h1>
          <Spacer x={0.5} />
          <Button bordered color="success" auto>
            <Link color="success" href={`/${post.username}/${post.slug}`}>
              Viwe post
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
