# mv3-parcel-webext-template

Chrome Extension boilerplate for manifest v3.
<img align="right" width="128" src="src/images/icon256.png">

Uses [Parcel Web Extension Config](https://parceljs.org/recipes/web-extension/)
and [release-it](https://github.com/release-it/release-it) for GitHub releases.

## Note

- After project initialization change `name` field in the `package.json` file. This field will be used as name
  for `.zip` with release. Not the `name` field from the `manifest.json`.
- Version number for release is used as per `package.json`. `Manifest.json` will be updated during release with the same
  value. So no need to update version inside `manifes.json` manually if you will use `release` script.
- there is configured [Dependabot version updates](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates). 
If you do not want to have PRs with your dependencies version updates, remove `github/dependabot.yml` file.

## Development:

1. Check if your [Node.js](https://nodejs.org/) version is >= **16**.
2. Run `npm install` to install the dependencies.
3. Run `npm start`
4. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `dist` folder.

## Production build:

1. Stop development script (if it is running)
2. Remove installed dev. extension at `chrome://extensions/`
3. Run `npm run build`
4. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `dist` folder

Also, `zip` file with production extension's code will be created in `releases` folder.
This code is ready for uploading to Chrome Web Store.

## Release:

Template uses [release-it](https://github.com/release-it/release-it) for release flow.

1. Generate `personal access token` in GitHub. Go to
   [Github->Settings->DeveloperSettings->PersonalAccessTokens](https://github.com/settings/tokens/new?scopes=repo&description=release-it).
   Only `repo` scope is required.
2. Rename already existing `.env.example` file to `.env` and put generated `personal access token` there. It will look
   like:
    ```
    GITHUB_TOKEN="your generated token"
    ```
3. Run `npm run release`. Under the hood it will run `npm run build` steps, make version bump (in both `package.json`
   and `manifest.json`), commit, push and make GitHub release with generated `zip` file attached.

## Recipes

If you need to have some page which is not listed in `manifest.json`, you may add it as additional entry point.
Something like that:

```
"start": "parcel watch src/manifest.json src/panel/panel.html --host localhost",
"build": "parcel build src/manifest.json src/panel/panel.html  --no-cache"
```

In that case `panel` folder will be created in `dist`
and you may reference it from your code like `panel/panel.html`.
