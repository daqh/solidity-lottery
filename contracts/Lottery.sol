// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {

    address public manager;
    string public description;
    uint256 public expiration;
    uint256 public prize;

    address[] public contestants;
    mapping (address => bytes32) public commitments;
    uint256 public dynamicSeed;

    address public winner;

    uint256 public participationFee;

    constructor(address _manager, string memory _description, uint256 _expiration, uint256 _prize, uint256 _participationFee) {
        manager = _manager;
        description = _description;
        expiration = _expiration;
        prize = _prize;
        participationFee = _participationFee;
    }

    function getContestants() public view returns (address[] memory) {
        return contestants;
    }

    function getOwner() public view returns (address) {
        return manager;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getDescription() public view returns (string memory) {
        return description;
    }

    function isLotteryOngoing() public view returns (bool) {
        return block.timestamp < expiration;
    }

    function getPrize() public view returns (uint256) {
        return prize;
    }

    function getParticipationFee() public view returns (uint256) {
        return participationFee;
    }

    //Access Restriction pattern to expiration time.

    /*
        Removed manager restriction so that the extraction
        can be performed by anyone, avoiding possible frauds.
    */

    modifier onlyAfterExpiration() {
        require(block.timestamp >= expiration);
        _;
    }

    modifier onlyAfterRevealInterval() {
        require(block.timestamp >= expiration + 1 days);
        _;
    }

    modifier onlyBeforeExpiration() {
        require(block.timestamp < expiration);
        _;
    }

    modifier onlyIfNotEnded() {
        require(winner == address(0));
        _;
    }

    /*
        Provide de-centralized, low-cost, unpredictable randomness
        by Commit-Reveal Scheme.

        It is not exploitable as a contestant has to choose a number before
        knowing other contestants' chosen values.

    */

    function enter(uint256 number) public payable onlyBeforeExpiration {
        require(msg.value == participationFee, "Incorrect amount sent");
        require(commitments[msg.sender] == bytes32(0), "Address already entered");

        bytes32 commitment = keccak256(abi.encode(msg.sender, number));
        commitments[msg.sender] = commitment;
    }

    function reveal(uint256 number) public onlyAfterExpiration onlyIfNotEnded{
        // Recreate the commitment and check if it matches the stored commitment
        bytes32 commitment = keccak256(abi.encode(msg.sender, number));
        require(commitment == commitments[msg.sender], "Incorrect number for reveal commitment");

        contestants.push(msg.sender);
        //Increase Dynamic Seed with overflow protection.
        dynamicSeed = (dynamicSeed + number) % type(uint256).max;
    }

    function extractWinner() public onlyAfterRevealInterval onlyIfNotEnded{
        require(contestants.length > 0, "No participant revealed their number");

        winner = contestants[dynamicSeed % contestants.length];

        //No need for Balance verification as it is sent during creation.
        payable(winner).transfer(prize);
    }

    receive() external payable {}

    fallback() external payable {}

}
