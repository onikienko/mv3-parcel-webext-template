const filenamify = require('filenamify');
const fs = require('fs-extra');
const path = require('node:path');
const zl = require('zip-lib');

const DIST_DIR = './dist';
const RELEASE_DIR = './releases';

if (!fs.pathExistsSync(DIST_DIR)) throw new Error('Dist dir does not exist');

const {name, version} = fs.readJsonSync('./package.json');
const extName = filenamify(name, {replacement: '_'});
const zipName = `${extName}-v${version}.zip`;
const zipPath = path.join(RELEASE_DIR, zipName);

zl.archiveFolder(DIST_DIR, zipPath)
    .then(() => console.log(`Release zip created - ${zipPath}`))
    .catch(console.log);
