import React from "react";

export default function Loader({ show }) {
  return (
    show && (
      <div className="Loader flex">
        <div className=" h-16 w-16 border-t-8 border-l-8 border-green-300 animate-spin rounded-full "></div>
        <div className=" h-16 w-16 border-t-8 border-l-8 border-sky-300 animate-spin rounded-full "></div>
        <div className=" h-16 w-16 border-t-8 border-l-8 border-violet-300 animate-spin rounded-full "></div>
      </div>
    )
  );
}
