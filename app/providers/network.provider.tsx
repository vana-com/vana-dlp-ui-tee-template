"use client";

import { useEffect, useCallback } from "react";
import { requestNetworkSwitch, useNetworkStore } from "../core";

export const NetworkProvider = () => {
  const chainId = useNetworkStore((state) => state.chainId);
  const rpcUrl = useNetworkStore((state) => state.rpcUrl);
  const chainName = useNetworkStore((state) => state.chainName);
  const explorerUrl = useNetworkStore((state) => state.explorerUrl);
  const currency = useNetworkStore((state) => state.currency);

  // Create a memoized function to handle network switching
  const switchNetwork = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    try {
      // First check if we're already on the correct network
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      const targetChainId = "0x" + Number(chainId).toString(16);

      // Only proceed with switch if we're on a different network
      if (currentChainId !== targetChainId) {
        await requestNetworkSwitch({
          chainId,
          rpcUrl,
          chainName,
          explorerUrl,
          currency,
        });
      }
    } catch (error) {
      console.error("Failed to switch network:", error);
    }
  }, [chainId, rpcUrl, chainName, explorerUrl, currency]);

  useEffect(() => {
    switchNetwork();

    // Also listen for chainChanged events
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('chainChanged', switchNetwork);

      return () => {
        window.ethereum.removeListener('chainChanged', switchNetwork);
      };
    }
  }, [switchNetwork]);

  return null;
};