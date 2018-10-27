pragma solidity ^0.4.24;

import "./RelationChannel.sol";

contract RednitToken {

  string public constant name = "Nit";
  string public constant symbol = "NIT";

  // Users balance
  mapping(address => uint8) public balances;

  struct Request {
    address addr;
    uint8 tokens;
  }

  // Relations contract
  mapping(address => uint8) public relations;

  // From => To => stake balance request
  mapping(address => mapping(address => uint8)) public request;

  // Maximun token balance of a user
  uint8 public constant MAX_BALANCE = 100;

  event Transfer(address from, address to, uint8 tokens);

  function register() public {
    balances[msg.sender] = MAX_BALANCE;
    emit Transfer(0x0, msg.sender, MAX_BALANCE);
  }

  function submitRequest(address to, uint8 tokens) public {
    require(balances[msg.sender] >= tokens);
    request[msg.sender][to] = tokens;
    balances[msg.sender] -= tokens;
    balances[address(0)] += tokens;
    emit Transfer(msg.sender, address(0), tokens);
  }

  function cancelRequestReceiver(address from, uint8 request_index) public {
    require(request[from][msg.sender] > 0);
    balances[from] += request[from][msg.sender];
    balances[address(0)] -= request[from][msg.sender];
    emit Transfer(address(0), msg.sender, request[from][msg.sender]);
    request[from][msg.sender] = 0;
  }

  function cancelRequestSender(address to) {
    require(request[msg.sender][to] > 0);
    balances[msg.sender] += request[msg.sender][to];
    balances[address(0)] -= request[msg.sender][to];
    emit Transfer(address(0), msg.sender, request[msg.sender][to]);
    request[msg.sender][to] = 0;
  }

  function acceptRequest(address from, uint8 tokens) public {
    require(request[from][msg.sender] <= tokens);

    uint8 change = request[from][msg.sender] - tokens;
    balances[from] += change;
    balances[msg.sender] -= tokens;
    balances[address(0)] -= tokens;

    RelationChannel newRelation = new RelationChannel(address(this), from, msg.sender, tokens);
    relations[newRelation] = tokens;

    emit Transfer(address(0), from, change);
    emit Transfer(address(0), newRelation, tokens);
    emit Transfer(msg.sender, newRelation, tokens);
  }

  function sendToRelation(address relation, uint8 tokens) public {
    require(balances[msg.sender] >= tokens);
    balances[msg.sender] -= tokens;
    RelationChannel(relation).send(msg.sender, tokens);
    relations[relation] += tokens;
  }

  function withdrawFromRelation(address relation, uint8 tokens) public {
    balances[msg.sender] += tokens;
    RelationChannel(relation).withdraw(msg.sender, tokens);
    relations[relation] -= tokens;
  }

}
