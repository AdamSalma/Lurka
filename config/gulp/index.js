// Some of the tasks use `require('config')` which is an
// alias defined in .babelrc
// which is why they need access to .babelrc through es6:
require("@babel/register");
require("./gulpfile");
