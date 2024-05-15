// import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";

async function main() {

var tezosToolkit = new TezosToolkit("https://ghostnet.ecadinfra.com");

tezosToolkit.tz.getBalance("KT1Jv5Z5XRHLNC1GNoSyqB7VzXkwtHqZcLNc").then(balance => {
    console.log(balance.toNumber());
});

}

main().catch(console.error);

