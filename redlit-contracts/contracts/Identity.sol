pragma solidity ^0.4.24;

import "./ENSRegistered.sol";
import "./SignedApprovalScheme.sol";
import "openzeppelin-solidity/contracts/ECRecovery.sol";

contract Identity is ENSRegistered, SignedApprovalScheme {
	using ECRecovery for bytes32;

	event ProfileEdit(string profileHash);

    constructor(
        bytes32 _key, bytes32 _hashLabel, string _name, bytes32 _node, ENS ens, FIFSRegistrar registrar, PublicResolver resolver)
        payable public
        ENSRegistered(_hashLabel, _name, _node, ens, registrar, resolver)
        SignedApprovalScheme(_key) {
    }

    function editProfile(string _profileHash) public {
        require(keys[bytes32(msg.sender)].key != 0x0);
        emit ProfileEdit(_profileHash);
    }
}
