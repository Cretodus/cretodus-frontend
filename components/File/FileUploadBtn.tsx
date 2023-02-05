import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import cretodusApiService from "../../services/cretodusApi.service";
import cretodusContractService from "../../services/cretodusContract.service";
import Spinner from "../Spinner";
import { parseEther } from "ethers/lib/utils";
import useWalletStore from "../../stores/WalletStore";

export default function FileUploadBtn({
  refetch,
  isRefetching,
}: {
  refetch: () => void;
  isRefetching: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [cid, setCid] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dead, setDead] = useState("");

  const walletAddress = useWalletStore((state) => state.address);

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      setFileUrl("");
      setCid("");
      return;
    }
    setSize(file.size);
    const uploadedRes = await cretodusApiService.uploadFile(file);
    setFileUrl(uploadedRes.data.fileUrl);
    setCid(uploadedRes.data.cid);
  };

  const handleCreateOffer = async () => {
    setLoading(true);
    const deadline = Math.floor(Date.now() / 1000) + +dead * 60;
    try {
      const tx = await cretodusContractService.createOffer(
        cid,
        deadline,
        +amount
      );
      const txInfo = await tx.wait();
      const offerId =
        txInfo.events[txInfo.events.length - 1].args.offerId.toString();
      await cretodusApiService.createOffer({
        id: offerId,
        cid: cid,
        deadline: deadline,
        duration: +duration,
        filAmount: parseEther(amount.toString()).toNumber(),
        fileUrl: fileUrl,
        size: size,
        owner: walletAddress.toLowerCase(),
      });
      setIsOpen(false);
      setFileUrl("");
      setCid("");
      setAmount("");
      setDuration("");
      refetch();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="bg-black text-white flex items-center rounded-md p-2 text-sm px-4 select-none hover:bg-gray-800 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <AiOutlinePlus />
        <p className="ml-1 font-medium">Upload</p>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-white w-[465px] py-3 pt-0">
            <div className="w-full h-full flex flex-col p-3">
              <p className="font-bold text-center mt-3 text-lg">Upload File</p>
              <form
                className="px-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateOffer();
                }}
              >
                <input
                  type="text"
                  placeholder="CID"
                  disabled={true}
                  className="border w-full mt-3 p-3 rounded-lg"
                  value={cid}
                />
                <input
                  required
                  type="number"
                  placeholder="FIL"
                  className="border w-full mt-3 p-3 rounded-lg"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  min={180}
                  type="number"
                  placeholder="Duration"
                  className="border w-full mt-3 p-3 rounded-lg"
                />
                <input
                  value={dead}
                  onChange={(e) => setDead(e.target.value)}
                  required
                  type="number"
                  placeholder="Deadline in minutes"
                  className="border w-full mt-3 p-3 rounded-lg"
                />
                <input
                  type="file"
                  className="mt-5"
                  onChange={(e) => handleFileUpload(e)}
                />
                <button className="bg-black text-white w-full mt-5 p-3 rounded-lg flex justify-center items-center">
                  {loading || isRefetching ? <Spinner /> : "Create Offer"}
                </button>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
