import { createHelia } from 'helia';

async function initHelia() {
  // const ipfsClient = await createIpfsClient();
  const helia = await createHelia();
  return helia;
}

async function uploadDirectory(helia, dirPath) {
  const files = [];

  async function addDirectoryToIPFS(dir) {
    const items = await fs.readdir(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stats = await fs.stat(fullPath);
      if (stats.isDirectory()) {
        await addDirectoryToIPFS(fullPath);
      } else {
        const content = await fs.readFile(fullPath);
        files.push({
          path: path.relative(dirPath, fullPath),
          content: content
        });
      }
    }
  }

  await addDirectoryToIPFS(dirPath);

  const { cid } = await helia.addAll(files);
  console.log('Uploaded directory CID:', cid.toString());
  return cid;
}

async function main() {
  const helia = await initHelia();
  const dirPath = './path/to/your/directory';
  const cid = await uploadDirectory(helia, dirPath);
  console.log('CID of the uploaded directory:', cid.toString());
}

main().catch(console.error);