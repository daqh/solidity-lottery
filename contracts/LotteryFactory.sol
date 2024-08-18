pragma solidity ^0.5.0;

import "./Lottery.sol";

contract LotteryFactory {

    Lottery[] public lotteries;

    function createLottery() public {
        Lottery lottery = new Lottery();
        lotteries.push(lottery);
    }

    function getLotteries() public view returns (Lottery[] memory) {
        return lotteries;
    }

}
