pragma solidity ^0.4.24;

contract RelationChannel {
  address public token;

  struct Lover {
    address addr;
    uint8 balance;
  }

  Lover public lover_one;
  Lover public lover_two;
  uint8 public relationBalance;

  event TokensReceived(address from, uint8 tokens);
  event TokensWithdrawn(address from, uint8 tokens);
  event RelationEnded();

  // Start the relation contract between two lovers with the same amount of
  // tokens stacked
  constructor(address _token, address _lover_one, address _lover_two, uint8 tokens) public {
    require(msg.sender == token);
    token = _token;
    lover_one = Lover(_lover_one, tokens);
    lover_two = Lover(_lover_two, tokens);
    relationBalance = tokens*2;
  }

  // Send NIT tokens to the relation
  function send(address sender, uint8 tokens) public {
    require(msg.sender == token);
    if (sender == lover_one.addr)
      lover_one.balance += tokens;
    else
      lover_two.balance -= tokens;
    relationBalance += tokens;
    emit TokensReceived(sender, tokens);
  }

  // Withdraw NIT tokens form the relation, if relation balance is 0 it gets
  // destroyed
  function withdraw(address sender, uint8 tokens) public {
    require(msg.sender == token);
    if (sender == lover_one.addr)
      lover_one.balance -= tokens;
    else
      lover_two.balance -= tokens;
    relationBalance -= tokens;
    emit TokensWithdrawn(sender, tokens);
    if (relationBalance == 0)
      endRelation();
  }

  // End relation function, destroys the contract and split the balance between
  // ex lovers
  function endRelation() internal {
    if (address(this).balance > 0) {
      lover_one.addr.transfer(address(this).balance/2);
      lover_two.addr.transfer(address(this).balance/2);
    }
    selfdestruct(address(0));
    emit RelationEnded();
  }

}
