import { Link, Button, Spacer } from "@nextui-org/react";

// next serverside rendering

export default function PostFeed({ posts, admin }) {
  console.log(posts[0].s);
  const postItems = posts
    ? posts.map(post => {
        <PostItem post={post} key={post.slug} admin={admin} />;
      })
    : null;

  return (
    <div className="flex flex-col w-full md:px-24 py-12 px-8">
      <PostItem post={posts[0]} key={posts[0].slug} admin={admin} />
      {postItems}
    </div>
  );
}

function PostItem({ post, admin = false }) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  return (
    <div className="flex flex-col w-full md:w-1/2 gap-2  dark:border-slate-50 border-2 p-8 rounded-lg">
      <header className="flex  items-center">
        <h1>@{post.username} </h1>
        <Spacer x={0.5} />
        <Button bordered color="warning" auto>
          <Link color="warning" href={`/${post.username}`}>
            Viwe Author
          </Link>
        </Button>
      </header>
      <main>{post.content}</main>
      <footer className="flex justify-between items-center">
        <div className="flex gap-2">
          {" "}
          <h1>Words: {wordCount} </h1>
          <h1> Minutes to read: {minutesToRead}</h1>
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
