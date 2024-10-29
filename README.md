# mv3-parcel-webext-template

Chrome Extension boilerplate for manifest v3.
<img align="right" width="128" src="src/images/icon256.png">

This template uses [Parcel Web Extension Config](https://parceljs.org/recipes/web-extension/)
and [release-it](https://github.com/release-it/release-it) for GitHub releases.

## How to use

- Click [<kbd>Use this template</kbd>](https://github.com/onikienko/mv3-parcel-webext-template/generate) button on the top of the page.
- After project initialization, change the `name` field in the `package.json` file. This field will be used as a name
  for `.zip` with production build.
- Update `repository`, `author`, `bugs`, `license`, and `homepage` props in `package.json` according to your needs.
- There is configured [Dependabot version updates](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates).
  If you do not want PRs with your dependency version updates, remove the `.github/dependabot.yml` file.

### Development:

1. Check if your [Node.js](https://nodejs.org/) version is >= **20**.
2. Run `npm install` to install the dependencies.
3. Run `npm start`
4. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `dist` folder.

### Production build:

1. Stop the development script (if it is running)
2. Run `npm run build`
3. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `dist` folder

`zip` file with the production extension's code will be created in the `releases` folder.
This code is ready to be published in the Chrome Web Store.

### Release:

During the `release` script execution you will be asked for a new version number, so there is no need to change the version manually.
The script will bump the version in `package.json` and `manifest.json`.

This template uses [release-it](https://github.com/release-it/release-it) for release on GitHub.

1. Generate `personal access token` in GitHub. Go to
   [Github->Settings->DeveloperSettings->PersonalAccessTokens](https://github.com/settings/tokens/new?scopes=repo&description=release-it).
   Only `repo` scope is required.
2. Rename the existing `.env.example` file to `.env` and put the generated `personal access token` there. It will look
   like:
    ```
    GITHUB_TOKEN="your generated token"
    ```
3. Run `npm run release`. Under the hood, it will make a version bump (in both `package.json` and `manifest.json`),
   run `npm run build` steps, commit, push, and make a GitHub release with the generated `zip` file attached.

## Known issues

Parcel Web Extension Config [does not support](https://github.com/parcel-bundler/parcel/issues/5758) `scripting` API
(`executeScript`, `insertCSS`, etc.)
As a workaround, take a look at the recipe below.

## Recipes

### Usage with `chrome.scripting` API

If you need to inject scripts dynamically using `chrome.scripting` API, you could add these scripts to `manifest.json`
as an additional entry point.

For such code

```javaScript
chrome.scripting.executeScript({
    target: {tabId},
    files: ["checker/index.js"],
})
```

you could update your scripts in `manifest.json` like this:

```
"start": "parcel watch src/manifest.json src/checker/index.js --host localhost",
"build": "parcel build src/manifest.json src/checker/index.js  --no-cache"
```

If you need to use assets in such a dynamically injected script,
put them in `web_accessible_resources` in your `manifest.json`:

```
  "web_accessible_resources": [
    {
      "resources": [
        "web-accessible/icon.png"
      ],
      "matches": [
        "<all_urls>"
      ]
    }
  ]
```

And in your code, you will need to use them like

```javaScript
<image src={chrome.runtime.getURL('web-accessible/icon.png')}/>
```

Do not use `import icon from "./web-accessible/icon.png"` in such scripts.

### If you need to have a page not listed in `manifest.json`

The same goes for a page(s) not listed in `manifest.json`.
You can add it as an additional entry point(s).

Something like that:

```
"start": "parcel watch src/manifest.json src/panel/panel.html --host localhost",
"build": "parcel build src/manifest.json src/panel/panel.html  --no-cache"
```

In that case `panel` folder will be created in `dist` and you can reference it from your code like `panel/panel.html`.

You can take a look at this [example](https://github.com/onikienko/keygenjukebox-play-button/tree/master/mv3). There is an additional entry point (`offscreen.html`) that is not listed in `manifest.json` (`chrome.offscreen` API usage).

### How to get rid of React

If you do not need to use React in your extension:

```shell
npm uninstall react react-dom @types/react @types/react-dom eslint-plugin-react eslint-plugin-react-hooks
```

React is used only in `popup`,
so remove `src/popup/App.js` and update `src/popup/index.js` to meet your needs.

In the `.eslintrc.json` file remove all the strings related to `react` (in `extends`, `plugins`, and `rules` props ).
