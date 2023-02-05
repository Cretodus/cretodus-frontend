import { useRouter } from "next/router";
import * as React from "react";
import ConnectWalletBtn from "../ConnectWalletBtn";
import useWalletStore from "../../stores/WalletStore";

const Navbar: React.FC = () => {
  const router = useRouter();
  const isConnect = useWalletStore((state) => state.address);

  return (
    <div className="h-20 w-full bg-black px-24 flex justify-between items-center">
      <div className="flex items-center">
        <p
          className="text-white font-bold text-2xl select-none cursor-pointer hover:text-gray-50"
          onClick={() => router.push("/")}
        >
          Cretodus
        </p>
        <div className="flex ml-20 space-x-7">
          <p
            className={`text-white font-medium select-none cursor-pointer hover:text-gray-50 ${
              router.pathname === "/" ? "underline" : "underline-none"
            }`}
            onClick={() => router.push("/")}
          >
            Market
          </p>
          {isConnect && (
            <p
              className={`text-white font-medium select-none cursor-pointer hover:text-gray-50 ${
                router.pathname === "/my-files" ? "underline" : "underline-none"
              }`}
              onClick={() => router.push("/my-files")}
            >
              My Files
            </p>
          )}
        </div>
      </div>
      <ConnectWalletBtn />
    </div>
  );
};

export default Navbar;
