# ZK DROP

## Install

[Install Foundry ](https://book.getfoundry.sh/getting-started/installation)

```bash
forge install
forge update # to update to the latest version of the solidity library (recommended)
```

## Run tests

Test are run using fork tests
First setup your env variables

```bash
cp example.env .env
```

Run tests

```bash
forge test -vvvv --fork-url https://rpc.ankr.com/eth_goerli

# you can also use an environment variable for the RPC_URL
forge test -vvvv --fork-url $RPC_URL
```

## Deploy

Define your deployment mnemonic

```bash
forge script DeployZKDrop --mnemonics "$MNEMONIC" --sender "$SENDER" --broadcast --verify
```
