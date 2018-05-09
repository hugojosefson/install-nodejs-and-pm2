const getPort = env => {
    const number = parseInt(env.PORT, 10)
    if (isNaN(number)) {
        console.error('Environment variable PORT must be defined as a number.')
        process.exit(1)
    } else {
        return number
    }
}

const {name, version} = require('./package.json')
const port = getPort(process.env)

require('express')().listen(port, () => {
    console.log(`${name} version ${version} listening to port ${port}...`)
})
