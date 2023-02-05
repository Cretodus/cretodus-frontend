import React from "react";
import { AiOutlineFileDone, AiOutlineFileSync } from "react-icons/ai";

export default function FileStatusSelector() {
  return (
    <div className="bg-gray-100 rounded flex items-center p-1.5 space-x-3">
      <div className="flex items-center space-x-1 text-gray-600 p-1.5 rounded px-5 bg-white">
        <AiOutlineFileSync />
        <div className="font-medium text-sm">New</div>
      </div>
      <div className="flex items-center space-x-1 text-gray-600 p-1.5 rounded px-3">
        <AiOutlineFileDone />
        <div className="font-medium text-sm">Completed</div>
      </div>
    </div>
  );
}
