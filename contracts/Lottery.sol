pragma solidity ^0.5.0;

import "./Ticket.sol";

contract Lottery {

    address public manager;
    Ticket[] public tickets;

    constructor(address _manager) public {
        manager = _manager;
    }

    function enter() public payable {
        require(msg.value >= .01 ether);
        Ticket ticket = new Ticket(msg.sender);
        tickets.push(ticket);
    }

    function getTickets() public view returns (Ticket[] memory) {
        return tickets;
    }

}
