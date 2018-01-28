const clear = require('clear');
const clc = require('cli-color');

function ConsoleClearPlugin() {};
ConsoleClearPlugin.prototype.apply = function(compiler) {
    compiler.plugin("compile", (params) => {
        clear();
        console.log(clc.whiteBright("\nLurka is compiling..."));
    });
};

module.exports = module.exports.default = ConsoleClearPlugin;
