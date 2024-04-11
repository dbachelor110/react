const jwt = require('jsonwebtoken');
const secretKey = 'nodeJSexpre$$Webside';

const sign=(payload)=>jwt.sign(payload,secretKey);
const verify=(token)=> jwt.verify(token,secretKey);


module.exports = { sign, verify };