import glob from 'glob'
import path from 'path'

describe("Redux", () => {
    glob.sync('**/*.suite.*', {
        cwd: __dirname, absolute: true
    }).map(test => {
        console.error(test)
        require(test).default();
    })
})
