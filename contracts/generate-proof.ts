const opn = require("better-opn");
import {
  AuthType,
  ClaimType,
  SismoConnect,
  SismoConnectClientConfig,
} from "@sismo-core/sismo-connect-client";
import { ethers } from "ethers";

// This is the configuration needed to
// use the appId registered in the Sismo Factory
// and configure devMode if needed
const sismoConnect = SismoConnect({
  appId: "0x11b1de449c6c4adb0b5775b3868b28b3",
  devMode: {
    displayRawResponse: true,
  },
} as SismoConnectClientConfig);

const abiCoder = new ethers.AbiCoder();

const url = sismoConnect.getRequestLink({
  claims: [
    {
      groupId: "0xe9ed316946d3d98dfcd829a53ec9822e",
      groupTimestamp: "latest",
      value: 1,
      claimType: ClaimType.GTE,
      extraData: "",
    },
  ],
  auths: [
    {
      authType: AuthType.VAULT,
    },
  ],
  signature: {
    message: abiCoder.encode(["address"], ["0x040200040600000201150028570102001e030E26"]),
  },
});

console.log("url", url);
console.log("http://staging.dev.vault-beta.sismo.io/connect?" + url.split("?")[1]);

opn("http://staging.dev.vault-beta.sismo.io/connect?" + url.split("?")[1]);
