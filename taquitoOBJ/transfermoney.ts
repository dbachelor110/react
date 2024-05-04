import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";

async function main() {
    var tezosToolkit = new TezosToolkit("https://ghostnet.ecadinfra.com");

    // WARNING: DO NOT DO THIS IN PRODUCTION, KEEP YOUR SECRETS SAFE
    const signer = await InMemorySigner.fromSecretKey('edskRuGkyi357QQy3tTLyFmQk3NVzL7qfAa2fPYinXuDFGU34xPiuRNqQ9tefuXj9NHz1fJ6BqbowWokcfZUcHXQheDCUEar8V');

    const pkh = await signer.publicKeyHash();
    console.log(pkh);

    tezosToolkit.setProvider({ signer });

    const op = await tezosToolkit.contract.transfer({ to: 'tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L', amount: 1 });
    await op.confirmation();

    console.log(op.hash);
}

main().catch(console.error);