'use strict'

var clc = require('cli-color');
var moment = require('moment');

var loggerWidth = 109

module.exports = {
    info: function(text) {
        format(`${clc.greenBright("Info")} - ${text}`)
    },
    warning: function(text) {
        format(`${clc.yellow("Warning")} - ${text}`)
    },
    error: function(text) {
        format(`${clc.redBright("Error")} - ${text}`)
    },
    http: function(text) {
        format(`${clc.cyanBright("Http")} - ${text}`)
    },
    app: function(text) {
        format(`${clc.magentaBright("App ")} - ${text}`)
    },
    custom: function(type, color, text) {
        format(`${clc[color](type)} - ${text}`)
    }
}

function getTime(){
    return moment().format('H:mm:ss')
}

function getPath(){
    let callee = (new Error).stack.split("\n")[4]
    return callee.split('\\').pop().split('/').pop()  // handles \ or /
}

function format(string) {
    let callee = getPath(), time = getTime()
    let path = callee.split(':')
    let spaces = loggerWidth - (string.length + callee.length + time.length)
    let newString = time +' '+ string +
                    Array(spaces > 0 ? spaces : 2).join(" ") +    // add spaces if possible
                    clc.underline(path[0])+':'+clc.bold(path[1])  // color path and join
    console.info(newString)
}