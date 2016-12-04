'use strict'
var clc = require('cli-color');
var moment = require('moment');

var config = 'H:mm'
var loggerWidth = 108

module.exports = {
    info: function(msg) {
        format(`${clc.greenBright("Info")} - ${msg}`)
    },
    warning: function(msg) {
        format(`${clc.yellow("Warning")} - ${msg}`)
    },
    error: function(msg) {
        format(`${clc.redBright("Error")} - ${msg}`)
    },
    http: function(msg) {
        format(`${clc.cyanBright("Http")} - ${msg}`)
    },
    app: function(msg) {
        format(`${clc.magentaBright("App ")} - ${msg}`)
    }
}

function getTime(){
    return moment().format(config)
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
