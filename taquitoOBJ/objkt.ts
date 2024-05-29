import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit, MichelsonMap } from "@taquito/taquito";
import { KEY } from "./.env";
const akaCollection = `KT1Ezqs7ijHpVfRDkyahKM9p2ovR5Sk6PPoL`;
const PuddingMetadata = `697066733a2f2f6261666b726569646c6c7568623365766e376e6d327571756863706c763266646b77766136736c776432633372787571713376676f3279716e7471`;
const CreatureTMetadata = `697066733a2f2f6261666b726569646d7132696b6377686a7432727861753664736665366177346c676b6e3536336668726f75336a6e677862786b71717269747134`;
async function main() {
    var tezosToolkit = new TezosToolkit("https://ghostnet.ecadinfra.com");

    const signer = await InMemorySigner.fromSecretKey(KEY);
    tezosToolkit.setProvider({ signer });

    const contract = await tezosToolkit.wallet.at(akaCollection);
    const royalties = new MichelsonMap();
    const op = await contract.methodsObject.mint_akaOBJ({
        amount: "1",
        address: `tz1hEAnakHZqHGf4dbPPQVSVKtfq8Xwzhmp7`,
        metadata: CreatureTMetadata,
        royalties: {
            'tz1hEAnakHZqHGf4dbPPQVSVKtfq8Xwzhmp7':"100"
        }
    }).send();

    await op.confirmation();

    console.log(op.opHash);
}

main().catch(console.error);