import { config, networks } from "@/app/config";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Network = keyof typeof networks | string;

type NetworkState = {
  network: Network;
  setNetwork: (network: Network) => void;

  publicKeyBase64: string;
  setPublicKeyBase64: (publicKeyBase64: string) => void;

  chainId: string;
  rpcUrl: string;
  chainName: string;
  explorerUrl: string;
  currency: string;
  contracts: {
    dlp: string;
    dataRegistry: string;
    teePool: string;
  };
};

const defaultNetworkConfig = networks[config.network as keyof typeof networks];

export const useNetworkStore = create<NetworkState>()(
  persist(
    (set) => {
      return {
        network: config.network as Network,
        setNetwork: (network: Network) => {
          const networkConfig = networks[network as keyof typeof networks];
          if (!networkConfig) {
            throw new Error(`Invalid network: ${network}`);
          }

          set({
            network,
            ...networkConfig,
            publicKeyBase64: config.publicKeyBase64,
            contracts: networkConfig.contracts || config.smartContracts,
          });
        },

        publicKeyBase64: config.publicKeyBase64,
        setPublicKeyBase64: (publicKeyBase64) => set({ publicKeyBase64 }),

        chainId: defaultNetworkConfig.chainId,
        rpcUrl: defaultNetworkConfig.rpcUrl,
        chainName: defaultNetworkConfig.chainName,
        explorerUrl: defaultNetworkConfig.explorerUrl,
        currency: defaultNetworkConfig.currency,
        contracts: defaultNetworkConfig.contracts || config.smartContracts,
      };
    },
    {
      name: "network-storage",
    }
  )
);
