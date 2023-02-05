import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";

export default function FileSearchBar() {
  return (
    <div className="flex items-center bg-gray-100 rounded-md p-1.5">
      <AiOutlineFileSearch className="text-3xl mr-1.5 text-gray-400" />
      <input
        className="focus:outline-none bg-gray-100 pr-20"
        placeholder="Search File CID"
      />
    </div>
  );
}
