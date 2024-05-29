// // import { createHelia } from 'helia'
// // import { unixfs } from '@helia/unixfs'

// // const helia = await createHelia();
// // const fs = unixfs(helia)

// // // create an empty dir and a file, then add the file to the dir
// // const DirCid = await fs.addDirectory({
// //   path: '../creature/dist',
// //   mode: 0x755,
// //   mtime: {
// //     secs: 10n,
// //     nsecs: 0
// //   }
// // });
// // // const updateDirCid = await fs.cp(fileCid, emptyDirCid, 'foo.txt')
// // console.info(DirCid);
// import { createHelia } from 'helia';
// import fs from 'fs-extra';
// import path from 'path';

// async function initHelia() {
//   // const ipfsClient = await createIpfsClient();
//   const helia = await createHelia();
//   return helia;
// }

// async function uploadDirectory(helia, dirPath) {
//   const files = [];

//   async function addDirectoryToIPFS(dir) {
//     const items = await fs.readdir(dir);
//     for (const item of items) {
//       const fullPath = path.join(dir, item);
//       const stats = await fs.stat(fullPath);
//       if (stats.isDirectory()) {
//         await addDirectoryToIPFS(fullPath);
//       } else {
//         const content = await fs.readFile(fullPath);
//         files.push({
//           path: path.relative(dirPath, fullPath),
//           content: content
//         });
//       }
//     }
//   }

//   await addDirectoryToIPFS(dirPath);

//   const { cid } = await helia.addAll(files);
//   console.log('Uploaded directory CID:', cid.toString());
//   return cid;
// }

// async function main() {
//   const helia = await initHelia();
//   const dirPath = './path/to/your/directory';
//   const cid = await uploadDirectory(helia, dirPath);
//   console.log('CID of the uploaded directory:', cid.toString());
// }

// main().catch(console.error);


import { createHelia } from 'helia'
import { unixfs, globSource } from '@helia/unixfs'

const helia = await createHelia();
const fs = unixfs(helia);


let lastEntry;
for await (const entry of fs.addAll(globSource('../creature/out', '**/*'))) {
  console.info(entry);
  lastEntry=entry;
}
helia.pins.add(lastEntry);