pragma solidity ^0.8.0;

import "./Lottery.sol";

contract LotteryFactory {

    Lottery[] public lotteries;

    function createLottery(string memory _name, uint256 _expiration, uint256 _prize) public payable returns (Lottery) {
        Lottery lottery = new Lottery(msg.sender, _name, _expiration, _prize);
        // Forward the received amount to the new lottery
        address payable lotteryAddress = payable(address(lottery));
        lotteryAddress.transfer(msg.value);
        lotteries.push(lottery);
        return lottery;
    }

    function getLotteries() public view returns (Lottery[] memory) {
        return lotteries;
    }

}
