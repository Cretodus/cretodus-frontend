import { Cretodus__factory } from "@/typechain-types";
import { ADDRESS_LIST } from "../constants/addressList";
import { getRawCID } from "../utils/getRawCID";
import { getSigner } from "../utils/getProvider";
import { parseEther } from "ethers/lib/utils";

const createOffer = async (cid: string, deadline: number, amount: number) => {
  const cidRaw = await getRawCID(
    "baga6ea4seaqnupvghghlrsipmgb3aitbm5wxezqsl3kxptmxdsa2sdhahjwdmhq"
  );
  const cretodusContract = Cretodus__factory.connect(
    ADDRESS_LIST["cretodus"],
    getSigner()
  );
  return cretodusContract.createOffer(cidRaw, deadline, {
    value: parseEther(amount.toString()),
  });
};

const getOfferSp = async (oid: string) => {
  const cretodusContract = Cretodus__factory.connect(
    ADDRESS_LIST["cretodus"],
    getSigner()
  );
  return cretodusContract.getSpCountOfOffer(oid);
};

const fulfilOffer = async (oid: string, dealId: string) => {
  const cretodusContract = Cretodus__factory.connect(
    ADDRESS_LIST["cretodus"],
    getSigner()
  );
  return cretodusContract.fulfilOffer(oid, dealId);
};

const getReward = async (oid: string) => {
  const cretodusContract = Cretodus__factory.connect(
    ADDRESS_LIST["cretodus"],
    getSigner()
  );
  return cretodusContract.getReward(oid);
};

const getRewardClaimed = async (oid: string) => {
  const cretodusContract = Cretodus__factory.connect(
    ADDRESS_LIST["cretodus"],
    getSigner()
  );
  return cretodusContract.isClaimedReward(oid);
};

const cretodusContractService = {
  createOffer,
  getOfferSp,
  fulfilOffer,
  getReward,
  getRewardClaimed,
};

export default cretodusContractService;
