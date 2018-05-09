// Configure your apps at the bottom of this file.

const fs = require('fs')

/**
 * Generates an app config from minimal input.
 *
 * @param options App options.
 * @param options.name Name of the app. Required.
 * @param options.version Version of the app to use. The app is expected to be found in `${name}/releases/${version}`. Required.
 * @param options.env.PORT Required, because apps should look for this environment variable, and listen to that port.
 * @see https://pm2.keymetrics.io/docs/usage/application-declaration/
 */
const standardNodeApp = (options = {}) => {
    if (typeof options.name === 'undefined') {
        throw new Error(`The option 'name' must be defined.`)
    }

    if (typeof options.version === 'undefined') {
        throw new Error(`The option 'version' must be defined.`)
    }

    if (typeof options.env === 'undefined' || typeof options.env.PORT === 'undefined') {
        throw new Error(`The option 'env.PORT' must be defined for the app named '${options.name}'.`)
    }

    const cwd = `${__dirname}/${options.name}/releases/${options.name}-${options.version}`
    const pkg = `${cwd}/package.json`
    fs.accessSync(pkg, fs.constants.R_OK)

    return {
        cwd,
        script: 'bash',
        args: `-c "
    set -e
    if [ -f yarn.lock ]; then
        yarn install
        yarn start
    else
        npm install
        npm start
     fi
    "`,
        listen_timeout: 8000,
        min_uptime: 10000,
        restart_delay: 3000,
        max_restarts: 24 * 60 * 60 * 1000 / 3000,
        ...options,
        env: {
            NODE_ENV: 'production',
            ...options.env
        }
    }
}

module.exports = {
    /**
     * Add app configurations here.
     * Un-comment the example-app configuration to try it.
     */
    apps: [
        standardNodeApp({name: 'example-app', version: '1.0.1', env: {PORT: 3001}}),
        standardNodeApp({name: 'second-app', version: '1.1.2', env: {PORT: 3002}})
    ]
}
