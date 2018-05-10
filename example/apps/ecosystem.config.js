const { standardNodeApp } = require('./ecosystem.config.js-helper')

module.exports = {
    /**
     * Add app configurations here.
     */
    apps: [
        standardNodeApp({name: 'example-app', version: '1.0.1', env: {PORT: 3001}}),
        standardNodeApp({name: 'second-app', version: '1.1.2', env: {PORT: 3002}})
    ]
}
