import React from "react";
import {
  BsWallet2,
  BsClockHistory,
  BsTrophy,
  BsFileEarmarkMedical,
  BsDownload,
} from "react-icons/bs";
import FileClaimReward from "./FileClaimReward";
import Banner from "../Banner";
import { useQuery } from "@tanstack/react-query";
import cretodusApiService from "../../services/cretodusApi.service";
import { truncateAddress } from "../../utils/truncateAddress";
import { formatEther, parseEther } from "ethers/lib/utils";
import Spinner from "../Spinner";
import cretodusContractService from "../../services/cretodusContract.service";
import TimeRemain from "../TimeRemain";

interface IProps {
  oid: string;
}

const FileDetailCard: React.FC<IProps> = ({ oid }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["fileDetailOff", oid],
    queryFn: () =>
      cretodusApiService.getOfferById(+oid).then((res) => res.data),
    enabled: !!oid,
  });

  const {
    isLoading: loading,
    error: err,
    data: spCount,
  } = useQuery({
    queryKey: ["fileDetailOn", oid],
    queryFn: () =>
      cretodusContractService.getOfferSp(oid).then((res) => {
        return res.toNumber();
      }),
    enabled: !!oid,
  });

  const getEnded = (timeData: number) => {
    const now = new Date().valueOf();
    if (now >= new Date((timeData + 5) * 1000).valueOf()) {
      return true;
    } else return false;
  };

  return (
    <>
      {isLoading || !data ? (
        <Spinner />
      ) : (
        <div>
          <Banner title={"Rewards"} subtitle={`CID : ${data.cid}`} />
          <div className="w-full flex justify-center items-center mt-3">
            <TimeRemain timeData={data.deadline} />
          </div>
          <div className="mt-3 bg-white h-[210px] w-full rounded-xl border-2 grid grid-cols-3">
            <div className="w-full h-full border-r p-7">
              <div className="flex items-start center">
                <BsWallet2 className="text-2xl mr-2" />
                <p className="font-medium text-lg">Uploader Wallet Address</p>
              </div>
              <p className="mt-1 font-bold text-2xl">
                {truncateAddress(data.owner)}
              </p>
              <div className="mt-8 bg-black text-white p-3 rounded-md w-72 flex space-x-1 items-center justify-center cursor-pointer select-none hover:bg-gray-900">
                <BsDownload className="text-2xl mr-2" />
                <a
                  rel="noreferrer"
                  href={`${data.fileUrl}`}
                  target="_blank"
                  download
                >
                  Downlaod File
                </a>
              </div>
            </div>
            <div className="w-full h-full p-7">
              <div className="flex flex-col">
                <div className="flex items-start center">
                  <BsClockHistory className="text-2xl mr-2" />
                  <p className="font-medium text-lg">Duration</p>
                </div>
              </div>
              <div>
                <p className="mt-1 font-bold text-2xl">{data.duration} days</p>
                <div className="flex items-start center mt-4">
                  <BsFileEarmarkMedical className="text-2xl mr-2" />
                  <p className="font-medium text-lg">File Size</p>
                </div>
              </div>
              <p className="mt-1 font-bold text-2xl">{data.size / 1000} KB</p>
            </div>
            <div className="w-full h-full border-l p-7">
              <div className="flex items-start center">
                <BsTrophy className="text-2xl mr-2" />
                <p className="font-medium text-lg">Rewards</p>
              </div>
              <p className="mt-1 font-bold text-2xl">
                Current Share :{" "}
                {(+formatEther(data.filAmount) / (spCount + 1)).toFixed(4)} FIL
              </p>
              <p className="mt-2 mb-3">
                Total Reward:{" "}
                <span className="font-bold">
                  {formatEther(data.filAmount)} FIL
                </span>{" "}
                | Total SP Joined: <span className="font-bold">{spCount}</span>
              </p>
              <FileClaimReward
                oid={oid}
                isEnd={getEnded(data.deadline)}
                spCount={spCount}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileDetailCard;
