// import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";

async function main() {

var tezosToolkit = new TezosToolkit("https://ghostnet.ecadinfra.com");

tezosToolkit.tz.getBalance("tz1hEAnakHZqHGf4dbPPQVSVKtfq8Xwzhmp7").then(balance => {
    console.log(balance.toNumber());
});

}

main().catch(console.error);

