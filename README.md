# MANGO

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

### Next Steps
Mango also introduces a seamless airdrop system for rewarding contributors. Moderators can create token airdrops and Contributors can then claim their rewards using Sismo Connect, ensuring their privacy is maintained throughout the process. The platform integrates with an ERC-20 token smart contract for efficient token distribution.

By combining privacy, security, and convenience, Mango aims to revolutionize financial management and rewards distribution in the GitHub ecosystem, fostering a more collaborative and engaging environment for open-source projects.
