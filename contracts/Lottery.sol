pragma solidity ^0.5.0;

import "./Ticket.sol";

contract Lottery {
    // As of Solidity 0.5.0 the `address` type was split into `address` and
    // `address payable`, where only `address payable` provides the transfer
    // function. We therefore need to explicity use the `address payable[]`
    // array type for the players array.
    address public manager;
    Ticket[] public tickets;

    // As of Solidity 0.5.0 constructors must be defined using the `constructor`
    // keyword. See https://docs.soliditylang.org/en/latest/050-breaking-changes.html#constructors
    //
    // As of Solidity 0.7.0 visibility (public / internal) is not needed for
    // constructors anymore. To prevent a contract from being created,
    // it can be marked abstract.
    constructor() public {
        manager = msg.sender;
    }

    // As of Solidity 0.5.0 the `payable` modifier is required for functions
    // that receive Ether. This is to prevent accidental calls to functions
    // that were not meant to receive Ether.
    function enter() public payable {
        require(msg.value > .01 ether);
        // players.push(msg.sender);
        tickets.push(new Ticket(address(this), msg.sender, tickets.length));
    }

}
