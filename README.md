# install-nodejs-and-pm2

Script for installing Node.js and [pm2](https://pm2.keymetrics.io/), on a Linux server with for example CentOS or RHEL.

Tested in RHEL 6.9.

## Get the script

```bash
curl -o install-nodejs-and-pm2 https://raw.githubusercontent.com/hugojosefson/install-nodejs-and-pm2/master/install-nodejs-and-pm2
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
 * Sets up `~nodejs/apps/` where configuration and apps live.
 * Prints a message at the end, to prove Node.js was installed correctly.

The script can be re-run as many times as you like.

If you...

 * change any desired version numbers by setting corresponding
environment variables, or
 * change any desired version numbers by editing the script, or
 * if newer versions of the installed packages are available,

...they will be updated when you re-run the script as root.

## Configure and deploy apps

Log in as the `nodejs` user.

The script sets up a directory `apps`, with an `ecosystem.config.js` file.

The `ecosystem.config.js` file is default configured to expect apps to have one directory each in
the `apps` folder. Add your apps' `pm2` configurations to `ecosystem.config.js`.

A complete directory structure might look like this:

```
apps/
├── ecosystem.config.js
├── example-app
│   ├── current -> releases/example-app-1.0.1
│   └── releases
│       ├── example-app-1.0.0
│       │   ├── index.js
│       │   └── package.json
│       └── example-app-1.0.1
│           ├── index.js
│           └── package.json
└── second-app
    ├── current -> releases/second-app-1.1.2
    └── releases
        ├── second-app-1.0.0
        │   ├── index.js
        │   └── package.json
        └── second-app-1.1.2
            ├── index.js
            └── package.json
```

It is recommended to unpack each app in the `releases/` directory, and symlink `current` to the
version to use.

## Run and save

To start the apps defined in `apps/ecosystem.config.js`, log in as the `nodejs` user and use these
commands:

```bash
# Check current status
pm2 status
pm2 dash

# Start or reload defined services
pm2 startOrReload ~/apps/ecosystem.config.js
```

Note that `pm2 startOrReload` does not stop any apps you remove from `apps/ecosystem.config.js`.
You must therefore `pm2 stop` and/or `pm2 delete` them yourself.

### Save

For the apps to start when `pm2` starts, you must save the current process list:

```bash
# Save current process list for next boot
pm2 save
```
Remember to `pm2 save` whenever you start or stop something that should stay started or stopped!

## Example configuration and apps

Look at the [`example/apps/`](./example/apps) directory for how to structure your applications, and
configure them.

To download them directly, and overwrite your current config, you may do this as the `nodejs` user:

```bash
cd ~

curl -sS -L https://api.github.com/repos/hugojosefson/install-nodejs-and-pm2/tarball/master \
  | tar xzv --strip-components=2 '*/example'
```