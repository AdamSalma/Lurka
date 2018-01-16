import argv from 'argv-parse';
import { Platform } from "electron-builder"
import paths from './paths'
/**
 * Uses process.argv to determine which config should be used.
 * If none are met, an error is thrown.
 *
 * @return {Object} The config file
 */
export default function getElectronPackageConfig() {
    const args = argv({
        "windows": {
            alias: "w"
        },
    });

    if (args.windows)
        return windowsConfig

    if (args.mac || args.osx)
        return macConfig

    if (args.linux)
        return linuxConfig

    return windowsConfig
}


/**
 * Windows configuration
 */
const windowsConfig = withDefaults({
    targets: Platform.WINDOWS.createTarget("portable")
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
        }

    }, config);
}
