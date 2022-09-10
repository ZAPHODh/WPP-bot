const b64ify = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64');

module.exports = b64ify;
