export const SismoAbi = [  {    "inputs": [      {        "internalType": "address",        "name": "_safe",        "type": "address"      },      {        "internalType": "bytes16",        "name": "_appId",        "type": "bytes16"      },      {        "internalType": "bytes16",        "name": "_groupId",        "type": "bytes16"      }    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "bytes16",
        "name": "_groupId",
        "type": "bytes16"
      }
    ],
    "name": "setGroupId",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "internalType": "enum Enum.Operation",
        "name": "operation",
        "type": "uint8"
      },
      {
        "internalType": "bytes",
        "name": "zkConnectResponse",
        "type": "bytes"
      }
    ],
    "name": "execTransactionFromModule",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "threshold",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "zkConnectResponse",
        "type": "bytes"
      }
    ],
    "name": "addOwner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
