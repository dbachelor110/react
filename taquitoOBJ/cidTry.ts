import { CID } from 'multiformats/cid';
import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { stringToBytes } from "@taquito/utils";
import { fromString } from 'uint8arrays/from-string';
const helia = await createHelia();

const creature = {
    "name": "Who am I? Creature.00T",
    "description": "Test upload object use helia.js",
    "tags": [
      "ReactJS",
      "Creature",
      "WhoAmI",
      "test"
    ],
    "symbol": "akaOBJ",
    "artifactUri": "ipfs://QmXQc7uzhqjWS39BD2dyfMQfvtKBkRXEAYQruf6Fyr8h1y",
    "displayUri": "ipfs://QmXQc7uzhqjWS39BD2dyfMQfvtKBkRXEAYQruf6Fyr8h1y",
    "thumbnailUri": "ipfs://QmXQc7uzhqjWS39BD2dyfMQfvtKBkRXEAYQruf6Fyr8h1y",
    "creators": [
      "tz1hEAnakHZqHGf4dbPPQVSVKtfq8Xwzhmp7"
    ],
    "formats": [
      {
        "uri": "ipfs://QmXQc7uzhqjWS39BD2dyfMQfvtKBkRXEAYQruf6Fyr8h1y",
        "mimeType": "application/x-directory"
      }
    ],
    "rights": "None (All rights reserved)",
    "rightUri": "",
    "decimals": 0,
    "isBooleanAmount": false,
    "shouldPreferSymbol": false
  };

const cidV12cidV0 = (cidV1:string)=>{const cidV0 = CID.parse(cidV1).toV0(); console.log(cidV0.toString()); return cidV0;}

const json2metadata = async()=>{
    // const j = dagJson(helia);
    const fs = unixfs(helia);
    console.log(`befor pin ls:`);
    for await (const entry of helia.pins.ls()) {
      console.info(entry);
    }
    console.log(`try get cid:`);
    // console.info(stringToBytes(`ipfs://${cid.toString()}`));
    // JSON 2 String
    const jsonString = JSON.stringify(creature);
    
    // String 2 Uint8Array
    const jsonBytes = fromString(jsonString);

    // Uint8Array 2 IPFS
    const fileCid = await fs.addBytes(jsonBytes);

    console.log(`addBytes:`);
    console.info(fileCid);

    // pin
    for await (const entry of helia.pins.add(fileCid)) {
      console.log(`pin:`);
      console.info(entry);
    }

    console.log(`after pin ls:`);
    for await (const entry of helia.pins.ls()) {
      console.info(entry);
    }

    

    console.info(stringToBytes(`ipfs://${fileCid.toString()}`));
}
await json2metadata();
helia.stop();

