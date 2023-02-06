import React from "react";
import { useState } from "react";
import cretodusContractService from "../../services/cretodusContract.service";
import Spinner from "../Spinner";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  oid: string;
  isEnd: boolean;
  spCount: number;
}

const FileClaimReward: React.FC<IProps> = ({ oid, isEnd, spCount }) => {
  const [dealId, setDealId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["marketData"],
    queryFn: () =>
      cretodusContractService.getRewardClaimed(oid).then((res) => res),
  });

  if (data) {
    return (
      <button
        disabled
        className="text-white p-3 rounded-xl text-center font-bold cursor-not-allowed flex justify-center items-center w-full bg-gray-300"
      >
        {loading ? <Spinner /> : "Reward Claimed"}
      </button>
    );
  }

  const handleFulFill = async () => {
    setLoading(true);
    try {
      if (spCount === 0) {
        const tx = await cretodusContractService.getExpiredReward(oid);
        await tx.wait();
      } else {
        const tx = await cretodusContractService.fulfilOffer(oid, dealId);
        await tx.wait();
      }
      refetch();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleGetReward = async () => {
    setLoading(true);
    try {
      const tx = await cretodusContractService.getReward(oid);
      await tx.wait();
      refetch();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <>
      {isEnd ? (
        <div
          onClick={handleGetReward}
          className="bg-black text-white p-3 rounded-xl text-center font-bold cursor-pointer hover:bg-gray-900 flex justify-center items-center"
        >
          {loading ? (
            <Spinner />
          ) : spCount === 0 ? (
            "Recover Reward"
          ) : (
            "Claim Reward"
          )}
        </div>
      ) : (
        <form
          className="flex"
          onSubmit={(e) => {
            e.preventDefault();
            handleFulFill();
          }}
        >
          <input
            required
            type="number"
            placeholder="Deal ID"
            className="w-full p-3 rounded-l-xl border-2 border-gray-300 focus:outline-none focus:border-black"
            onChange={(e) => {
              setDealId(e.target.value);
            }}
          />
          <button className="rounded-r-xl bg-black text-white p-3 px-5 hover:bg-gray-900">
            {loading ? <Spinner /> : "Claim"}
          </button>
        </form>
      )}
    </>
  );
};

export default FileClaimReward;
