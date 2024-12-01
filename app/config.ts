const networks = {
  moksha: {
    chainId: "14800",
    rpcUrl: "https://rpc.moksha.vana.org",
    chainName: "Vana Moksha Testnet",
    explorerUrl: "https://moksha.vanascan.io",
    currency: "VANA",
  },
  satori: {
    chainId: "14801",
    rpcUrl: "https://rpc.satori.vana.org",
    chainName: "Vana Satori Testnet",
    explorerUrl: "https://satori.vanascan.io",
    currency: "VANA",
  },
  mainnet: {
    chainId: "1480",
    rpcUrl: "https://rpc.islander.vana.org",
    chainName: "Vana Network",
    explorerUrl: "https://islander.vanascan.io",
    currency: "VANA",
  },
}

const network = (process.env.NEXT_PUBLIC_NETWORK || "moksha") as keyof typeof networks;

if (!Object.keys(networks).includes(network)) {
  throw new Error(`Invalid network type: ${network}`);
}

const networkConfig = networks[network];

const config = {
  dropboxCallbackUrl: process.env.NEXT_PUBLIC_DROPBOX_CALLBACK_URL || "",
  dropboxClientId: process.env.NEXT_PUBLIC_DROPBOX_CLIENT_ID || "",
  dropboxFolderName: "data-dao",
  googleDriveFolderName: "data-dao",
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID || "",
  network,
  networkConfig,
  smartContracts: {
    dlp: process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS_DLP || "0x5bD2839bE70976b4B29e071fF5B2582De00D2A62",
    dataRegistry: process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS_DATA_REGISTRY || "0x8C8788f98385F6ba1adD4234e551ABba0f82Cb7C",
    teePool: process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS_TEE_POOL || "0x3c92fD91639b41f13338CE62f19131e7d19eaa0D",
  }
};

export { config, networks };