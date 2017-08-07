# Lurka/build

This is the directory where webpack outputs its src builds. This is then used to package the application up into different release formats such as desktop (Electron) and browser (Chrome extension).

### Note
The [`package.json`](package.json) in this directory lists all of app dependencies separately from [`../package.json`](../package.json).

When you run `npm install` outside of this directory, npm will first install the packages listed here and then install using the other `package.json` in the directory above.

This will create two `node_modules` directories, one of which will be in this directory. All scripts in `../package.json` reference both `./node_modules` and `../node_modules` when running src code.
