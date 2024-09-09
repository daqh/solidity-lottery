// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {

    address private manager;
    string private description;
    uint256 private expiration;
    uint256 private prize;
    uint256 private participationFee;
    address[] private contestants;
    mapping(address => bytes32[]) private commitments;
    uint256[] private reveals;

    constructor(address _manager, string memory _description, uint256 _expiration, uint256 _prize, uint256 _participationFee) {
        require(_expiration > 0, "Expiration must be greater than 0");
        manager = _manager;
        description = _description;
        expiration = block.timestamp + _expiration;
        prize = _prize;
        participationFee = _participationFee;
    }

    function getManager() public view returns (address) {
        return manager;
    }

    function getDescription() public view returns (string memory) {
        return description;
    }

    function getExpiration() public view returns (uint256) {
        return expiration;
    }

    function getPrize() public view returns (uint256) {
        return prize;
    }

    function getParticipationFee() public view returns (uint256) {
        return participationFee;
    }

    function getContestants() public view returns (address[] memory) {
        return contestants;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function isLotteryOngoing() public view returns (bool) {
        return block.timestamp < expiration;
    }

    function getWinner() public view returns (address) {
        return manager;
    }

    function getEntries() public view returns (uint256) {
        return contestants.length;
    }

    function isOver() public view returns (bool) {
        return block.timestamp >= expiration;
    }

    modifier onlyBeforeExpiration() {
        require(block.timestamp < expiration);
        _;
    }

    modifier onlyAfterRevealInterval() {
        require(block.timestamp >= expiration);
        _;
    }

    function enter(bytes32 choice) public payable onlyBeforeExpiration { // This is the commit phase of the commit-reveal scheme
        require(msg.value == participationFee, "Participation fee is required");
        contestants.push(msg.sender);
        commitments[msg.sender].push(choice);
    }

    function reveal(uint256 choosenNumber, uint256 salt) public onlyAfterRevealInterval { // This is the reveal phase of the commit-reveal scheme
        for (uint256 i = 0; i < commitments[msg.sender].length; i++) {
            if (keccak256(abi.encodePacked(msg.sender, choosenNumber, salt)) == commitments[msg.sender][i]) {
                reveals.push(choosenNumber); 
                commitments[msg.sender][i] = commitments[msg.sender][commitments[msg.sender].length - 1]; // Remove the commitment
                commitments[msg.sender].pop();
                return;
            }
        }
        revert("Invalid choice");
    }

    receive() external payable {}

    fallback() external payable {}
    
}
