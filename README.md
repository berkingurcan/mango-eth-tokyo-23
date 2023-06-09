# MANGO 🥭

### TLDR;
Identity preserved multisig wallet management & airdrops for GitHub orgs. Empower moderators & contributors with Sismo Connect & Safe. Decentralized rewards, privacy-first! 🥭🔐 #DeFi #blockchain

## What is Mango
Mango is a decentralized, privacy-focused platform designed to streamline financial management for GitHub organizations, enabling moderators to securely manage funds and distribute rewards & contributors to claim their reward. Built on Goerli for now, Mango leverages Sismo Connect for anonymous authentication and Safe for account abstraction and multisig wallet functionality.

Moderators of the repo/organization can manage a Multisig Account Abstraction (AA) Wallet, initiating and approving internal transfers within the organization. Sismo Connect ensures their identities remain private while facilitating secure wallet interactions. The multisig feature provides an additional layer of security, requiring multiple approvals for transactions to be executed.

![image](https://github.com/berkingurcan/mango-eth-tokyo-23/blob/main/Screenshot%202023-04-16%20at%2007.06.39.png)

### Safe SismoConnectModule

In order to gate we use Sismo Verifier and use it in addOwner function. ```addOwner ```function is basically become a authorized contract for changing proxy and call ``` addOwnerWithThreshold ``` function in OwnerManager.sol. Then verified(thanks to Sismo) user becomes a multisignature signer. Also threshold can be changed optionally.

```tsx
function addOwner(address newOwner, uint256 threshold, bytes memory zkConnectResponse) public virtual returns (bool success) {
    // Verify zkConnect proof
    SismoConnectVerifiedResult memory sismoConnectVerifiedResult = verify({
        responseBytes: zkConnectResponse,
        auth: buildAuth({ authType: AuthType.VAULT }),
        claim: buildClaim({ groupId: groupId }),
        signature: buildSignature({message: abi.encode(newOwner, threshold)})
    });

    // Call addOwnerWithThreshold function from OwnerManager contract
    safe.addOwnerWithThreshold(newOwner, threshold);

    return true;
}
```

Current module contract: https://goerli.etherscan.io/address/0x9BC26354920410929aC057DaF44840168a4AD3AB#code

### Business Logic
- Admin/Project Owner create a Safe Account
- Some balance deposited by Funder
- Project Mods can claim themselves as Multisig signer while ensuring their privacy
- And according to Wallet's functionality they can use its balance or approve transaction requests

### Next Steps
Mango also introduces a seamless airdrop system for rewarding contributors. Moderators can create token airdrops and Contributors can then claim their rewards using Sismo Connect, ensuring their privacy is maintained throughout the process. The platform integrates with an ERC-20 token smart contract for efficient token distribution.

By combining privacy, security, and convenience, Mango aims to revolutionize financial management and rewards distribution in the GitHub ecosystem, fostering a more collaborative and engaging environment for open-source projects.

### Similar Projects
zkSafe: https://github.com/emilianobonassi/zkSafe


#### DEPLOYED MANGO TOKENS FOR FURTHER USAGES :) :
Scroll Token Contract: https://blockscout.scroll.io/address/0x07674A24e87188ff32F0ADba1A07C45Abf96F56c/contracts#address-tabs
<br />
Polygon Token Contract: https://polygonscan.com/tx/0x0451fff83a975506c78fbb6ae666968e044affb24d5e36c80c4cbc3ba4cdb0ac
<br />
[Twitter link](https://twitter.com/IzbanKokusu/status/1647370949862510593)

