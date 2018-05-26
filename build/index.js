var entryFile = "./electron.bundle.js";
var entryPath = require('path').join(__dirname, entryFile)

if (require('fs').existsSync(entryPath)) {
    console.log("Lurka: loading entry path from: '", entryPath, "'")
    require(entryPath);
} else {
    throw new Error(`Couldn't locate entry file at ${entryPath}. Run "npm run build" to fix this.`);
}
