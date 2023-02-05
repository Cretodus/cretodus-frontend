import create from "zustand";
import { ethereum } from "../utils/ethereum";
import localService from "../services/local.service";
import STORAGE_KEYS from "../constants/storageKey";

enum WalletType {
  Metamask = "metamask",
}

const store = (set: any, get: any) => ({
  address: "" as string,
  sessionLoading: true,
  loadSession: async () => {
    const walletType = localService.getItem(STORAGE_KEYS.WALLET_TYPE);
    if (walletType) {
      switch (walletType) {
        case WalletType.Metamask:
          set({ sessionLoading: false });
          return get().connectMetamask() as Promise<string>;
        default:
          return null;
      }
    }
    set({ sessionLoading: false });
  },
  subscribeWalletChange: (callback?: (address: string) => void) => {
    const eth = ethereum();
    if (eth) {
      return eth.on("accountsChanged", (accounts: string) => {
        set({ walletDataLoading: true });
        const account = accounts[0];
        if (account) {
          callback && callback(account);
        } else {
          callback && callback("");
        }
      });
    }
  },
  connectMetamask: async () => {
    try {
      const eth = ethereum();
      if (eth) {
        const accounts = await eth.request({
          method: "eth_requestAccounts",
        });
        const account: string = accounts[0];
        if (account) {
          get().subscribeWalletChange((account: string) => {
            const walletType = get().walletType;
            if (walletType === WalletType.Metamask) {
              set({ address: account });
            }
          });
          localService.setItem(STORAGE_KEYS.WALLET_TYPE, WalletType.Metamask);
          set({ address: account, walletType: WalletType.Metamask });
          return account;
        }
      }
      set({ sessionLoading: false });
      return null;
    } catch (e: any) {
      set({ sessionLoading: false });
      console.error(e.response);
      return null;
    }
  },
});

type WalletStore = ReturnType<typeof store>;
const useWalletStore = create<WalletStore>(store);

export default useWalletStore;
