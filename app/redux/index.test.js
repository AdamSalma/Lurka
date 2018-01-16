import glob from 'glob'
import path from 'path'

describe("Redux", () => {
    glob.sync('**/*.testsuite.*', {
        cwd: __dirname, absolute: true
    }).map(test => {
        require(test).default();
    })
})
