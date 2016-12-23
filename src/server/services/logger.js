'use strict'
var clc = require('cli-color');
var moment = require('moment');

var config = '[[]H:mm[]]'
var loggerWidth = 130

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
    let callee = (new Error).stack.split("\n")[4]  // get file path of callee
    return callee.split('\\').pop().split('/').pop()  // handles \ or /
}

function format(string) {
    let callee = getPath(),
        time = getTime(),
        path_ = callee.split(':')

    callee = clc.underline(path_[0])+':'+clc.bold(path_[1])  // color path and join
    time = clc.bold(time)

    let whitespace = loggerWidth - (string.length + callee.length + time.length)
    whitespace = Array(whitespace > 0 ? whitespace : 2).join(" ")

    let message = `${time} ${string} ${whitespace} ${callee}`

    console.log(message)
}
