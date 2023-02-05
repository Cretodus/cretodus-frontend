import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import useWalletStore from "../stores/WalletStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const loadSession = useWalletStore((state) => state.loadSession);

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
