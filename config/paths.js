// This binds the root directory to path.join, so it can be used to join paths
// relative to the root dir

var pathToRootRelative = "../";
var join = require("path").join.bind(null, __dirname, pathToRootRelative);

var paths = {
  root: join(),
  app: join("frontend"),
  app_entry: join("frontend", "index.tsx"),
  build: join("build"),
  app_modules: join("build", "node_modules"),
  app_bundle: join("build", "app.bundle.js"),
  dist: join("dist"),
  electron_entry: join("electron", "index.js"),
  logo: join("public", "images", "logo.png"),
  app_html: join("public", "main.html"),
  app_preloader: join("public", "preloader.html"),
  github_token: join("github_token.txt"), // you have to make this to be able to publish
};

module.exports = module.exports.default = paths;
