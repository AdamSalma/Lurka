# Lurka

This repository contains the source code for Lurka, a 4chan desktop application.

Lurka is still under development. The plan is to eventually have a separate repo/CDN to download the compiled app from.

Take a look at the [TODO's](TODO.md) for upcoming additions.

> Lurka is built with Electron, React, Node, Express, ES6, SASS, Gulp, Webpack and love.

## Installation
You will first need to have [Node](https://nodejs.org/en/) and [Git](https://git-scm.com/) installed.
```bash
# Clone the repository
git clone https://github.com/AdamSalma/Lurka.git

# Enter repo and install dependencies
cd Lurka && npm run install-all
```
## Development mode 
This will run Lurka through `localhost:3000` in your browser:
```bash
npm run dev
```
- You can change the default port from `config/index.js`
- Works with [Redux devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

## Production mode
This runs as a desktop application using Electron:
```bash
npm run build && npm start
```

---

#### *Lurk moar*
