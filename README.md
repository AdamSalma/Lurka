# Lurka

This repository contains the source code for a desktop application used for viewing 4chan and reddit. It uses Electron, React, ES6, SASS, Express, Node, Gulp and Webpack.

Take a look at the [TODO's](TODO.md) for upcoming additions.

## Installation
You will first need to have [Node](https://nodejs.org/en/) and [Git](https://git-scm.com/) installed already.
```bash
# Clone the repository
git clone https://github.com/AdamSalma/Lurka.git

# Enter repo and install dependencies
cd Lurka && npm run install-all
```
## Development mode 
This will run through `localhost:3000` in your browser:
```bash
npm run dev
```
You can change the default port from config/index.js

## Production mode
This runs as a desktop application using Electron:
```bash
npm run build && npm start
```

**Note to self:** Post some screenshots
