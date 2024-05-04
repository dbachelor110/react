import { TezosToolkit } from "@taquito/taquito";

const tezosToolkit = new TezosToolkit("https://ghostnet.ecadinfra.com");

tezosToolkit.tz.getBalance("tz1hEAnakHZqHGf4dbPPQVSVKtfq8Xwzhmp7").then(balance => {
    console.log(balance.toNumber());
});