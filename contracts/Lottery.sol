pragma solidity ^0.8.0;

import "./Ticket.sol";

contract Lottery {

    address public manager;
    Ticket[] public tickets;

    constructor(address _manager) {
        manager = _manager;
    }

    receive() external payable {}

    fallback() external payable {}

    function enter() public payable {
        require(msg.value >= .01 ether);
        Ticket ticket = new Ticket(msg.sender);
        tickets.push(ticket);
    }

    function getTickets() public view returns (Ticket[] memory) {
        return tickets;
    }

    function getOwner() public view returns (address) {
        return manager;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

}
