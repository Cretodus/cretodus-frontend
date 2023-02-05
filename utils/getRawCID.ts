import CID from "cids";

export const getRawCID = async (cid: string) => {
  const cidHexRaw = new CID(cid).toString("base16").substring(1);
  return "0x00" + cidHexRaw;
};
