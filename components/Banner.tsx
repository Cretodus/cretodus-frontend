import Image from "next/image";
import React from "react";

interface IProps {
  title: string;
  subtitle: string;
}

const Banner: React.FC<IProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-black w-full h-44 rounded-xl relative">
      <Image
        src={"/star-bg.png"}
        fill={true}
        alt="star-bg"
        className="absolute select-none animate-pulse"
      />
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-white animate-none font-medium text-xl absolute text-center">
          <span className="font-bold text-2xl">{title}</span> <br />
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default Banner;
