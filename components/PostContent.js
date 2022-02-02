import ReactMarkdown from "react-markdown";
import { Link } from "@nextui-org/react";

export default function PostContent({ post }) {
  const { content, slug, username, createdAt, title } = post[0];
  console.log("post content in component", content);
  const date = new Date(createdAt );

  return (
    <div className=" PostContent flex flex-col  items-center">
      <div>
        {" "}
        <h1>{title}</h1>
        <span>
          {" "}
          Written By{" "}
          <Link href={`/${username}`} icon color="warning">
            {username}
          </Link>
          <br />
          On: {date.toUTCString()}
        </span>
        <h1>{slug}</h1>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
