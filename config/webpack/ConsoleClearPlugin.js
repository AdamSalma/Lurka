const clear = require('clear');
const clc = require('cli-color');

function ConsoleClearPlugin() {};
ConsoleClearPlugin.prototype.apply = function(compiler) {
    compiler.plugin("compile", (params) => {
        clear();

        console.log()
        console.log(clc.redBright('  888                       888              '))
        console.log(clc.redBright('  888                       888              '))
        console.log(clc.redBright('  888                       888              '))
        console.log(clc.redBright('  888      888  888 888d888 888  888  8888b. '))
        console.log(clc.redBright('  888      888  888 888P"   888 .88P     "88b'))
        console.log(clc.redBright('  888      888  888 888     888888K  .d888888'))
        console.log(clc.redBright('  888      Y88b 888 888     888 "88b 888  888'))
        console.log(clc.redBright('  88888888  "Y88888 888     888  888 "Y888888'))
        console.log()

    });
};

module.exports = module.exports.default = ConsoleClearPlugin;
