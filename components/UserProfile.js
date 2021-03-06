import { Avatar } from "@nextui-org/react";
export default function UserProfile({ user }) {
  return (
    <div className="flex flex-col w-full items-center gap-4 mt-4">
      <Avatar
        size=""
        src={user?.photoURL || "user.jpeg"}
        color="gradient"
        bordered
        squared
      />
      <p>@{user?.username || "no name"}</p>
      <h1>{user?.displayName || "no name"}</h1>
    </div>
  );
}
