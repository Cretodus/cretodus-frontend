import axios from "axios";
import { OfferType } from "../types/OfferType";

const ax = axios.create({ baseURL: "https://apifvmhack.ballx86.com" });

const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return ax.post("/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const createOffer = (offer: OfferType) => {
  return ax.post("/offer", offer);
};

const getOffers = () => {
  return ax.get("/offer");
};

const getOfferById = (id: number) => {
  return ax.get(`/offer/${id}`);
};

const getMyOffers = (walletAddress: string) => {
  return ax.get(`/offer/byowner/${walletAddress}`);
};

const cretodusApiService = {
  uploadFile,
  createOffer,
  getOffers,
  getMyOffers,
  getOfferById,
};

export default cretodusApiService;
