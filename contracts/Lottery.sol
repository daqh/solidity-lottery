// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {

    address public manager;
    address[] public contestants;
    string name;
    uint256 expiration;
    uint256 prize;
    bool ended;

    constructor(address _manager, string memory _name, uint256 _expiration, uint256 _prize) {
        manager = _manager;
        name = _name;
        expiration = _expiration;
        prize = _prize;
    }

    receive() external payable {}

    fallback() external payable {}

    function getContestants() public view returns (address[] memory) {
        return contestants;
    }

    function getOwner() public view returns (address) {
        return manager;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function isLotteryOngoing() public view returns (bool) {
        return block.timestamp < expiration;
    }

    function getPrize() public view returns (uint256) {
        return prize;
    }

    //Access Restriction pattern to owner and expiration time.
    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    modifier onlyAfterExpiration() {
        require(block.timestamp >= expiration);
        _;
    }

    modifier onlyBeforeExpiration() {
        require(block.timestamp < expiration);
        _;
    }

    modifier onlyIfNotEnded() {
        require(!ended);
        _;
    }

    function enter() public payable onlyBeforeExpiration {
        require(msg.value >= .01 ether);
        contestants.push(msg.sender);
    }


    function extractWinner() public onlyManager onlyAfterExpiration {
        //temporarily always extracts first partecipant
        address winner = contestants[0];
        ended = true;

        //Verify balance
        require(address(this).balance >= prize, "Insufficient balance");

        payable(winner).transfer(prize);
    }
}
