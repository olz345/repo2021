const util = require('util')

const fs = require('fs')

const readFileP = util.promisify(fs.readFile)

readFileP('./index.html').then(value => {
    console.log(value.toString());
}).catch(() => {
    console.log('err');
})