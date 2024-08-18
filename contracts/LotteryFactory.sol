pragma solidity ^0.5.0;

import "./Lottery.sol";

contract LotteryFactory {

    Lottery[] public lotteries;

    function createLottery() public returns (Lottery) {
        Lottery lottery = new Lottery(msg.sender);
        lotteries.push(lottery);
        return lottery;
    }

    function getLotteries() public view returns (Lottery[] memory) {
        return lotteries;
    }

}
