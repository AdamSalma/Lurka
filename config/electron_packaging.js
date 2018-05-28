import minimist from "minimist";
import { Platform, Arch } from "electron-builder";
import paths from "./paths";
import fs from "fs";
import packageJson from '-/package.json'

const availableTargets = {
  boolean: [
    "travis",
    "appveyor",
    "windows",
    "mac",
    "osx",
    "linux",
    "current",
    "portable"
  ]
};

process.env.DEBUG = "electron-builder";

// The setup filename
const artifactName = "${productName}Setup-${os}.${ext}";
const iconPath = "public/images/icon.ico";

// Publishing options
const publish = {
  provider: "github",
  token: getGithubToken(),
  owner: "AdamSalma",
  repo: "Lurka",
  releaseType: process.env.RELEASE_TYPE || "draft"
};

/**
 * Windows Configuration
 */
const windowsConfig = {
  targets: Platform.WINDOWS.createTarget("nsis", Arch.ia32, Arch.x64),
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    installerIcon: iconPath,
    icon: iconPath,
    publish
  },
  icon: iconPath
};

/**
 * Mac configuration
 */
const macConfig = {
  targets: Platform.MAC.createTarget(["dmg"]),
  config: {
    target: ["dmg"],
    dmg: {
      contents: [
        {
          x: 130,
          y: 220
        },
        {
          x: 410,
          y: 220,
          type: "link",
          path: "/Applications"
        }
      ],
      artifactName
    },
    artifactName
  },
  artifactName
};

/**
 * Linux configuration
 */
const linuxConfig = {
  targets: Platform.LINUX.createTarget(["AppImage", "deb"]),
  config: { artifactName },
  artifactName
};

/**
 * Current Platform package config
 */
const currentConfig = {
  targets: Platform.current().createTarget()
};


/**
 * Appveyor Configuration
 */
const appveyorConfig = withPublishing(windowsConfig);

/**
 * Travis Configuration
 */
const travisConfig =
  process.env.TRAVIS_OS_NAME === "osx"
    ? withPublishing(macConfig)
    : withPublishing(linuxConfig);


/**
 * Uses process.argv or the passed in argument to determine which config should be used.
 * If none are met, an error is thrown.
 *
 * @return {Object} The config file
 */
export default function getElectronPackageConfig(args) {
  const opts = minimist(args, availableTargets);
  const withDefaults = createDefaulter(opts);

  // Use current platform
  if (opts.current) {
    console.info("Packaging for current platform");
    return withDefaults(currentConfig);
  }

  /**
   * CI/CD
   * -----
   */

  // AppVeyor CI (Windows)
  if (opts.appveyor) {
    console.info("Packaging for Appveyor (Windows)");
    return withDefaults(appveyorConfig, args);
  }
  // Travis CI (Mac + Linux)
  if (opts.travis) {
    console.info("Packaging for TravisCI (Mac + Linux)");
    return withDefaults(travisConfig, args);
  }

  /**
   * SINGLE PLATFORM
   * ---------------
   */

  // Windows
  if (opts.windows) {
    console.info("Packaging for Windows");
    return withDefaults(windowsConfig);
  }
  // OSx
  if (opts.mac || opts.osx) {
    console.info("Packaging for MacOS");
    return withDefaults(macConfig);
  }
  // Single Linux packaging
  if (opts.linux) {
    console.info("Packaging for Linux");
    return withDefaults(linuxConfig);
  }

  // Otherwise, use whatever platform you're on
  console.info("No platform specified. Packaging will match current platform.");
  return withDefaults(currentConfig);
}

/**
 * Helper to write 'DRY'er configs
 */
function createDefaulter(args) {
  return build => {
    const config = Object.assign(
      {},
      {
        appId: "lurka",
        productName: "Lurka",
        files: [
            "build/**/*",
            "public/images/icon.ico"
        ],
        directories: {
          buildResources: "build",
          output: "dist"
        },
        artifactName
      },
      build.config
    );

    return Object.assign({ config, artifactName }, build, config);
  };
}

function getGithubToken() {
  // Reads from github_token.txt on project root. You have to create it ;)
  // Or, set GH_TOKEN
  try {
    return (
      process.env.GH_TOKEN ||
      fs
        .readFileSync(paths.github_token)
        .toString()
        .split("\n")[0]
    );
  } catch (err) {
    console.log(
      `No github_token.txt exists at ${paths.github_token} so can't publish.`
    );
  }
}

function withPublishing(build) {
  return createDefaulter()({
    ...build,
    config: {
      ...build.config,
      artifactName,
      publish
    }
  });
}
