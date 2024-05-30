import filenamify from 'filenamify';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import zl from 'zip-lib';


const DIST_DIR = './dist';
const RELEASE_DIR = './releases';

const {name, version} = JSON.parse(readFileSync('./package.json', {encoding: 'utf8'}));
const extName = filenamify(name, {replacement: '_'});
const zipName = `${extName}-v${version}.zip`;
const zipPath = path.join(RELEASE_DIR, zipName);

zl.archiveFolder(DIST_DIR, zipPath)
        .then(() => console.log(`Release zip created - ${zipPath}`));
