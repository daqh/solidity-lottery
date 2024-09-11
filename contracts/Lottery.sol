// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {

    address private manager;
    string private description;
    uint256 private expiration;
    uint256 private revealWindow;
    uint256 private prize;
    uint256 private participationFee;
    address[] private contestants;
    mapping(address => bytes32[]) private commitments;
    uint256[] private reveals;

    constructor(address _manager, string memory _description, uint256 _expiration, uint256 _revealWindow, uint256 _prize, uint256 _participationFee) {
        require(_expiration > 0, "Expiration must be greater than 0");
        manager = _manager;
        description = _description;
        expiration = block.timestamp + _expiration;
        revealWindow = expiration + _revealWindow;
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

    function getRevealWindow() public view returns (uint256) {
        return revealWindow;
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

    function getReveals() public view returns (uint256[] memory) {
        return reveals;
    }

    function isExpirationOver() public view returns (bool) {
        return block.timestamp >= expiration;
    }

    function isRevealWindowOver() public view returns (bool) {
        return block.timestamp >= revealWindow;
    }

    modifier onlyBeforeExpiration() {
        require(block.timestamp < expiration);
        _;
    }

    modifier onlyAfterExpiration() {
        require(block.timestamp >= expiration);
        _;
    }

    modifier onlyBeforeRevealWindow() {
        require(block.timestamp < revealWindow);
        _;
    }

    modifier onlyAfterRevealWindow() {
        require(block.timestamp >= revealWindow);
        _;
    }

    function enter(bytes32 choice) public payable onlyBeforeExpiration { // This is the commit phase of the commit-reveal scheme
        require(msg.value == participationFee, "Participation fee is required");
        contestants.push(msg.sender);
        commitments[msg.sender].push(choice);
    }

    function reveal(uint256 choosenNumber, uint256 salt) public onlyAfterExpiration onlyBeforeRevealWindow { // This is the reveal phase of the commit-reveal scheme
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

    function pickWinner() public view onlyAfterRevealWindow returns (address) {
        require(reveals.length > 0, "No reveals");
        // We should use a commutative method to calculate the winner.
        // If we use a non-commutativve method, we permit the ability to manipulate the result by
        // choosing an order that is more favorable to the attacker
        uint256 sum = 0;
        for (uint256 i = 0; i < reveals.length; i++) {
            sum += reveals[i];
        }
        uint256 winnerIndex = uint256(keccak256(abi.encodePacked(sum))) % reveals.length;
        return contestants[winnerIndex];
    }

    function withdraw() public onlyAfterRevealWindow {
        address payable winner = payable(pickWinner());
        require(msg.sender == winner, "Only the winner can withdraw the prize");
        winner.transfer(prize);
    }

    receive() external payable {}

    fallback() external payable {}
    
}
