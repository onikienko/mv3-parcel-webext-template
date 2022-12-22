# mv3-parcel-webext-template

Chrome Extension boilerplate for manifest v3.
<img align="right" width="128" src="src/images/icon256.png?raw=true">

Uses [Parcel Web Extension Config](https://parceljs.org/recipes/web-extension/)
and [release-it](https://github.com/release-it/release-it) for GitHub releases.

**After project initialization change `name` field in the `package.json` file. This field will be used as name for `.zip`
with release.**

## Development:

1. Check if your [Node.js](https://nodejs.org/) version is >= **16**.
2. Run `npm install` to install the dependencies.
3. Run `npm start`
4. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.

## Production build:

1. Stop development script (if it is running)
2. Remove installed dev. extension at `chrome://extensions/`
3. Run `npm run build`
4. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder

Also, `zip` file with production build will be created in the `releases` folder.

## Release:

We are using [release-it](https://github.com/release-it/release-it)

1. Generate `personal access token` in github following the steps:
    1. Go to Github->Settings->DeveloperSettings->PersonalAccessTokens
        - [link](https://github.com/settings/tokens/new?scopes=repo&description=release-it)
    2. For title, enter note as `release-it`
    3. For scopes, select only `repo`
    4. Click `Generate token`

2. Create `.env` file inside git repo and copy paste the generated `personal access token` in `GITHUB_TOKEN` variable
    ```
    GITHUB_TOKEN="f941e0..."
    ```
   Or rename already existing `.env.example` file to `.env` and put token there.

3. Run `npm run release`. Under the hood it will run `npm run build` steps, make version bump (in both `package.json`
   and `manifest.json`), commit, push and make GitHub release with `zip` file attached.

## Note

- Version number is used as per `package.json`. `Manifest.json` will be updated during release with the same value.
- Release file name uses `name` field from the `package.json`. Not from `manifest.json`.
