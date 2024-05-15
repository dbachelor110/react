import { TezosToolkit, MichelsonMap } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { stringToBytes, bytesToString } from "@taquito/utils";

const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');
Tezos.setProvider({ signer: new InMemorySigner('edskRuGkyi357QQy3tTLyFmQk3NVzL7qfAa2fPYinXuDFGU34xPiuRNqQ9tefuXj9NHz1fJ6BqbowWokcfZUcHXQheDCUEar8V') });
const pudding = {
  "name": "Pudding Bear",
  "description": "Test upload object use other ipfs.io",
  "tags": [
    "P5js",
    "bear",
    "test"
  ],
  "symbol": "akaOBJ",
  "artifactUri": "ipfs://QmTNvcfP6Bz9ar2juYLRT6TCmWoRPuc4UbZHmhxRqfDYLK",
  "displayUri": "ipfs://QmTNvcfP6Bz9ar2juYLRT6TCmWoRPuc4UbZHmhxRqfDYLK",
  "thumbnailUri": "ipfs://QmTNvcfP6Bz9ar2juYLRT6TCmWoRPuc4UbZHmhxRqfDYLK",
  "creators": [
    "tz1hEAnakHZqHGf4dbPPQVSVKtfq8Xwzhmp7"
  ],
  "formats": [
    {
      "uri": "ipfs://QmTNvcfP6Bz9ar2juYLRT6TCmWoRPuc4UbZHmhxRqfDYLK",
      "mimeType": "application/x-directory"
    }
  ],
  "rights": "None (All rights reserved)",
  "rightUri": "",
  "decimals": 0,
  "isBooleanAmount": false,
  "shouldPreferSymbol": false
};


const addAmounts = async () => {
  const contract = await Tezos.wallet.at('KT1Jv5Z5XRHLNC1GNoSyqB7VzXkwtHqZcLNc');
  const transfor = contract.methodsObject.nothing;
  const operation = await transfor().send({ amount: 10 });
  await operation.confirmation();

  return operation;
}
const generateCollection = async () => {

  const contract = await Tezos.wallet.at('KT1Jv5Z5XRHLNC1GNoSyqB7VzXkwtHqZcLNc');

  const minter = contract.methodsObject.generateCollection;
  // const operation = await minter(
  //   {"": stringToBytes(`ipfs://bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea`),
  //   "name": "Pudding Bear",
  //   "symbol": "akaOBJ",
  //   "decimals":"0"}
  // )
  const tokenIds = [1]; // 假設您要創建的 NFT 的 tokenIds 是 [1, 2, 3]
  // const tokenMetas = new Map([
  //   [1, { token_id: 1, token_info: stringToBytes(`ipfs://bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea`) }]
  // ]);

  // 將 tokenMetas 轉換為 big_map 的格式
  const tokenMetasBigMap = new MichelsonMap();
  tokenMetasBigMap.set("0", {
    token_id: 1,
    token_info: {"1":stringToBytes(`ipfs://bafkreidlluhb3evn7nm2uquhcplv2fdkwva6slwd2c3rxuqq3vgo2yqntq`)}
  })

  // 呼叫智能合約的 generateCollection 函數
  const operation = await minter({
    name: "Pudding Bear",            // name
    tokenIds: tokenIds,              // tokenIds
    tokenMetas: tokenMetasBigMap     // tokenMetas
  }
  ).send();
  await operation.confirmation();

  return operation;
};

const mint = async () => {

  const contract = await Tezos.wallet.at('KT1M2LAPK2dcr5V1RZpwN1w5BXa7mCZdPswi');

  const minter = contract.methodsObject.mint;
  // const operation = await minter(
  //   {"": stringToBytes(`ipfs://bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea`),
  //   "name": "Pudding Bear",
  //   "symbol": "akaOBJ",
  //   "decimals":"0"}
  // )
  const tokenIds = [0]; // 假設您要創建的 NFT 的 tokenIds 是 [1, 2, 3]
  // const tokenMetas = new Map([
  //   [1, { token_id: 1, token_info: stringToBytes(`ipfs://bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea`) }]
  // ]);

  // 將 tokenMetas 轉換為 big_map 的格式
  const tokenMetasBigMap = new MichelsonMap();
  tokenMetasBigMap.set("0",
    {"0":stringToBytes(`ipfs://bafkreidlluhb3evn7nm2uquhcplv2fdkwva6slwd2c3rxuqq3vgo2yqntq`)}
  )

  // 呼叫智能合約的 generateCollection 函數
  const operation = await minter({
    ids: tokenIds,              // tokenIds
    metas: tokenMetasBigMap     // tokenMetas
  }
  ).send();
  await operation.confirmation();

  return operation;
};


mint();
// addAmounts();