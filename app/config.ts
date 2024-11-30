const networks = {
  moksha: {
    chainId: "14800",
    rpcUrl: "https://rpc.moksha.vana.org",
    chainName: "Vana Moksha Testnet",
    explorerUrl: "https://moksha.vanascan.io",
    currency: "VANA",
    contracts: {
      dlp: "0x0D1C88bAf92Db7A8B18c9D078A450d9ff4dEe10E",
      dataRegistry: "0xEA882bb75C54DE9A08bC46b46c396727B4BFe9a5",
      teePool: "0xF084Ca24B4E29Aa843898e0B12c465fAFD089965",
    }
  },
  satori: {
    chainId: "14801",
    rpcUrl: "https://rpc.satori.vana.org",
    chainName: "Vana Satori Testnet",
    explorerUrl: "https://satori.vanascan.io",
    currency: "VANA",
    contracts: {
      dlp: "0x0D1C88bAf92Db7A8B18c9D078A450d9ff4dEe10E",
      dataRegistry: "0xEA882bb75C54DE9A08bC46b46c396727B4BFe9a5",
      teePool: "0xF084Ca24B4E29Aa843898e0B12c465fAFD089965",
    }
  },
  mainnet: {
    chainId: "1480",
    rpcUrl: "https://rpc.islander.vana.org",
    chainName: "Vana Network",
    explorerUrl: "https://vanascan.io",
    currency: "VANA",
    contracts: {
      dlp: "0x5bD2839bE70976b4B29e071fF5B2582De00D2A62",
      dataRegistry: "0x8C8788f98385F6ba1adD4234e551ABba0f82Cb7C",
      teePool: "0x3c92fD91639b41f13338CE62f19131e7d19eaa0D",
    }
  },
};

const network = (process.env.NEXT_PUBLIC_NETWORK || "mainnet") as keyof typeof networks;

if (!Object.keys(networks).includes(network)) {
  throw new Error(`Invalid network type: ${network}`);
}

let networkConfig = networks[network];
if (!networkConfig) {
  networkConfig = {} as any;
  networks[network] = networkConfig;
}

const config = {
  dropboxCallbackUrl: process.env.NEXT_PUBLIC_DROPBOX_CALLBACK_URL || "",
  dropboxClientId: process.env.NEXT_PUBLIC_DROPBOX_CLIENT_ID || "",
  dropboxFolderName: "data-dao",
  googleDriveFolderName: "data-dao",
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID || "",
  publicKeyBase64: process.env.NEXT_PUBLIC_FILE_ENCRYPTION_PUBLIC_KEY_BASE64 || "",
  network,
  networkConfig,
  smartContracts: {
    dlp: process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS_DLP ||
      networks[network]?.contracts?.dlp ||
      "0x88006Bc06d3B703a3F50ACe4DEFC587549085940",
    dataRegistry: process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS_DATA_REGISTRY ||
      networks[network]?.contracts?.dataRegistry ||
      "0xEA882bb75C54DE9A08bC46b46c396727B4BFe9a5",
    teePool: process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS_TEE_POOL ||
      networks[network]?.contracts?.teePool ||
      "0xF084Ca24B4E29Aa843898e0B12c465fAFD089965",
  }
};

export { config, networks };