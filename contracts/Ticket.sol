pragma solidity >=0.5.0 <0.9.0;

contract Ticket {
    address public lottery;
    address payable public player;
    uint public ticketNumber;

    constructor(address _lottery, address payable _player, uint _ticketNumber) public {
        lottery = _lottery;
        player = _player;
        ticketNumber = _ticketNumber;
    }
    
}
