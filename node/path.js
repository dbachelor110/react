const path=require("path");
console.log(`${path.dirname(__filename)}`);
console.log(path.extname(__filename));
const otherDir = path.join(__dirname,"/otherDir");
console.log(otherDir);
console.log(path.parse(otherDir));
