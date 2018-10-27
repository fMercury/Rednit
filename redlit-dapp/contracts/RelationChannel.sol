pragma solidity ^0.4.24;

contract RelationChannel {
  address public token;

  address public lover_one;
  address public lover_two;
  uint256 public lover_one_balance;
  uint256 public lover_two_balance;

  event RelationEnded();

  // Start the relation contract between two lovers with the same amount of
  // tokens stacked
  constructor(address _token, address _lover_one, address _lover_two, uint256 tokens) public {
    require(msg.sender == token);
    token = _token;
    lover_one = _lover_one;
    lover_two = _lover_two;
    lover_one_balance = tokens;
    lover_two_balance = tokens;
  }

  function litBalance(address addr) public returns(uint256) {
    if (addr == lover_one)
      return (lover_one_balance);
    else
      return (lover_two_balance);
  }

  function totalBalance() public returns(uint256) {
    return (lover_one_balance = lover_two_balance);
  }

  function isLover(address addr) public view returns(bool) {
    return ((addr == lover_one) || (addr == lover_two));
  }

  function tokensSent(address lover, uint256 tokens) public {
    require(msg.sender == token);
    if (lover == lover_one) {
      lover_one_balance += tokens;
    } else {
      lover_two_balance += tokens;
    }
  }

  function tokensWithdrawn(address lover, uint256 tokens) public {
    require(msg.sender == token);
    if (lover == lover_one) {
      lover_one_balance -= tokens;
    } else {
      lover_two_balance -= tokens;
    }
  }

  // End relation function, destroys the contract and split the balance between
  // ex lovers
  function endRelation() public {
    require(msg.sender == token);
    if (address(this).balance > 0) {
      lover_one.transfer(address(this).balance/2);
      lover_two.transfer(address(this).balance/2);
    }
    selfdestruct(address(0));
    emit RelationEnded();
  }

}
