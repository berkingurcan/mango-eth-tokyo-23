// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import SismoConnect Solidity library
import "sismo-connect-solidity/SismoLib.sol";

/**
 * @title Mango
 * @author BerkinGurcan
 */
 contract Enum {
    enum Operation {
        Call,
        DelegateCall
    }
}

interface GnosisSafe {
    /// @dev Allows a Module to execute a Safe transaction without any further confirmations.
    /// @param to Destination address of module transaction.
    /// @param value Ether value of module transaction.
    /// @param data Data payload of module transaction.
    /// @param operation Operation type of module transaction.
    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes calldata data,
        Enum.Operation operation
    ) external returns (bool success);
}

interface IOwnerManager {
    function addOwnerWithThreshold(address owner, uint256 threshold) external;
}


contract SismoConnectModule is SismoConnect {
    bytes16 public groupId;
    GnosisSafe public safe;

    //TODO make proxyable w/ initializer
    constructor(address _safe, bytes16 _appId, bytes16 _groupId) SismoConnect(_appId) {
        safe = GnosisSafe(_safe);
        groupId = _groupId;
    }

    /// @dev Change group identifier
    /// @param _groupId group identifier to check the claim
    function setGroupId(bytes16 _groupId) public {
        require(msg.sender == address(safe), "!safe");
        groupId = _groupId;
    }

    IOwnerManager ownerManager = IOwnerManager(address(safe));

    /// @dev Exec tx using zkConnect proof
    /// @param to Destination address of module transaction
    /// @param value Ether value of module transaction
    /// @param data Data payload of module transaction
    /// @param operation Operation type of module transaction
    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes calldata data,
        Enum.Operation operation,
        bytes memory zkConnectResponse
    ) public virtual returns (bool success) {
        SismoConnectVerifiedResult memory result = verify({
            responseBytes: zkConnectResponse,
            auth: buildAuth({authType: AuthType.VAULT}),
            claim: buildClaim({groupId: groupId}),
            signature: buildSignature({message: abi.encode(to, value, data, operation)})
        });

        require(safe.execTransactionFromModule(to, value, data, operation), "Module transaction failed");

        return true;
    }

    function addOwner(address newOwner, uint256 threshold, bytes memory zkConnectResponse) public virtual returns (bool success) {
        // Verify zkConnect proof
        SismoConnectVerifiedResult memory sismoConnectVerifiedResult = verify({
            responseBytes: zkConnectResponse,
            auth: buildAuth({ authType: AuthType.VAULT }),
            claim: buildClaim({ groupId: groupId }),
            signature: buildSignature({message: abi.encode(newOwner, threshold)})
        });
        
        // Call addOwnerWithThreshold function from OwnerManager contract
        ownerManager.addOwnerWithThreshold(newOwner, threshold);
        
        // Execute Safe transaction to update the owner list and threshold
        return true;
    }
}