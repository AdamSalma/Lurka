import minimist from "minimist";
import { Platform, Arch } from "electron-builder";
import paths from "./paths";
import fs from "fs";

const options = {
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
const artifactName = "${productName}-${version}-${os}${arch}.${ext}";
// Publishing options
const publish = {
  provider: "github",
  token: getGithubToken(),
  owner: "AdamSalma",
  repo: "Lurka",
  releaseType: "draft"
};

/**
 * Windows Configuration
 */
const windowsConfig = {
  targets: Platform.WINDOWS.createTarget(
    ["nsis", "portable"],
    Arch.ia32,
    Arch.x64
  )
};

/**
 * Mac configuration
 */
const macConfig = {
  targets: Platform.MAC.createTarget(),
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
    }
  }
};

/**
 * Linux configuration
 */
const linuxConfig = {
  targets: Platform.LINUX.createTarget(["AppImage", "deb"])
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
const appveyorConfig = {
  targets: Platform.WINDOWS.createTarget("nsis", Arch.ia32, Arch.x64),
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    installerIcon: "public/images/icon.*",
    icon: "public/images/icon.*",
    publish
  }
};

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
  const opts = minimist(args, options);
  const withDefaults = createDefaulter(opts);

  // Use current platform
  if (opts.current) {
    console.info("Packaging for current platform");
    return withDefaults(currentConfig);
  }

  /**
   * CI/CD
   */

  // Windows (AppVeyor deployments)
  if (opts.appveyor) {
    console.info("Packaging for Appveyor (Windows)");
    return withDefaults(appveyorConfig, args);
  }

  // Mac + Linux (Travis CI packages)
  if (opts.travis) {
    console.info("Packaging for TravisCI (Mac + Linux)");
    return withDefaults(travisConfig, args);
  }

  /**
   * SINGULAR
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
const createDefaulter = args => build => {
  const config = Object.assign(
    {},
    {
      appId: "lurka",
      productName: "Lurka",
      files: [
          "build/**/*",
          "public/images/icon.*"
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
  return {
    ...build,
    config: {
      ...build.config,
      publish
    }
  };
}
