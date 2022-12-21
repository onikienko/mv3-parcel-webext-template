const fs = require('fs-extra');
const filenamify = require('filenamify');

const {name} = fs.readJsonSync('./package.json');
const extName = filenamify(name, {replacement: '_'});
module.exports = extName;
