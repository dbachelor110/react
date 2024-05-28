import { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import "./App.css";
import ConnectButton from "./components/ConnectButton";
import Creatures from "./components/Creatures";
import { BeaconWallet } from "@taquito/beacon-wallet";

const App = () => {
  const [Tezos] = useState<TezosToolkit>(
    new TezosToolkit("https://ghostnet.ecadinfra.com")
  );
  const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);
  const [userAddress, setUserAddress] = useState<string | undefined>(undefined);
  const connectButton = <ConnectButton
    Tezos={Tezos}
    userAddress={userAddress}
    setUserAddress={setUserAddress}
    setWallet={setWallet}
    wallet={wallet}
  />;
  const creatures = <Creatures Tezos={Tezos} />;
  const app = <>
    {connectButton}
    {userAddress ? creatures : <></>}
  </>;
  return app;
};

export default App;