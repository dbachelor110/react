// import { InMemorySigner } from "@taquito/signer";
// import { TezosToolkit } from "@taquito/taquito";

// async function main() {
//     var tezosToolkit = new TezosToolkit("https://ghostnet.ecadinfra.com");

//     const signer = await InMemorySigner.fromSecretKey('edskRuGkyi357QQy3tTLyFmQk3NVzL7qfAa2fPYinXuDFGU34xPiuRNqQ9tefuXj9NHz1fJ6BqbowWokcfZUcHXQheDCUEar8V');
//     tezosToolkit.setProvider({ signer });

//     const contract = await tezosToolkit.contract.at('KT1HPWEgkKawxjnq8L6569THCTG3DGD8XziL');
//     const op = await contract.methodsObject.mint({
//         collection_id: 71947,
//         editions: 1,
//         metadata_cid: '697066733a2f2f516d52325672336775713467594d45366268676b47474a34714656647652786867766e47516d7a6672346d364635',
//         target: 'tz1hEAnakHZqHGf4dbPPQVSVKtfq8Xwzhmp7'
//     }).send();

//     await op.confirmation();

//     console.log(op.hash);
// }

// main().catch(console.error);

import { TezosToolkit, MichelsonMap } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
// import { MichelsonMap } from '@taquito/taquito';

// Initialize the Tezos toolkit
const Tezos = new TezosToolkit('https://ghostnet.ecadinfra.com');
Tezos.setProvider({ signer: new InMemorySigner('edskRuGkyi357QQy3tTLyFmQk3NVzL7qfAa2fPYinXuDFGU34xPiuRNqQ9tefuXj9NHz1fJ6BqbowWokcfZUcHXQheDCUEar8V') });

// Define the mint function
const mint = async (tz:string, amount:string, cid:string, royalties:[]) => {
  const royaltiesMap = new MichelsonMap();
  royalties.forEach((value, key) => {
    royaltiesMap.set(key, value);
  });

  const contract = await Tezos.contract.at('KT1HPWEgkKawxjnq8L6569THCTG3DGD8XziL');
  const minter = contract.methodsObject.mint
  const operation = await minter({})
//   const operation = await contract.methodsObject.mint_akaOBJ(
//     {
//                 collection_id: 71947,
//                 editions: 1,
//                 metadata_cid: '697066733a2f2f516d52325672336775713467594d45366268676b47474a34714656647652786867766e47516d7a6672346d364635',
//                 target: 'tz1hEAnakHZqHGf4dbPPQVSVKtfq8Xwzhmp7'
//             }tz, parseFloat(amount), cid, royaltiesMap).send();
//   await operation.confirmation();

  return operation;
};

// Call the mint function
const tz = 'tz1...'; // The address of the minter
const amount = '1'; // The number of NFTs to mint
const cid = 'Qm...'; // The content identifier for the NFT
const royalties = new Map(); // The royalties for each address
royalties.set('tz1...', '0.1'); // Set a royalty of 0.1 for address tz1...

mint(tz, amount, cid, royalties)
  .then(op => console.log(`Operation injected: ${op.hash}`))
  .catch(err => console.error(`Error: ${err}`));