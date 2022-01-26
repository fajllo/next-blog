import React from "react";

export default function Loader({ show }) {
  return (
    show && (
      <div className="Loader flex">
        <div className=" h-4 w-4 m-1 bg-green-300   animate-spin border-2 border-green-500"></div>
        <div className=" h-4 w-4 m-1 bg-sky-300 animate-spin  border-2 border-sky-500 "></div>
        <div className=" h-4 w-4 m-1 bg-violet-300 animate-spin border-2 border-violet-500 "></div>
      </div>
    )
  );
}
