import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'

const helia = await createHelia();
const fs = unixfs(helia)

// create an empty dir and a file, then add the file to the dir
const emptyDirCid = await fs.addDirectory()
const fileCid = await fs.
const updateDirCid = await fs.cp(fileCid, emptyDirCid, 'foo.txt')

// or doing the same thing as a stream
for await (const entry of fs.addAll([{
  path: 'foo.txt',
  content: Uint8Array.from([0, 1, 2, 3])
}])) {
  console.info(entry)
}