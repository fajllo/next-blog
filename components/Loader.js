import React from "react";

export default function Loader({ show }) {
  return (
    show && (
      <div className="Loader flex">
        <div className=" h-8 w-8 m-2 bg-green-300   animate-spin border-2 border-green-500"></div>
        <div className=" h-8 w-8 m-2 bg-sky-300 animate-spin  border-2 border-sky-500 "></div>
        <div className=" h-8 w-8 m-2 bg-violet-300 animate-spin border-2 border-violet-500 "></div>
      </div>
    )
  );
}
