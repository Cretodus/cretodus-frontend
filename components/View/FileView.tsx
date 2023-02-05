import React from "react";
import FileDetailCard from "../File/FileDetailCard";

interface IProps {
  oid: string;
}

const FileView: React.FC<IProps> = ({ oid }) => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col p-10 bg-white rounded-xl">
      <FileDetailCard oid={oid} />
    </div>
  );
};

export default FileView;
