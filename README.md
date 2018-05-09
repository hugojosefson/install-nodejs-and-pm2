# install-nodejs-and-pm2

Script for installing Node.js and [pm2](https://pm2.keymetrics.io/), on a Linux server with for example CentOS or RHEL.

Tested in RHEL 6.9.

## Get the script

```bash
curl -O install-nodejs-and-pm2 https://raw.githubusercontent.com/hugojosefson/install-nodejs-and-pm2/master/install-nodejs-and-pm2
chmod +x install-nodejs-and-pm2
```

## Run it

Run as `root`:

```bash
./install-nodejs-and-pm2
```

If you want, you can also override environment variables in the script. For example:

```bash
NODEJS_VERSION=12 NODEJS_HOME_DIR=/srv/nodejs ./install-nodejs-and-pm2
```

## What it does

 * Creates system user `nodejs` if it does not already exist.
 * Installs Node.js via `nvm` for the `nodejs` user.
 * Installs latest versions of `npm`, `yarn`, `pm2`.
 * Sets up `pm2` to run as the `nodejs` user on boot.
 * Prints a message at the end, to prove Node.js was installed correctly.

The script can be re-run as many times as you like.

If you...

 * change any desired version numbers by setting corresponding
environment variables, or
 * change any desired version numbers by editing the script, or
 * if newer versions of the installed packages are available,

...they will be updated when you re-run the script as root.

## TODO

 * Deploy apps.
    * Configure a single place (file?) for running all apps.
    * http://pm2.keymetrics.io/docs/usage/deployment/
