import React from "react";
import FileTable from "../File/FileTable";
import FileUploadBtn from "../File/FileUploadBtn";
import { useQuery } from "@tanstack/react-query";
import cretodusApiService from "@/services/cretodusApi.service";
import Spinner from "../Spinner";
import useWalletStore from "../../stores/WalletStore";

export default function MyFilesView() {
  const walletAddr = useWalletStore((state) => state.address);

  const { isLoading, error, data, refetch, isRefetching } = useQuery({
    queryKey: ["myOffersData", walletAddr],
    queryFn: () =>
      cretodusApiService
        .getMyOffers(walletAddr.toLowerCase())
        .then((res) => res.data),
    enabled: !!walletAddr,
  });

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-900 font-bold text-3xl">My Files</p>
        <FileUploadBtn refetch={refetch} isRefetching={isRefetching} />
      </div>
      <hr />
      {isLoading ? (
        <div className="flex justify-center items-center w-full pt-5">
          <Spinner />
        </div>
      ) : (
        <FileTable data={data} />
      )}
    </div>
  );
}
