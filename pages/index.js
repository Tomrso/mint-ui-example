/* eslint-disable react/no-unescaped-entities */
import styles from "../styles/Home.module.css";
import { useMemo, useState, useEffect } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { MetaplexProvider } from "./MetaplexProvider";
import { MintNFTs } from "./MintNFTs";
import "@solana/wallet-adapter-react-ui/styles.css";
import dynamic from 'next/dynamic';

export default function Home() {
  const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  const handleChange = (event) => {
    switch (event.target.value) {
      case "devnet":
        setNetwork(WalletAdapterNetwork.Devnet);
        break;
      case "mainnet":
        setNetwork(WalletAdapterNetwork.Mainnet);
        break;
      case "testnet":
        setNetwork(WalletAdapterNetwork.Testnet);
        break;
      default:
        setNetwork(WalletAdapterNetwork.Devnet);
        break;
    }
  };

  const ButtonWrapper = dynamic(() =>
    import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton)
  );


  return (
    <div className="wrapper">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <MetaplexProvider>
              <div className="content">
              <div className="header">
                <h1>Take A Business Card</h1>
                <p>It's an NFT, cool huh!</p>
              </div>
                <img src="/nftstack.png" alt="an NFT business card" className="image" />
                <div className="connect-wallet">
                  <ButtonWrapper />
                </div>
                <MintNFTs onClusterChange={handleChange} />
                <p>New to NFT's? Learn how to set up your first wallet <a href="https://blog.thirdweb.com/guides/getting-started-with-solana/" className="highlighted-link">here</a>. It's free and takes less than 5 minutes.</p>
              </div>
            </MetaplexProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
