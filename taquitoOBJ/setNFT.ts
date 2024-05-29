import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit, MichelsonMap } from "@taquito/taquito";
import { KEY } from "./.env";
const akaCollection = `KT1Ezqs7ijHpVfRDkyahKM9p2ovR5Sk6PPoL`;
const Incubator = ``;
const Creature = `KT1C8eVAxajftvXLHTV6nQUz2Xmyh9HbV589`;
async function main() {
    var tezosToolkit = new TezosToolkit("https://ghostnet.ecadinfra.com");

    const signer = await InMemorySigner.fromSecretKey(KEY);
    tezosToolkit.setProvider({ signer });

    const contract = await tezosToolkit.wallet.at(akaCollection);
    const royalties = new MichelsonMap();
    const op = await contract.methodsObject.set_nft({
        address: `tz1hEAnakHZqHGf4dbPPQVSVKtfq8Xwzhmp7`,
        tokem_id:`1`
    }).send();

    await op.confirmation();

    console.log(op.opHash);
}

main().catch(console.error);