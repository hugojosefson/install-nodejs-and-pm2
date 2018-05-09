/**
 * Generates an app config from minimal input.
 *
 * @param options App options.
 * @param options.name Name of the app. The app is expected to be found in a directory with the same name. Required.
 * @param options.env.PORT Required, because apps should look for it and listen to that port.
 * @see https://pm2.keymetrics.io/docs/usage/application-declaration/
 */
const standardNodeApp = (options = {}) => {
    if (typeof options.name === 'undefined') {
        throw new Error(`The option 'name' must be defined.`)
    }

    if (typeof options.env === 'undefined' || typeof options.env.PORT === 'undefined') {
        throw new Error(`The option 'env.PORT' must be defined for the app named '${options.name}'.`)
    }
    return {
        cwd: `apps/${options.name}`,
        script: 'bash',
        args: `-c "
    set -e
    if [ -f yarn.lock ]; then
        yarn install
        yarn start || exit 1
    else
        npm install
        npm start || exit 1
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
     * Application configuration section
     */
    apps: [
        // standardNodeApp({name: 'app1', env: {PORT: 3001}}),
        // standardNodeApp({name: 'app2', env: {PORT: 3002}})
    ]
}
