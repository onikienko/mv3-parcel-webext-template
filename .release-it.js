module.exports = {
    'git': {
        'requireCleanWorkingDir': true,
        'commitMessage': 'v${version}',
        'pushRepo': 'origin',
        'tagName': 'v${version}',
        'requireCommits': true,
    },
    // docs https://github.com/release-it/release-it/blob/main/docs/github-releases.md
    'github': {
        'release': true,
        'releaseName': 'v${version}',
        'tokenRef': 'GITHUB_TOKEN',
        'assets': ['releases/*-v${version}.zip'],
    },
    'plugins': {
        '@release-it/bumper': {
            // bump a version in the manifest.json
            'out': {
                'file': 'src/manifest.json',
            },
        },
        '@release-it/conventional-changelog': {
            'infile': 'CHANGELOG.md',
            'ignoreRecommendedBump': true,
            'preset': {
                'name': 'conventionalcommits',
                'types': [
                    {
                        'type': 'feat',
                        'section': 'Features',
                    },
                    {
                        'type': 'fix',
                        'section': 'Bug Fixes',
                    },
                ],
            },
        },
    },
    'npm': {
        'publish': false,
    },
    'hooks': {
        'after:bump': ['npm run build'],
        'after:release': [
            'echo Successfully released ${name} v${version} to ${repo.repository}',
            'opener ${releaseUrl}',
        ],
    },
};
