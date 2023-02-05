import React from "react";
import useWalletStore from "../stores/WalletStore";
import { truncateAddress } from "../utils/truncateAddress";
import Spinner from "./Spinner";

export default function ConnectWalletBtn() {
  const sessionLoading = useWalletStore((state) => state.sessionLoading);
  const walletAddr = useWalletStore((state) => state.address);
  const connectMetamask = useWalletStore((state) => state.connectMetamask);

  return (
    <div className="bg-white rounded-full px-4 py-1.5 text-black font-medium hover:bg-gray-200">
      {sessionLoading ? (
        <Spinner />
      ) : walletAddr ? (
        <p className="select-none">{truncateAddress(walletAddr)}</p>
      ) : (
        <p className="cursor-pointer" onClick={connectMetamask}>
          Connect Wallet
        </p>
      )}
    </div>
  );
}
