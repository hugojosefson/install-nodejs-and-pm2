const { createAppConfig } = require('./ecosystem.config.js-helper')

/**
 * Add app configurations here.
 *
 * This will NOT be overwritten by `~/install-nodejs-and-pm2`.
 */
module.exports = {
  apps: [
    createAppConfig({name: 'example-app', version: '1.0.1', env: {PORT: 3001}}),
    createAppConfig({name: 'second-app', version: '1.1.2', env: {PORT: 3002}})
  ]
}
