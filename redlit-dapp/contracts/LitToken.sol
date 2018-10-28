pragma solidity ^0.4.24;

import "./RelationChannel.sol";
import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract LitToken is StandardToken {

  string public constant name = "Lit";
  string public constant symbol = "LIT";
  uint8 public constant decimals = 18;

  mapping (address => bool) public registeredUsers;

  event ProfileEdit(address user, string profileHash);
  event RelationChannelCreated(address relationChannel, address personA, address personB);
  event RegisterUser(address user);

  struct Request {
    address addr;
    uint256 tokens;
  }

  // Relations contract => lover => balance
  mapping(address => mapping(address => uint256)) public relations;

  // From => To => stake balance request
  mapping(address => mapping(address => uint256)) public request;

  // Maximun token balance of a user
  uint256 public constant MAX_BALANCE = 100 * (10 ** uint256(decimals));

  function editProfile(string _profileHash) public {
      emit ProfileEdit(msg.sender, _profileHash);
  }

  function register() public {
    require(!registeredUsers[msg.sender]);
    registeredUsers[msg.sender] = true;
    balances[msg.sender] = MAX_BALANCE;
    emit Transfer(0x0, msg.sender, MAX_BALANCE);
    emit RegisterUser(msg.sender);
  }

  function submitRequest(address to, uint256 tokens) public {
    _transfer(msg.sender, address(0), tokens);
    request[msg.sender][to] = tokens;
  }

  function cancelRequestReceiver(address from) public {
    require(request[from][msg.sender] > 0);
    _transfer(address(0), from, request[from][msg.sender]);
  }

  function cancelRequestSender(address to) {
    require(request[msg.sender][to] > 0);
    _transfer(msg.sender, address(0), request[msg.sender][to]);
    request[msg.sender][to] = 0;
  }

  function acceptRequest(address from, uint256 tokens) public {
    require(request[from][msg.sender] <= tokens);

    uint256 change = request[from][msg.sender] - tokens;

    RelationChannel newRelation = new RelationChannel(address(this), from, msg.sender, tokens);
    relations[newRelation][msg.sender] = tokens;
    relations[newRelation][from] = tokens;


    emit RelationChannelCreated(newRelation, from, msg.sender);
    _transfer(address(0), from, change);
    _transfer(address(0), newRelation, tokens);
    _transfer(msg.sender, newRelation, tokens);
  }

  function sendToRelation(address relationAddr, uint256 tokens) public {
    RelationChannel relation = RelationChannel(relationAddr);
    require(relation.litBalance(msg.sender) > 0);
    relations[relationAddr][msg.sender] += tokens;
    _transfer(msg.sender, relationAddr, tokens);
    relation.tokensSent(msg.sender, tokens);
  }

  function withdrawFromRelation(address relationAddr, uint256 tokens) public {
    RelationChannel relation = RelationChannel(relationAddr);
    require(relation.litBalance(msg.sender) >= tokens);
    relations[relationAddr][msg.sender] -= tokens;
    _transfer(relationAddr, msg.sender, tokens);
    relation.tokensWithdrawn(msg.sender, tokens);
    if (relation.totalBalance() == 0)
      relation.endRelation();
  }

  /**
  * @dev Transfer token for a specified addresses
  * @param from The address to transfer from.
  * @param to The address to transfer to.
  * @param value The amount to be transferred.
  */
  function _transfer(address from, address to, uint256 value) internal {
    require(value <= balances[from]);
    require(to != address(0));

    balances[from] = balances[from].sub(value);
    balances[to] = balances[to].add(value);
    emit Transfer(from, to, value);
  }

  function transfer(address to, uint256 value) public returns (bool) {
    revert();
  }
  function approve(address spender, uint256 value) public returns (bool) {
    revert();
  }
  function transferFrom(address from, address to, uint256 value) public returns (bool) {
    revert();
  }
  function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
    revert();
  }
  function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
    revert();
  }

}
