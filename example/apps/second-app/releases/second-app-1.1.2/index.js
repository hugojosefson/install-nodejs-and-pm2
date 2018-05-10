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

const app = require('express')()
const server = app.listen(port, () => {
  console.log(`${name} version ${version} listening to port ${port}...`)
})

process.on('SIGINT', () => {
  console.log('Received SIGINT, will shut down...')
  if (typeof server.stop === 'function') {
    server.stop(() => {
      console.log('HTTP Server has shut down and is not listening. Exiting.')
      process.exit(0)
    })
  } else {
    console.log('Exiting.')
    process.exit(0)
  }
})
