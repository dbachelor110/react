import { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import "./App.css";
import ConnectButton from "./components/ConnectButton";
import Incubator from "./components/Incubator";
import { useSkin } from "./hooks/useSkin";
import { BeaconWallet } from "@taquito/beacon-wallet";
import Local from "./Local";
Local as () => JSX.Element;
const App = () => {
  const [Tezos] = useState<TezosToolkit>(
    new TezosToolkit("https://ghostnet.ecadinfra.com")
  );
  const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);
  const [userAddress, setUserAddress] = useState<string | undefined>(undefined);
  const [skin, setSkin] = useSkin(Tezos);
  const connectButton = <ConnectButton
    Tezos={Tezos}
    userAddress={userAddress}
    setUserAddress={setUserAddress}
    setWallet={setWallet}
    wallet={wallet}
  />;
  const incubator = <Incubator setSkin={setSkin} />;
  const app = <>
    {connectButton}
    {/* <h1>{skin}</h1> */}
    <Local skin={skin}/>
    {userAddress ? incubator : <></>}
  </>;
  return app;
};

export default App;