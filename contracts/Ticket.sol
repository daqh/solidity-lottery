pragma solidity ^0.5.0;

contract Ticket {

    address public owner;

    constructor(address _owner) public {
        owner = _owner;
    }

    function getOwner() public view returns (address) {
        return owner;
    }
    
}
