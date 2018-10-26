## Rednit Dapp

### Running rednit on dev environment (quick option)

To install dependencies and build projects, run the following commands from the main project directory:

```sh
yarn && yarn build
```

To run rednit:

```sh
cd rednit
yarn dev:start
```

### Running rednit on dev environment (manual option, deprecated, will be removed soon)

Before running the rednit, first you must start a mock blockchain. From the `universal-login-relayer` directory run the following command:

```sh
yarn ganache:start
```

then deploy ens contracts and start relayer, from new console in the `universal-login-relayer` directory type:

```sh
yarn ens:deploy
yarn relayer:start
```

then deploy contracts for the rednit application and run the application (from new console in the `rednit` directory):

```
yarn contracts:deploy
yarn start
```
