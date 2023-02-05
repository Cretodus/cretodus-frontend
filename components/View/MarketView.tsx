import React from "react";
import FileTable from "../File/FileTable";
import { useQuery } from "@tanstack/react-query";
import cretodusApiService from "@/services/cretodusApi.service";
import Spinner from "../Spinner";

export default function MarketView() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["marketData"],
    queryFn: () => cretodusApiService.getOffers().then((res) => res.data),
  });

  return (
    <div className="mt-10">
      <p className="text-gray-900 font-bold text-3xl pb-1.5">Market</p>
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
