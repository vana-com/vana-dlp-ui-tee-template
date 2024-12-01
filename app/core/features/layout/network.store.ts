import { config, networks } from "@/app/config";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Network = keyof typeof networks | string;

type NetworkState = {
  network: Network;
  chainId: string;
  rpcUrl: string;
  chainName: string;
  explorerUrl: string;
  currency: string;
};

const networkConfig = networks[config.network as keyof typeof networks];
export const useNetworkStore = create<NetworkState>()(
  persist(
    () => {
      return {
        network: config.network as Network,
        chainId: networkConfig.chainId,
        rpcUrl: networkConfig.rpcUrl,
        chainName: networkConfig.chainName,
        explorerUrl: networkConfig.explorerUrl,
        currency: networkConfig.currency,
      }
    },
    {
      name: "network-storage",
    }
  )
);