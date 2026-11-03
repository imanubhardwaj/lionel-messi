// Donations support running this fan site (hosting and upkeep). They do not go to Lionel Messi.
// The UPI card shows when upi.id is set. `qr` is the payee's own QR image (it decodes to the same
// UPI ID); omit it to auto-generate one from the UPI link.
export const support = {
  upi: { id: "mailmahima4@okicici", name: "Mahima Sharma", qr: "assets/upi-qr.png" },
  paypal: "https://paypal.me/immanubhardwaj",
  // `label` is what the dropdown shows; order here is the dropdown order.
  crypto: [
    { id: "btc", label: "BTC", chain: "Bitcoin", address: "bc1qpyu89mnsczl7xl86qr6llwuesrmnz36pl2cx8j", uri: (a) => `bitcoin:${a}`, warn: "Bitcoin network only. Native SegWit (bc1…) address." },
    { id: "sol", label: "SOL", chain: "Solana", address: "HYWMhLo5WiYdPFntZz8oRkHVFYEqFZBjiU9YujRAmpgq", uri: (a) => a, warn: "Solana network only." },
    { id: "tron", label: "TRON", chain: "TRON", address: "TLbjHWaoAWiYKNuDkS5WUEg9at2LAP91sk", uri: (a) => a, warn: "TRON network only." },
    { id: "xlm", label: "STELLAR", chain: "Stellar", address: "GCXNPRL34T67YZ6SSYXURVWU7XP2NVR6X6FWEMB73OL2UMOXS5FV3JVE", uri: (a) => a, warn: "Stellar network only." },
    { id: "evm", label: "ETH & other chains", chain: "Ethereum and other EVM chains", address: "0xb97678F74069ebd6E770b63E3E58eD1d53f26DB4", uri: (a) => a, warn: "Works on Ethereum, BNB Chain and Base. Check the network matches before sending." },
  ],
};
