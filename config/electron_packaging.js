import argv from 'argv-parse';
import { Platform, Arch } from "electron-builder";
import paths from './paths';
import fs from 'fs';


const args = argv({
    "windows":  { alias: "w" },
    "mac":      { alias: "m" },
    "osx":      { alias: "o" },
    "linux":    { alias: "l" },
    "current":  { alias: "c" },
    "portable": { alias: "p"}
});


/**
 * Uses process.argv or the passed in argument to determine which config should be used.
 * If none are met, an error is thrown.
 *
 * @return {Object} The config file
 */
export default function getElectronPackageConfig(opts = args) {
    const portable = opts.portable ? "portable" : "";

    if (opts.current) {
        return withDefaults({
            targets: Platform.current().createTarget()
        });
    }

    if (opts.windows)
        return windowsConfig

    if (opts.mac || opts.osx)
        return macConfig

    if (opts.linux)
        return linuxConfig

    return Object.assign({}, windowsConfig, macConfig, linuxConfig, {
        targets: [
            Platform.WINDOWS.createTarget("nsis", Arch.ia32, Arch.x64),
            Platform.MAC.createTarget()
            Platform.LINUX.createTarget()
        ]
    })
}


/**
 * Windows configuration
 */
const windowsConfig = withDefaults({
    targets: Platform.WINDOWS.createTarget("nsis", Arch.ia32, Arch.x64)
});


/**
 * Ma configuration
 */
const macConfig = withDefaults({
    targets: Platform.MAC.createTarget(),
    category: "your.app.category.type",
    target: [
        "zip",
        "dmg"
    ],
    dmg: {
        contents: [{
            x: 130, y: 220
        }, {
            x: 410, y: 220,
            type: "link",
            path: "/Applications"
        }]
    }
});


/**
 * Linux configuration
 */
const linuxConfig = withDefaults({
    targets: Platform.LINUX.createTarget(),
});


/**
 * Helper to write 'DRY'er configs
 */
function withDefaults(config) {
    return Object.assign({
        "appId": "lurka",
        "productName": "Lurka",
        "name": "Lurka",
        "files":
        // {
        //     "from": paths.build,
        //     "to": paths.dist, //"path/to/destination",
        //     "filter": ["**/*", "!node_modules", "!README"]
        //   },
        [
            "build/**/*",
            "build/*.ttf",
            "build/*.js",
            "build/*.json",
            "build/index.js"
        ],
        "directories": {
            "buildResources": paths.build,
            "output": paths.dist,
            "app": paths.build
        },
        publish: {
            provider: "github",
            token: getGithubToken(),
        }

    }, config);
}


function getGithubToken() {
    const file = fs.readFileSync(paths.github_token);
    return file.toString().split("\n")[0]
}
