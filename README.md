# Article keeper

## New projects

Clone this repo, add the upstream for updates

```bash
git clone https://github.com/snaerth/article-keeper.git my-project
cd my-project
git remote add upstream https://github.com/snaerth/article-keeper.git
git remote set-url --push upstream no_push # disable push to upstream
```

Change values in `app.json` and `config/values.js`. Delete this part of the readme.

## Development

```
npm run dev
```

* When adding configuration values and environment specific values, use the [project config](https://github.com/ctrlplusb/react-universally/blob/master/internal/docs/PROJECT_CONFIG.md)
* In development vendor DLLs are created (see `devVendorDLL` in `config/values.js`) to speed up builds, for large projects you can add your own deps there

## Production build

```bash
npm run build
npm start
```

## Updating from upstream

Make sure you have the `upstream` remote, then:

```bash
git fetch upstream
git merge upstream/master

# These are the usual conflicts
git rm -r -f shared/components/DemoApp
git checkout --ours package.json
```

## Remote development

Now supports ngrok and other ways to access your development build.

```bash
# outside wifi
ngrok http 3000
CLIENT_DEV_PROXY=1 PUBLIC_URL=http://xxxxxx.ngrok.io yarn run dev
# or local network
HOST=192.168.123.456 PORT=3000 yarn run dev
```

## Stricter development

For those so inclined, pre-commit linting hooks can be added by changing `lint-stage` in `package.json` to:

```json
"lint-staged": {
  "*.{js,jsx}": "./node_modules/.bin/eslint",
  "*.{css,scss}": "./node_modules/.bin/stylelint"
}
```

Testing can be enabled by adding to `scripts`:

```json
"test": "jest"
```

---

<p align='center'>
  <h1 align='center'>React, Universally</h1>
  <p align='center'><img width='150' src='https://raw.githubusercontent.com/ctrlplusb/assets/master/logos/react-universally.png' /></p>
  <p align='center'>A starter kit for universal react applications.</p>
</p>

[![All Contributors](https://img.shields.io/badge/all_contributors-20-orange.svg?style=flat-square)](#contributors)

## About

This starter kit contains all the build tooling and configuration you need to kick off your next universal React project, whilst containing a minimal "project" set up allowing you to make your own architecture decisions (Redux/MobX etc).

> NOTICE: Please read this important [issue](https://github.com/ctrlplusb/react-universally/issues/409) about the behaviour of this project when using `react-async-component`, which is by default bundled with it.

## Features

* 👀 `react` as the view.
* 🔀 `react-router` v4 as the router.
* 🚄 `express` server.
* 🎭 `jest` as the test framework.
* 💄 Combines `prettier` and Airbnb's ESlint configuration - performing code formatting on commit. Stop worrying about code style consistency.
* 🖌 Very basic CSS support - it's up to you to extend it with CSS Modules etc.
* ✂️ Code splitting - easily define code split points in your source using `react-async-component`.
* 🌍 Server Side Rendering.
* 😎 Progressive Web Application ready, with offline support, via a Service Worker.
* 🐘 Long term browser caching of assets with automated cache invalidation.
* 📦 All source is bundled using Webpack v3.
* 🚀 Full ES2017+ support - use the exact same JS syntax across the entire project. No more folder context switching! We also only use syntax that is stage-3 or later in the TC39 process.
* 🔧 Centralised application configuration with helpers to avoid boilerplate in your code. Also has support for environment specific configuration files.
* 🔥 Extreme live development - hot reloading of ALL changes to client/server source, with auto development server restarts when your application configuration changes. All this with a high level of error tolerance and verbose logging to the console.
* ⛑ SEO friendly - `react-helmet` provides control of the page title/meta/styles/scripts from within your components.
* 🤖 Optimised Webpack builds via HappyPack and an auto generated Vendor DLL for smooth development experiences.
* 🍃 Tree-shaking, courtesy of Webpack.
* 👮 Security on the `express` server using `helmet` and `hpp`.
* 🏜 Asset bundling support. e.g. images/fonts.
* 🎛 Preconfigured to support development and optimised production builds.
* ❤️ Preconfigured to deploy to `now` with a single command.

Redux/MobX, data persistence, modern styling frameworks and all the other bells and whistles have been explicitly excluded from this starter kit. It's up to you to decide what technologies you would like to add to your own implementation based upon your own needs.

> However, we now include a set of "feature branches", each implementing a technology on top of the clean master branch. This provides you with an example on how to integrate said technologies, or use the branches to merge in a configuration that meets your requirements. See the [`Feature Branches`](/internal/docs/FEATURE_BRANCHES.md) documentation for more.

## Getting started

```bash
git clone https://github.com/ctrlplusb/react-universally my-project
cd my-project
npm install
npm run develop
```

Now go make some changes to the `Home` component to see the tooling in action.

## Docs

* [Project Overview](/internal/docs/PROJECT_OVERVIEW.md)
* [Project Configuration](/internal/docs/PROJECT_CONFIG.md)
* [Package Script Commands](/internal/docs/PKG_SCRIPTS.md)
* [FAQ](/internal/docs/FAQ.md)
* [Feature Branches](/internal/docs/FEATURE_BRANCHES.md)
* [Deploy your very own Server Side Rendering React App in 5 easy steps](/internal/docs/DEPLOY_TO_NOW.md)
* [Changelog](/CHANGELOG.md)

## Who's using it and where?

You can see who is using it and how in [the comments here](https://github.com/ctrlplusb/react-universally/issues/437). Feel free to add to that telling us how you are using it, we'd love to hear from you.
