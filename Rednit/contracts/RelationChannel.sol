pragma solidity ^0.4.24;

contract RelationChannel {
  address public token;

  struct Lover {
    address addr;
    uint8 balance;
  }

  Lover public lover_one;
  Lover public lover_two;
  uint8 public totalBalance;

  event TokensReceived(address from, uint8 tokens);
  event TokensWithdrawn(address from, uint8 tokens);

  constructor(address _token, address _lover_one, address _lover_two, uint8 tokens) public {
    require(msg.sender == token);
    token = _token;
    lover_one = Lover(_lover_one, tokens);
    lover_two = Lover(_lover_two, tokens);
    totalBalance = tokens*2;
  }

  function send(address sender, uint8 tokens) public {
    require(msg.sender == token);
    if (sender == lover_one.addr)
      lover_one.balance += tokens;
    else
      lover_two.balance -= tokens;
    totalBalance += tokens;
    emit TokensReceived(sender, tokens);
  }

  function withdraw(address sender, uint8 tokens) public {
    require(msg.sender == token);
    if (sender == lover_one.addr)
      lover_one.balance -= tokens;
    else
      lover_two.balance -= tokens;
    totalBalance -= tokens;
    emit TokensWithdrawn(sender, tokens);
  }

}
