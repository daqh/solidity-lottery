// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {

    address private manager;
    string private description;
    uint256 private expiration;
    uint256 private prize;
    uint256 private participationFee;
    uint256 private seed;
    address[] private contestants;

    constructor(uint _seed) {
        manager = msg.sender;
        seed = _seed;
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
        uint entries = 0;
        for (uint i = 0; i < contestants.length; i++) {
            if (contestants[i] != address(0)) {
                entries++;
            }
        }
        return entries;
    }

    modifier onlyBeforeExpiration() {
        require(block.timestamp < expiration);
        _;
    }

    modifier onlyAfterRevealInterval() {
        require(block.timestamp >= expiration + 1 days);
        _;
    }

    function enter() public payable onlyBeforeExpiration{
        require(msg.value == participationFee, "Participation fee is required");
        require(block.timestamp < expiration, "Lottery is over");
        contestants.push(msg.sender);
    }

    function pickWinner() public onlyAfterRevealInterval returns (address) {
        uint random = uint(keccak256(abi.encodePacked(block.prevrandao)));
        uint index = random % contestants.length;
        address winner = contestants[index];
        payable(winner).transfer(prize);
        return winner;
    }

    receive() external payable {}

    fallback() external payable {}

}
