import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit, MichelsonMap } from "@taquito/taquito";
const akaCollection = `KT1Ezqs7ijHpVfRDkyahKM9p2ovR5Sk6PPoL`;
async function main() {
    var tezosToolkit = new TezosToolkit("https://ghostnet.ecadinfra.com");

    const signer = await InMemorySigner.fromSecretKey('edskRuGkyi357QQy3tTLyFmQk3NVzL7qfAa2fPYinXuDFGU34xPiuRNqQ9tefuXj9NHz1fJ6BqbowWokcfZUcHXQheDCUEar8V');
    tezosToolkit.setProvider({ signer });

    const contract = await tezosToolkit.wallet.at(akaCollection);
    const royalties = new MichelsonMap();
    royalties.set(akaCollection,"100");
    const op = await contract.methodsObject.mint_akaOBJ({
        amount: "1",
        address: `tz1hEAnakHZqHGf4dbPPQVSVKtfq8Xwzhmp7`,
        metadata: '697066733a2f2f6261666b726569646c6c7568623365766e376e6d327571756863706c763266646b77766136736c776432633372787571713376676f3279716e7471',
        royalties: {
            'tz1hEAnakHZqHGf4dbPPQVSVKtfq8Xwzhmp7':"100"
        }
    }).send();

    await op.confirmation();

    console.log(op.opHash);
}

main().catch(console.error);