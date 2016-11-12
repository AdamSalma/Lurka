var clc = require('cli-color');
var moment = require('moment');

module.exports = {
    info: function(text) {
        console.log(`${getTime()} ${clc.green("Info")} - ${text}`)
    },
    warn: function(text) {
        console.log(`${getTime()} ${clc.yellow("Warning")} - ${text}`)
    },
    error: function(text) {
        console.log(`${getTime()} ${clc.redBright("Error")} - ${text}`)
    },
    http: function(text) {
        console.log(`${getTime()} ${clc.cyan("Http")} - ${text}`)
    },
    app: function(text) {
        console.log(`${getTime()} ${clc.magentaBright("App")}  - ${text}`)
    },
    custom: function(type, color, text) {
        console.log(`${getTime()} ${clc[color](type)}  - ${text}`)
    }
}

function getTime(){
    return moment().format('H:mm:ss')
}