const {extName} = require('./utils/getExtName.js');

console.log(extName);

module.exports = {
    'git': {
        requireCleanWorkingDir: false,
    },
    'github': {
        'release': false,
        // 'releaseName': 'v${version}',
        // 'tokenRef': 'GITHUB_TOKEN',
        // 'assets': `releases/${extName}` + '-v${version}.zip',
    },
    'npm': {
        'publish': false,
    },
    'hooks': {
        'before:bump': ['dot-json src/manifest.json version "${version}"'],
        'after:bump': ['npm run build'],
        // 'after:git:release': 'echo Stage: After git push, before github release;',
        'after:release': [
            'echo Successfully released ${name} v${version} to ${repo.repository}',
            'opener https://${repo.host}/${repo.repository}/releases/tag/v${version}',
        ],
    },
};
