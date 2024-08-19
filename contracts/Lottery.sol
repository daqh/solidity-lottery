// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {

    address public manager;
    string public name;
    uint256 public expiration;
    uint256 public prize;

    address[] public contestants;
    mapping (address => bytes32) public commitments;
    uint256 public dynamicSeed;

    address public winner;


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
        require(msg.value >= .01 ether);
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
        dynamicSeed = (dynamicSeed + number) % type(int256).max;
    }

    function extractWinner() public onlyAfterRevealInterval onlyIfNotEnded{
        require(contestants.length > 0, "No participant revealed their number");

        winner = contestants[uint256(dynamicSeed) % contestants.length];

        //Verify balance
        require(address(this).balance >= prize, "Insufficient balance");
        payable(winner).transfer(prize);
    }
}
