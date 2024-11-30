"use client";

import { useEffect } from "react";
import { requestNetworkSwitch, useNetworkStore } from "../core";
import { notifications } from "@mantine/notifications";

export const NetworkProvider = () => {
  const chainId = useNetworkStore((state) => state.chainId);
  const rpcUrl = useNetworkStore((state) => state.rpcUrl);
  const chainName = useNetworkStore((state) => state.chainName);
  const explorerUrl = useNetworkStore((state) => state.explorerUrl);
  const currency = useNetworkStore((state) => state.currency);

  useEffect(() => {
    const switchNetwork = async () => {
      try {
        await requestNetworkSwitch({
          chainId,
          rpcUrl,
          chainName,
          explorerUrl,
          currency,
        });
      } catch (error: any) {
        notifications.show({
          title: 'Network Switch Error',
          message: error.message || 'Failed to switch network. Please try again.',
          color: 'red',
        });
      }
    };

    if (typeof window !== 'undefined' && window.ethereum) {
      switchNetwork();

      // Listen for chain changes
      const handleChainChanged = (chainId: string) => {
        const expectedChainId = `0x${Number(chainId).toString(16)}`;
        if (chainId !== expectedChainId) {
          switchNetwork();
        }
      };

      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [chainId, rpcUrl, chainName, explorerUrl, currency]);

  return <></>;
};