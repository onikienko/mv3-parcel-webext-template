// const extName = require('./getExtName.js')

const {extName} = require('./utils/getExtName.js');

console.log(extName);

module.exports = {
    // 'github': {
    //     'release': true,
    //     'releaseName': 'v${version}',
    //     'tokenRef': 'GITHUB_TOKEN',
    //     'assets': `dist/${extName}` + '-v${version}.zip',
    // },
    'npm': {
        'publish': false,
    },
};
