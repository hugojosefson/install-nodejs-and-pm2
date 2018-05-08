# centos-nodejs

Script for installing Node.js and pm2 in centos or RHEL.

Tested in RHEL 6.9.

## Usage

```bash
# ./install-nodejs-and-pm2
```

## What it does

 * Creates system user `nodejs` if it does not already exist.
 * Installs Node.js via `nvm` for the `nodejs` user.
 * Installs latest versions of `npm`, `yarn`, `pm2`.
 * Sets up `pm2` to run as the `nodejs` user on boot.
 * Prints a message at the end, to prove Node.js was installed correctly.

The script is idempotent, and can be re-run as many times as you like.
If you have updated for example the desired version numbers in the script,
or newer versions of the installed packages are available, they will be
updated if you re-run the script as root.

