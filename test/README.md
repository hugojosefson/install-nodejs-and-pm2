## Testing in Docker

To try the script in a Docker container, you may go back down to the project's root directory, and
run any of these lines:

```bash
./build && docker build -t install-nodejs-and-pm2:latest -f test/debian/7/Dockerfile .
./build && docker build -t install-nodejs-and-pm2:latest -f test/debian/9/Dockerfile .
./build && docker build -t install-nodejs-and-pm2:latest -f test/ubuntu/14.04/Dockerfile .
./build && docker build -t install-nodejs-and-pm2:latest -f test/ubuntu/18.04/Dockerfile .
```

Then to explore the environment, start what you built, then become the `nodejs` user:

```bash
docker run -it install-nodejs-and-pm2
su - nodejs
pm2 status
```

See also [../README.md](../README.md) for example apps. (Scroll to bottom)
