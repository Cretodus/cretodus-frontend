import React from "react";
import FileSearchBar from "./FileSearchBar";
import { useRouter } from "next/router";
// import FileStatusSelector from "./FileStatusSelector";
import { truncateAddress } from "../../utils/truncateAddress";
import { formatEther } from "ethers/lib/utils";
import TimeRemain from "../TimeRemain";

export default function FileTable({ data }) {
  const router = useRouter();

  return (
    <div className="bg-white w-full mt-5 rounded-xl pb-5">
      <div className="flex items-center justify-end p-4">
        {/* <FileStatusSelector /> */}
        <FileSearchBar />
      </div>
      <table className="table-auto w-full">
        <thead className="bg-gray-100 text-gray-600 h-14 font-bold text-sm text-center">
          <tr>
            <td className="pl-5 text-left">FILENAME</td>
            <td className="text-left">CID</td>
            <td>SIZE</td>
            <td>DURATION</td>
            <td>REMAINING TIME</td>
            <td className="pr-5">BOUNTY</td>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.length
            ? data
                .sort((a, b) => {
                  return b.id - a.id;
                })
                .map((data, index) => (
                  <tr
                    key={index}
                    className="border-b h-[70px] text-gray-600 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      router.push(`/file?oid=${data.id}`);
                    }}
                  >
                    <td className="pl-5 text-left">
                      {data.fileUrl.split("/")[4]}
                    </td>
                    <td className="text-left">{truncateAddress(data.cid)}</td>
                    <td>{(+data.size / 1000).toFixed(2)} KB</td>
                    <td>{data.duration} days</td>
                    <td>
                      <TimeRemain timeData={data.deadline} />
                    </td>
                    <td className="pr-5">{formatEther(data.filAmount)} FIL</td>
                  </tr>
                ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
