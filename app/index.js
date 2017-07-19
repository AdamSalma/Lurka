var electronBundle = "./electron.bundle";

if (require('fs').existsSync(electronBundle)) {
    require(electronBundle);
} else {
    throw new Error(`Couldn't locate entry file at ${electronBundle}.js. Run "npm run build" to fix this.`);
}
